"use client";

import { CSSProperties } from "react";
import Select, { type Option } from "./Select";
import styles from "./colorSelect.module.css";

type ColorOption = Option<{ color: string }>;

export default function ColorSelect({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: ColorOption[];
}) {
  return (
    <div>
      <Select
        label={label}
        name={name}
        options={options}
        renderValue={(option) => {
          return <Option option={option} />;
        }}
        renderOption={(option) => {
          return <Option option={option} />;
        }}
      />
    </div>
  );
}

function Option({ option }: { option: ColorOption }) {
  return (
    <div key={option.value} className="inline-flex gap-xs items-center">
      <div
        style={{ "--dot-color": option.color } as CSSProperties}
        className={`${styles.dot} w-base h-base rounded-full`}
      />
      {option.value}
    </div>
  );
}
