import Image from "next/image";

export default function Avatar({
  imageUrl,
  className,
}: {
  imageUrl: string | null;
  className?: string;
}) {
  const fallBackImage = "/images/avatars/savory-bites-bistro.jpg";
  return (
    <Image
      className={`rounded-full ${className}`}
      src={imageUrl ?? fallBackImage}
      alt=""
      width={40}
      height={40}
    />
  );
}
