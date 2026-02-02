"use client";

import useMounted from "@/hooks/isMounted";
import { useTheme } from "next-themes";
import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
	children: ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
	const { theme } = useTheme();
	const isMounted = useMounted();

	if (!isMounted) return null;

	return(
		<button {...props}
			className={`
			bg-indigo-500 hover:bg-indigo-600 rounded  
				cursor-pointer
				py-2
				px-2
				hover:shadow-sm hover:shadow-indigo-200
				${ theme === "dark" ? "text-emphasis hover:shadow-indigo-900" : "text-slate-950"}
			`} 
			
		>
			{children}
		</button>
	);
}