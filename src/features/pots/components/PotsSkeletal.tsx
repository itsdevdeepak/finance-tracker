function PotCardSkeletal() {
  return (
    <div className="p-xl bg-white rounded-xl flow-3xl grow *:motion-safe:animate-pulse">
      <div className="flex gap-base items-center">
        <div className="w-base h-base rounded-full bg-gray-lighter" />
        <div className="h-6 w-28 bg-gray-lighter rounded-sm" />
        <div className="ml-auto w-5 h-5 bg-gray-lighter rounded-sm" />
      </div>
      <div className="flow-base">
        <div className="flex justify-between items-center">
          <div className="h-5 w-20 bg-gray-lighter rounded-sm" />
          <div className="h-8 w-32 bg-gray-lighter rounded-sm" />
        </div>
        <div className="flow-sm">
          <div className="w-full h-sm bg-gray-lighter rounded-full" />
          <div className="flex justify-between">
            <div className="h-4 w-10 bg-gray-lighter rounded-sm" />
            <div className="h-4 w-24 bg-gray-lighter rounded-sm" />
          </div>
        </div>
      </div>
      <div className="flex gap-base *:flex-1 flex-wrap">
        <div className="h-13 bg-gray-lighter rounded-lg" />
        <div className="h-13 bg-gray-lighter rounded-lg" />
      </div>
    </div>
  );
}

export default function PotsSkeletal() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading..."
      className="fluid-grid gap-xl"
      style={{ "--minimum": "518px" } as React.CSSProperties}
    >
      <PotCardSkeletal />
      <PotCardSkeletal />
      <PotCardSkeletal />
      <PotCardSkeletal />
    </div>
  );
}
