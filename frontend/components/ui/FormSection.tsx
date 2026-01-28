import { ReactNode } from "react";


export default function FormSection({ children }: { children: ReactNode }) {
  return(
    <section className="min-h-full w-full flex justify-center items-center">
      {children}
    </section>
  );
}