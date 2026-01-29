import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Label from "../ui/Label";

export default function FormPublicarJogo() {
	return(
		<form className="">
			<Card>
				<Label htmlFor="nome">Nome do Jogo</Label>
				<Input name="nome" id="nome"/>
				<Label htmlFor="teste">Só pra teste</Label>
				<Input name="teste" id="teste"/>
				<Button type="submit">Enviar</Button>
			</Card>
		</form>
	);
}