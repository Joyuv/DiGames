import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
	children: ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
	return(
		<button className="bg-slate-50 rounded cursor-pointer" {...props}>
			{children}
		</button>
	);
}