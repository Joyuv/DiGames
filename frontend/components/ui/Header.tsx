import Image from "next/image";
import logoDiGames from "@/public/assets/logo_digames.png"
import Link from "next/link";

export default function Header() {
	return(
		<header 
			className="
				flex items-center
				bg-slate-950
				bg-gradient-to-b from-slate-900 to-slate-800
				border-b border-slate-900
			"
		>
			<Link href="/">
				<Image src={logoDiGames} alt=""
					className="w-40"
				/>
			</Link>
		</header>
	);
}