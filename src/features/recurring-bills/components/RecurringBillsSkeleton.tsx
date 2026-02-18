function TableSkeleton() {
  return (
    <div className="flex-3 bg-white p-2xl rounded-xl basis-150 flow-2xl *:motion-safe:animate-pulse">
      <div className="flex justify-between gap-base">
        <div className="shrink bg-gray-lighter basis-80 h-11.25 rounded-sm"></div>
        <div className="bg-gray-lighter basis-40 h-11.25 rounded-sm"></div>
      </div>
      <div className="flow-lg">
        <div className="w-full h-13 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-13 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-13 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-13 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-13 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-13 bg-gray-lighter rounded-lg"></div>
        <div className="w-full h-13 bg-gray-lighter rounded-lg"></div>
      </div>
      <div className="flex gap-base justify-between">
        <div className="bg-gray-lighter basis-28 h-11.25"></div>
        <div className="bg-gray-lighter basis-28 h-11.25"></div>
      </div>
    </div>
  );
}

function Cards() {
  return (
    <div className="h-fit flex-1 basis-83 flex flex-wrap *:grow *:shrink gap-xl">
      <div className="flex flex-col justify-between bg-gray-darker h-45 basis-83 rounded-xl p-xl *:rounded-lg *:motion-safe:animate-pulse ">
        <div className="w-11 h-11 bg-gray"></div>
        <div className="w-full h-17.5 bg-gray"></div>
      </div>
      <div className="flex flex-col gap-base bg-white h-45 basis-83 rounded-xl *:rounded-lg p-xl *:motion-safe:animate-pulse">
        <div className="w-30 h-10 bg-gray-lighter"></div>
        <div className="w-full h-12 bg-gray-lighter"></div>
        <div className="w-full h-12 bg-gray-lighter"></div>
        <div className="w-full h-12 bg-gray-lighter"></div>
      </div>
    </div>
  );
}

export default function RecurringBillsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading...">
      <div className="flex flex-wrap gap-lg">
        <Cards />
        <TableSkeleton />
      </div>
    </div>
  );
}
