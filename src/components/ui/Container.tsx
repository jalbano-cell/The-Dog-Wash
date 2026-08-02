import { ReactNode } from "react";
import clsx from "clsx";

/**
 * The page's single content measure: 1200px with 40px gutters on desktop,
 * tightening to 20px on phones so cards don't lose their internal padding to
 * the page margin.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}
