"use client";

import { useState, useId, useMemo, useRef } from "react";
import styles from "./dropdown.module.css";
import { IconProps } from "@/components/icons/types";
import useOutsideEvent from "@/hooks/useOutsideEvent";

interface DropDownProps {
  label: string;
  defaultValue?: string;
  options: readonly string[];
  inTransition?: boolean;
  MobileIcon: React.FC<IconProps>;
  updateValue: (value: string) => void;
}

function getActiveOptionIdx(options: readonly string[], value?: string) {
  if (!value) return 0;

  const index = options.findIndex((v) => v === value);
  return index >= 0 ? index : 0;
}

export default function DropDown({
  label,
  defaultValue,
  options,
  inTransition = false,
  MobileIcon,
  updateValue,
}: DropDownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [isOpen, setIsOpen] = useState(false);

  const activeOptionIdx = useMemo(
    () => getActiveOptionIdx(options, defaultValue),
    [options, defaultValue],
  );

  const [focusIdx, setFocusIdx] = useState(-1);
  useOutsideEvent(dropdownRef, () => setIsOpen(false));

  const labelId = useId();
  const listboxId = useId();

  const selectedValue = useMemo(() => {
    if (defaultValue && options.includes(defaultValue)) return defaultValue;
    return options[0] ?? "";
  }, [options, defaultValue]);

  const optionIds = useMemo(() => {
    return options.map((_, idx) => `${listboxId}-option-${idx}`);
  }, [options, listboxId]);

  function selectOption(idx: number) {
    const option = optionRefs.current[idx]?.innerText;
    if (!option) return;

    updateValue(option);
    setIsOpen(false);
  }

  function moveOptionFocus(dir: "up" | "down" | "first" | "last") {
    let nextFocusIdx = 0;
    if (dir === "down") {
      nextFocusIdx =
        focusIdx + 1 < optionRefs.current.length ? focusIdx + 1 : focusIdx;
    } else if (dir === "up") {
      nextFocusIdx = focusIdx - 1 >= 0 ? focusIdx - 1 : focusIdx;
    } else if (dir === "last") {
      nextFocusIdx = optionRefs.current.length - 1;
    }

    setFocusIdx(nextFocusIdx);
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      (event.altKey && event.key === "ArrowUp")
    ) {
      event.preventDefault();
      setIsOpen(!isOpen);

      if (isOpen && activeOptionIdx !== focusIdx) {
        selectOption(focusIdx);
      }

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) setIsOpen(true);
      moveOptionFocus("down");
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) setIsOpen(true);
      moveOptionFocus("up");
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      if (!isOpen) setIsOpen(true);
      moveOptionFocus("first");
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      if (!isOpen) setIsOpen(true);
      moveOptionFocus("last");
      return;
    }
  }

  return (
    <div
      ref={dropdownRef}
      className="inline-flex items-center gap-xs w-full text-nowrap"
    >
      <div id={labelId} className="text-gray max-[700px]:sr-only">
        {label}
      </div>

      <div className={styles.dropdown}>
        <div
          ref={buttonRef}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-labelledby={labelId}
          tabIndex={inTransition ? -1 : 0}
          onClick={() => {
            if (inTransition) return;
            setIsOpen(!isOpen);
          }}
          onKeyDown={handleKeyPress}
          aria-disabled={inTransition}
        >
          <span className="max-[700px]:sr-only">{selectedValue}</span>
          <MobileIcon className="min-[700px]:hidden" aria-hidden="true" />
        </div>

        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          data-expanded={isOpen}
          aria-activedescendant={optionIds[activeOptionIdx]}
        >
          <div aria-hidden="true" className="text-gray min-[700px]:hidden">
            {label}
          </div>
          {options.map((option, idx) => (
            <DropItem
              id={optionIds[idx]}
              key={optionIds[idx]}
              option={option}
              selected={option === selectedValue}
              isFocused={idx === focusIdx}
              onClick={() => selectOption(idx)}
              ItemRef={(ele) => (optionRefs.current[idx] = ele)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DropItem({
  option,
  selected = false,
  onClick,
  ItemRef,
  id,
  isFocused,
}: {
  id: string;
  option: string;
  selected: boolean;
  onClick: () => void;
  ItemRef: (ele: HTMLDivElement) => void;
  isFocused: boolean;
}) {
  return (
    <div
      id={id}
      ref={ItemRef}
      role="option"
      onClick={onClick}
      aria-selected={selected}
      data-focused={isFocused}
    >
      {option}
    </div>
  );
}
