"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CategoryId, Ingredient } from "@/lib/types";

const STORAGE_KEY = "what-is-in-fridge:selected-ingredients";

type Listener = () => void;

interface FridgeState {
  selected: Set<string>;
  custom: Ingredient[];
}

function createFridgeStore() {
  let state: FridgeState = { selected: new Set(), custom: [] };
  let hydrated = false;
  const listeners = new Set<Listener>();

  function emit() {
    for (const listener of listeners) listener();
  }

  function ensureHydrated() {
    if (hydrated || typeof window === "undefined") return;
    hydrated = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { selected?: unknown; custom?: unknown };
        state = {
          selected: new Set(Array.isArray(parsed.selected) ? (parsed.selected as string[]) : []),
          custom: Array.isArray(parsed.custom) ? (parsed.custom as Ingredient[]) : [],
        };
      }
    } catch {
      // ignore malformed storage, start fresh
    }
  }

  function persist() {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ selected: Array.from(state.selected), custom: state.custom })
      );
    } catch {
      // ignore write failures (e.g. private browsing)
    }
  }

  return {
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot() {
      ensureHydrated();
      return state;
    },
    getServerSnapshot() {
      return state;
    },
    isHydrated() {
      return hydrated;
    },
    toggle(id: string) {
      const nextSelected = new Set(state.selected);
      if (nextSelected.has(id)) {
        nextSelected.delete(id);
      } else {
        nextSelected.add(id);
      }
      state = { ...state, selected: nextSelected };
      persist();
      emit();
    },
    clear() {
      state = { selected: new Set(), custom: [] };
      persist();
      emit();
    },
    addCustom(categoryId: CategoryId, name: string) {
      const trimmed = name.trim();
      if (!trimmed) return;
      const id = `custom-${categoryId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
      const nextSelected = new Set(state.selected);
      nextSelected.add(id);
      state = {
        selected: nextSelected,
        custom: [...state.custom, { id, name: trimmed, categoryId }],
      };
      persist();
      emit();
    },
    removeCustom(id: string) {
      const nextSelected = new Set(state.selected);
      nextSelected.delete(id);
      state = {
        selected: nextSelected,
        custom: state.custom.filter((item) => item.id !== id),
      };
      persist();
      emit();
    },
  };
}

const fridgeStore = createFridgeStore();

interface FridgeContextValue {
  selected: Set<string>;
  custom: Ingredient[];
  toggle: (id: string) => void;
  isSelected: (id: string) => boolean;
  clear: () => void;
  addCustom: (categoryId: CategoryId, name: string) => void;
  removeCustom: (id: string) => void;
  count: number;
  hydrated: boolean;
}

const FridgeContext = createContext<FridgeContextValue | null>(null);

export function FridgeProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(
    fridgeStore.subscribe,
    fridgeStore.getSnapshot,
    fridgeStore.getServerSnapshot
  );

  const toggle = useCallback((id: string) => fridgeStore.toggle(id), []);
  const isSelected = useCallback((id: string) => state.selected.has(id), [state]);
  const clear = useCallback(() => fridgeStore.clear(), []);
  const addCustom = useCallback(
    (categoryId: CategoryId, name: string) => fridgeStore.addCustom(categoryId, name),
    []
  );
  const removeCustom = useCallback((id: string) => fridgeStore.removeCustom(id), []);

  const value = useMemo<FridgeContextValue>(
    () => ({
      selected: state.selected,
      custom: state.custom,
      toggle,
      isSelected,
      clear,
      addCustom,
      removeCustom,
      count: state.selected.size,
      hydrated: fridgeStore.isHydrated(),
    }),
    [state, toggle, isSelected, clear, addCustom, removeCustom]
  );

  return <FridgeContext.Provider value={value}>{children}</FridgeContext.Provider>;
}

export function useFridge() {
  const ctx = useContext(FridgeContext);
  if (!ctx) throw new Error("useFridge must be used within a FridgeProvider");
  return ctx;
}
