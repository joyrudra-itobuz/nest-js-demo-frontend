"use-client";

import { useEffect, useRef, type ReactNode } from "react";
import "./_auth.layout.scoped.scss";

export default function SignInUpLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleBlob(e: MouseEvent) {
      if (!blobRef.current) {
        return;
      }

      blobRef.current.animate(
        { left: `${e.clientX - 100}px`, top: `${e.clientY - 100}px` },
        { duration: 5000, fill: "forwards" }
      );
    }

    document.addEventListener("mousemove", handleBlob);

    () => document.removeEventListener("mousemove", handleBlob);
  });

  return (
    <>
      <div ref={blobRef} className={"auth-branding"}>
        <h4 className="text-3xl font-extrabold">NEST JS</h4>
      </div>
      <div className="flex justify-center h-screen items-center px-10 sm:px-20 ">
        <div className="sign-in-banner top-0 left-0 fixed z-0 h-screen w-screen">
          <div className="sign-in-banner-gradient h-full w-full" />
        </div>
        {children}
      </div>
    </>
  );
}
