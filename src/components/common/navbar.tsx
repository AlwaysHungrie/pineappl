import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-white"
      style={{
        boxShadow:
          "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
      }}
    >
      <div className="flex w-full max-w-screen-xl mx-auto h-16 items-center px-4">
        <Link
          href="/"
          className="flex items-center font-anton font-bold h-full hover:opacity-80 transition-opacity"
        >
          <div className="text-3xl md:text-4xl text-gray-900">Pineappl</div>
          <div className="ml-1 h-full flex flex-col justify-center">
            <div
              className="text-base text-gray-500 font-sans font-normal"
              style={{
                transform: "rotate(-10deg)",
              }}
            >
              for
            </div>

            <div className="text-lg md:text-xl -mt-1">Myra</div>
          </div>
        </Link>
      </div>
    </header>
  );
}
