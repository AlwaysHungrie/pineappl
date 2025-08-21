import Image from "next/image";
import "./pineapple.css";

const ORIGINAL_HEIGHT = 767;
const ORIGINAL_WIDTH = 402;
const ORIGINAL_BASE_HEIGHT = 497;
const ORIGINAL_BASE_WIDTH = 730;

export default function Pineapple({
  width = 37,
  zIndex = 100,
}: {
  width?: number;
  zIndex?: number;
}) {
  const originalLeafHeight = ORIGINAL_HEIGHT - ORIGINAL_BASE_HEIGHT;

  // Single reduction factor for all dimensions
  const scale = width / ORIGINAL_WIDTH;

  // Calculate all scaled dimensions
  const height = ORIGINAL_HEIGHT * scale;
  const leafHeight = originalLeafHeight * scale;
  const baseHeight = height - leafHeight;
  const baseWidth = ORIGINAL_BASE_WIDTH * (baseHeight / ORIGINAL_BASE_HEIGHT);

  return (
    <div
      className="relative pineapple select-none"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        zIndex: zIndex,
      }}
    >
      <Image
        src="/pineapple/pineapple-base.png"
        alt="Pineapple"
        width={ORIGINAL_WIDTH}
        height={ORIGINAL_HEIGHT}
        draggable={false}
        style={{
          width: "auto",
          height: `${height}px`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 overflow-hidden"
        style={{
          width: `${width}px`,
          height: `${baseHeight}px`,
          mask: "url(/pineapple/base-mask.svg) no-repeat",
          maskSize: "100% 100%",
          WebkitMask: "url(/pineapple/base-mask.svg) no-repeat",
          WebkitMaskSize: "100% 100%",
        }}
      >
        <Image
          src="/pineapple/pineapple-mesh.png"
          alt="Pineapple"
          width={ORIGINAL_BASE_WIDTH}
          height={ORIGINAL_BASE_HEIGHT}
          className="max-w-none pineapple-mesh"
          draggable={false}
          style={{
            width: `${baseWidth}px`,
            height: `${baseHeight}px`,
            transform: `translateX(0%)`,
          }}
        />
      </div>

      {/* Oval shadow at the bottom */}
      <div
        className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 pineapple-shadow bg-black/20 rounded-[50%]"
        style={{
          width: `${width * 0.9}px`,
          height: `${width * 0.2}px`,
          zIndex: -1,
        }}
      />
    </div>
  );
}
