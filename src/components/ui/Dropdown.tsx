import { IconProps } from "../icons/types";
import Select from "./form/Select";

interface DropdownProps {
  label: string;
  defaultValue?: string;
  options: readonly string[];
  inTransition?: boolean;
  MobileIcon: React.FC<IconProps>;
  updateValue: (value: string) => void;
}

export default function Dropdown({
  label,
  options,
  defaultValue,
  updateValue,
  MobileIcon,
  inTransition,
}: DropdownProps) {
  const optionObj = options.map((value) => ({ value }));

  return (
    <Select
      className="flex-row items-center gap-xs text-nowrap
      **:[.label]:text-gray **:[.label]:text-base **:[.label]:font-normal
      *:[.label]:max-[700px]:sr-only
      **:[[role='listbox']>.label]:min-[700px]:hidden"
      name={label}
      label={label}
      options={optionObj}
      defaultValue={defaultValue}
      showLabelInMenu={true}
      inTransition={inTransition}
      onChange={({ value }) => updateValue(value)}
      renderValue={({ value }) => {
        return (
          <>
            <span className="max-[700px]:sr-only">{value}</span>
            <MobileIcon className="min-[700px]:hidden" aria-hidden="true" />
          </>
        );
      }}
    />
  );
}
