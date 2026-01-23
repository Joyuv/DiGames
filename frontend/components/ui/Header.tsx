import Image from "next/image";
import logoDiGames from "@/public/assets/logo_digames.png"
import Link from "next/link";

export default function Header() {
	return(
		<header 
			className="
				bg-slate-950
				flex items-center
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