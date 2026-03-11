import { PropsWithChildren } from "react";
import ModalCloseButton from "./ModalCloseButton";

type Props = {
  heading: string;
  description: string;
  error?: string;
};

export default function DialogCard({
  heading,
  description,
  error,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="bg-white rounded-xl px-lg py-xl flow-lg md:min-w-[500px] shadow">
      <div className="w-full inline-flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-bold">{heading}</h1>
        <ModalCloseButton />
      </div>
      {error && <p className="text-red font-bold text-sm">{error}</p>}
      <p className="text-gray text-sm max-w-[55ch]">{description}</p>
      {children}
    </div>
  );
}
