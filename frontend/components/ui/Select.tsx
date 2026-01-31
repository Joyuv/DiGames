import { ComponentProps, ReactNode } from "react";

interface SelectProps extends ComponentProps<"select"> {
	children?: ReactNode;
}

export default function Select({ children, ...props }: SelectProps) {
  return(
		<select {...props}
			className="
			bg-slate-700 
			rounded border border-slate-600 focus:border-indigo-500
			shadow-md
			p-2"
		>
			{children}
		</select>
	);
}