"use client";

import { useMemo, useRef, PropsWithChildren } from "react";
import { useSelect } from "@/hooks/useSelect";
import styles from "./select.module.css";

type BaseOption = { value: string };
export type Option<T extends object = object> = BaseOption & T;

interface SelectProps<T extends BaseOption = BaseOption> {
  label: string;
  name: string;
  defaultValue?: string;
  options: T[];
  inTransition?: boolean;
  showLabelInMenu?: boolean;
  className?: string;
  onChange?: (option: T) => void;
  renderOption?: (option: T, index: number) => React.ReactNode;
  renderValue?: (option: T) => React.ReactNode;
}

export default function Select<T extends BaseOption = BaseOption>({
  label,
  name,
  defaultValue,
  options,
  onChange,
  className = "",
  inTransition = false,
  showLabelInMenu = false,
  renderValue = (option: T) => <span>{option.value}</span>,
  renderOption = (option: T) => <span>{option.value}</span>,
}: SelectProps<T>) {
  const buttonRef = useRef<HTMLDivElement>(null);

  const optionIndex = useMemo(() => {
    const option = options.findIndex((opt) => opt.value === defaultValue);
    return option < 1 ? 0 : option;
  }, [options, defaultValue]);

  const {
    state: { isOpen, selectedOptionIndex, focusedOptionIndex },
    actions: { toggleMenu, selectOption, handleKeyPress },
    integration: { dropdownRef, optionRefs, labelId, menuId, optionIds },
  } = useSelect(optionIndex, options, onChange);

  const selectedOption = options[selectedOptionIndex];
  const activeOptionId = optionIds[selectedOptionIndex];

  return (
    <div className={`flex flex-col gap-2xs ${className}`}>
      <input type="hidden" name={name} value={selectedOption.value} />
      <div
        onClick={() => buttonRef.current?.focus()}
        className={`label text-gray text-xs font-bold cursor-default`}
        id={labelId}
      >
        {label}
      </div>
      <div ref={dropdownRef} className={styles.select}>
        <div
          ref={buttonRef}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={menuId}
          aria-labelledby={labelId}
          aria-activedescendant={activeOptionId}
          tabIndex={inTransition ? -1 : 0}
          onClick={() => {
            if (!inTransition) toggleMenu();
          }}
          onKeyDown={handleKeyPress}
          aria-disabled={inTransition}
        >
          {renderValue(selectedOption)}
        </div>

        <div
          id={menuId}
          role="listbox"
          aria-labelledby={labelId}
          data-expanded={isOpen}
          tabIndex={-1}
        >
          {showLabelInMenu && (
            <div aria-hidden="true" className="label">
              {label}
            </div>
          )}
          {options.map((option, idx) => (
            <Option
              id={optionIds[idx]}
              key={optionIds[idx]}
              option={option.value}
              selected={option.value === selectedOption.value}
              isFocused={idx === focusedOptionIndex}
              optionRef={(node) => {
                optionRefs.current[idx] = node;
              }}
              onClick={() => {
                selectOption(idx);
              }}
            >
              {renderOption(option, idx)}
            </Option>
          ))}
        </div>
      </div>
    </div>
  );
}

interface OptionProps {
  id: string;
  option: string;
  selected: boolean;
  onClick: () => void;
  isFocused: boolean;
  optionRef?: React.Ref<HTMLDivElement>;
}

function Option({
  option,
  selected = false,
  onClick,
  id,
  isFocused,
  optionRef,
  children,
}: PropsWithChildren<OptionProps>) {
  return (
    <div
      id={id}
      ref={optionRef}
      role="option"
      onClick={onClick}
      aria-selected={selected}
      data-focused={isFocused}
      data-value={option}
    >
      {children}
    </div>
  );
}
