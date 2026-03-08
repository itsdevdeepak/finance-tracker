import PotsSkeletal from "@/features/pots/components/PotsSkeletal";

export default function Loading() {
  return (
    <section className="flow-2xl">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Pots</h1>
        <div className="h-13 w-36 bg-gray-lighter rounded-lg motion-safe:animate-pulse" />
      </div>
      <PotsSkeletal />
    </section>
  );
}
