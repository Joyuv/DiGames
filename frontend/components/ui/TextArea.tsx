import { ComponentProps, ReactNode } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
	children?: ReactNode
};

export default function TextArea({ children, ...props }: TextAreaProps) {
	return(
		<textarea {...props}
			className="
				bg-slate-700
				rounded
				border border-slate-600 focus:border-indigo-500
				shadow-md
				p-2
				outline-0
			"
		>
			{children}
		</textarea>
	);
}