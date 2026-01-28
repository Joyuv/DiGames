import Image from "next/image";
import logoDiGames from "@/public/assets/digames.png"
import Link from "next/link";
import ThemeButton from "./ThemeButton";
import MenuButton from "./MenuButton";

export default function Header() {
	return(
		<header 
			className="
				flex items-center justify-between
				py-4 px-8
				bg-slate-950
				bg-linear-to-b from-slate-900 to-slate-800
				border-b border-slate-700

			"
		>
			<Link href="/">
				<Image src={logoDiGames} alt=""
					className="w-30"
				/>
			</Link>
			<div className="flex gap-2">
				<ThemeButton />
				<MenuButton />
			</div>
		</header>
	);
}