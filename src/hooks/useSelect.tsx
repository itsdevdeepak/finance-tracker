import {
  KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import useOutsideEvent from "./useOutsideEvent";

type BaseOption = { value: string };

export function useSelect<T extends BaseOption>(
  defaultOption: number,
  options: T[],
  onSelect?: (option: T) => void,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultOption);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(defaultOption);

  const dropdownRef = useOutsideEvent<HTMLDivElement>(() => setIsOpen(false));
  const optionRefs = useRef<(HTMLElement | null)[]>([]);

  const labelId = useId();
  const menuId = useId();

  const optionIds = useMemo(() => {
    return options.map((_, idx) => `${menuId}-option-${idx}`);
  }, [menuId, options]);

  useEffect(() => {
    setSelectedOptionIndex(defaultOption);
  }, [defaultOption]);

  useEffect(() => {
    if (!isOpen || focusedOptionIndex < 0) return;

    const focusedOption = optionRefs.current[focusedOptionIndex];
    focusedOption?.scrollIntoView({ block: "nearest" });
  }, [isOpen, focusedOptionIndex]);

  function toggleMenu() {
    setIsOpen((open) => !open);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function selectOption(index: number) {
    const option = options[index];
    if (!option || index === selectedOptionIndex) return;
    setSelectedOptionIndex(index);
    setFocusedOptionIndex(index);
    onSelect?.(option);
    closeMenu();
  }

  function moveOptionFocus(dir: "up" | "down" | "first" | "last") {
    let nextFocusIdx = 0;
    const maxIdx = optionRefs.current.length;

    if (dir === "down") {
      nextFocusIdx =
        focusedOptionIndex + 1 < maxIdx
          ? focusedOptionIndex + 1
          : focusedOptionIndex;
    } else if (dir === "up") {
      nextFocusIdx =
        focusedOptionIndex - 1 >= 0
          ? focusedOptionIndex - 1
          : focusedOptionIndex;
    } else if (dir === "last") {
      nextFocusIdx = maxIdx - 1;
    }

    setFocusedOptionIndex(nextFocusIdx);
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      (event.altKey && event.key === "ArrowUp")
    ) {
      event.preventDefault();
      toggleMenu();

      if (isOpen && selectedOptionIndex !== focusedOptionIndex) {
        selectOption(focusedOptionIndex);
      }

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) {
        toggleMenu();
        return;
      }

      moveOptionFocus("down");
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        toggleMenu();
        return;
      }

      moveOptionFocus("up");
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      if (!isOpen) {
        toggleMenu();
        return;
      }

      moveOptionFocus("first");
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      if (!isOpen) {
        toggleMenu();
        return;
      }

      moveOptionFocus("last");
      return;
    }
  }

  return {
    state: {
      isOpen,
      selectedOptionIndex,
      focusedOptionIndex,
    },
    actions: {
      toggleMenu,
      closeMenu,
      selectOption,
      setSelectedOptionIndex,
      handleKeyPress,
    },
    integration: {
      dropdownRef,
      optionRefs,
      labelId,
      menuId,
      optionIds,
    },
  };
}
