import Link from "next/link";
import { ComponentProps, ReactNode } from "react";


interface SideMenuLinkProps extends ComponentProps<typeof Link>{
  children: ReactNode;
}

export default function SideMenuLink({ children,  ...props }: SideMenuLinkProps) {
  return(
    <Link { ...props }
      className="
        flex gap-1 items-center
        border-b border-slate-600
        py-2 rounded-t
        hover:bg-slate-700
      "
    >
      {children}
    </Link>
  );
}