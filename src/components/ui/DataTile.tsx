export default function DataTile({
  color,
  title,
  value,
}: {
  color: string;
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex gap-base">
      <div className="w-2xs rounded-full" style={{ background: color }} />
      <div className="flex flex-col gap-2xs text-xs">
        <span className="text-gray">{title}</span>
        <span className="font-bold">{value}</span>
      </div>
    </div>
  );
}
