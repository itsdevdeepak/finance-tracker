export default function TransactionsSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading..."
      className="flex flex-col gap-2xl bg-white p-lg md:p-2xl rounded-xl *:motion-safe:animate-pulse"
    >
      <div className="flex justify-between gap-xl">
        <div className="shrink bg-gray-lighter basis-80 h-11.25 rounded-sm"></div>
        <div className="bg-gray-lighter basis-44 h-11.25 rounded-sm ml-auto"></div>
        <div className="bg-gray-lighter basis-48 h-11.25 rounded-sm"></div>
      </div>
      <div className="flow-lg">
        <div className="w-full h-11 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-18 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-18 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-18 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-18 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-18 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-18 bg-gray-lighter rounded-lg"></div>
      </div>
      <div className="flex gap-base justify-between">
        <div className="bg-gray-lighter basis-28 h-11.25"></div>
        <div className="bg-gray-lighter basis-28 h-11.25"></div>
      </div>
    </div>
  );
}
