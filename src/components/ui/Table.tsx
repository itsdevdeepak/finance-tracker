import { HTMLProps, PropsWithChildren, ReactNode } from "react";
import styles from "./Table.module.css";

type TableProps = {
  className?: string;
  header: ReactNode;
  data: ReactNode[];
};

export default function Table({ className, header, data }: TableProps) {
  return (
    <table className={`${styles.table} ${className}`}>
      <thead>{header}</thead>
      <tbody>{data}</tbody>
    </table>
  );
}

function Header({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <th className={className}>{children}</th>;
}

function Row({
  children,
  ...props
}: PropsWithChildren<HTMLProps<HTMLTableRowElement>>) {
  return <tr {...props}>{children}</tr>;
}

function Data({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <td className={className}>{children}</td>;
}

Table.Header = Header;
Table.Row = Row;
Table.Data = Data;
