import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function PrimaryButton({
  href,
  onClick,
  children,
  className,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      variant="default"
      size="default"
      className={cn(
        "font-anton text-4xl cursor-pointer shadow-md p-0",
        className
      )}
      onClick={onClick}
      asChild={!!href}
    >
      {href ? (
        <Link
          className={cn(
            "px-4 py-8 flex items-center justify-center",
            className
          )}
          href={href}
        >
          {children}
        </Link>
      ) : (
        <div
          className={cn(
            "px-4 py-8 flex items-center justify-center",
            className
          )}
        >
          {children}
        </div>
      )}
    </Button>
  );
}
