import { ComponentProps, ReactNode } from "react";

interface LabelProps extends ComponentProps<"label"> {
  children: ReactNode;
}

export default function Label({ children, ...props }: LabelProps) {
  return(
    <label className="select-none block" {...props} >{children}</label>
  );
}