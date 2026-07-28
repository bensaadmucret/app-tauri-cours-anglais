import { useEffect } from "react";
import type { DependencyList } from "react";

interface ShortcutHandlers {
  [key: string]: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers, deps: DependencyList = []) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      const key = e.key;
      if (handlers[key]) {
        e.preventDefault();
        handlers[key]();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
