import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";

export default function FormPublicarJogo() {
	return(
		<form className="">
			<Card extraClassNames="w-4xl">
				
				<div className="grid-cols-3 grid gap-3">
					<div className="grid">
						<Label htmlFor="nome">Nome do Jogo</Label>
						<Input name="nome" id="nome"/>
					</div>
					<div className="grid">
						<Label htmlFor="preco">Preço</Label>
						<Input name="preco" id="preco"/>
					</div>
					<div className="grid">
						<Label htmlFor="status">Status</Label>
						<Select name="status" id="status"/>
					</div>
				</div>
				
				<div className="grid">
					<Label htmlFor="descricao">Descrição</Label>
					<TextArea name="descricao" id="descricao"/>
				</div>

				<Button type="submit">Enviar</Button>
			</Card>
		</form>
	);
}