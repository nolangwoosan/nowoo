import { RefObject, useEffect } from "react";

export function useOutsideClick({
  ref,
  handler,
}: {
  ref: RefObject<HTMLElement>;
  handler: (event: MouseEvent) => void;
}) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  });
}
