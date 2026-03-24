import React from "react";

interface PlaceholderProps {
  heading: string;
  description?: string;
  icon?: React.ReactNode;
  button?: React.ReactNode;
  className?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  heading,
  description,
  icon,
  button,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col gap-xl items-center text-center card max-w-[60ch] shadow ${className}`}
    >
      {icon}
      <div className="flow-sm">
        <h2 className="text-3xl font-bold">{heading}</h2>
        {description && <p className="text-gray">{description}</p>}
      </div>
      {button}
    </div>
  );
};

export default Placeholder;
