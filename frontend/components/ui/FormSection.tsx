import { ReactNode } from "react";


export default function FormSection({ children }: { children: ReactNode }) {
  return(
    <section className="flex-1 flex justify-center items-center">
      {children}
    </section>
  );
}