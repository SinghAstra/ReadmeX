import { ComponentProps } from "react";

export default function Pre({
  children,
  ...rest
}: ComponentProps<"pre"> & { raw?: string }) {
  return (
    <div className=" relative">
      {/* <div className="absolute top-3 right-2.5 z-10 sm:block hidden">
        <Copy content={raw!} />
      </div> */}
      <div className="relative">
        <pre {...rest}>{children}</pre>
      </div>
    </div>
  );
}
