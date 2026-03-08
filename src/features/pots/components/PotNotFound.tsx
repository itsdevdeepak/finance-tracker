import Link from "next/link";

export default function PotNotFound() {
  return (
    <div className="bg-white rounded-xl px-lg py-xl flow-lg md:min-w-[500px] shadow text-center">
      <h1 className="text-xl font-bold">Pot Not Found</h1>
      <p className="text-gray-500 text-sm">
        The pot you&apos;re looking for doesn&apos;t exist or may have been
        deleted.
      </p>
      <Link href="/pots" className="block text-center w-full button">
        Back to Pots
      </Link>
    </div>
  );
}
