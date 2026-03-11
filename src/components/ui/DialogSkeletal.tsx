export default function DialogSkeletal() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading..."
      className="bg-white rounded-xl px-lg py-xl flow-lg w-full max-w-[516px] *:motion-safe:animate-pulse shadow"
    >
      <div className="h-10 w-[90%] bg-gray-lighter rounded-sm"></div>
      <div className="h-25 w-full bg-gray-lighter rounded-sm"></div>
      <div className="h-10 w-full bg-gray-lighter rounded-sm"></div>
      <div className="h-10 w-full bg-gray-lighter rounded-sm"></div>
      <div className="h-13 w-full bg-gray-lighter rounded-sm"></div>
    </div>
  );
}
