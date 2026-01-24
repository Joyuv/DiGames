import Image from "next/image";
import logoDiGames from "@/public/assets/logo_digames.svg"
import Link from "next/link";
import ThemeButton from "./ThemeButton";

export default function Header() {
	return(
		<header 
			className="
				flex items-center
				bg-slate-950
				bg-linear-to-b from-slate-900 to-slate-800
				border-b border-slate-700
			"
		>
			<Link href="/">
				<Image src={logoDiGames} alt=""
					className="w-40"
				/>
			</Link>
			<ThemeButton />
		</header>
	);
}