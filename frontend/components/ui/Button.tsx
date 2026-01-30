"use client";

import { useTheme } from "next-themes";
import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
	children: ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
	const { theme } = useTheme();

	return(
		<button {...props}
			className={`
			bg-indigo-500 hover:bg-indigo-600 rounded  
				cursor-pointer
				py-2
				${ theme === "dark" ? "text-emphasis" : "text-slate-950"}
			`} 
			
		>
			{children}
		</button>
	);
}