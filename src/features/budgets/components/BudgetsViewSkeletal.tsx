function BudgetCardSkeletal() {
  return (
    <article className="p-xl bg-white rounded-xl flow-3xl *:motion-safe:animate-pulse">
      <div className="flex gap-base items-center">
        <div className="h-10 w-50 bg-gray-lighter rounded-sm" />
        <div className="ml-auto w-8 h-8 bg-gray-lighter rounded-sm" />
      </div>
      <div className="flow-base">
        <div className="h-7 w-40 bg-gray-lighter rounded-sm" />
        <div className="w-full h-10 bg-gray-lighter rounded-xl" />
        <div className="flex *:flex-1 gap-base">
          <div className="w-full h-14 bg-gray-lighter rounded-xl" />
          <div className="w-full h-14 bg-gray-lighter rounded-xl" />
        </div>
      </div>

      <div className="w-full h-40 rounded-xl bg-beige-lighter" />
    </article>
  );
}

export function BudgetChartSkeletal() {
  return (
    <article
      aria-busy="true"
      aria-label="Loading Budget Chart..."
      className="p-xl bg-white rounded-xl flow-3xl grow h-fit *:motion-safe:animate-pulse"
    >
      <div className="mx-auto h-75 w-full rounded-xl bg-gray-lighter" />
      <div className="w-[60%] h-9 bg-gray-lighter rounded-xl" />
      <div className="flow-base">
        <div className="w-full h-13.5 bg-gray-lighter rounded-xl" />
        <div className="w-full h-13.5 bg-gray-lighter rounded-xl" />
        <div className="w-full h-13.5 bg-gray-lighter rounded-xl" />
        <div className="w-full h-13.5 bg-gray-lighter rounded-xl" />
      </div>
    </article>
  );
}

export default function BudgetViewSkeletal() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading budgets"
      className="with-sidebar gap-xl *:first:basis-105 *:shrink *:grow"
    >
      <BudgetChartSkeletal />
      <div className="flow-xl">
        <BudgetCardSkeletal />
        <BudgetCardSkeletal />
        <BudgetCardSkeletal />
        <BudgetCardSkeletal />
      </div>
    </div>
  );
}
