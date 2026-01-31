import { getJogos } from "@/actions/jogo";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";

export default  function FormPublicarJogo() {
	return(
		<form className="">
			<Card extraClassNames="w-4xl">
				
				<div className="grid-cols-2 grid gap-3">
					<div className="grid col-span-2">
						<Label htmlFor="nome">Nome do Jogo</Label>
						<Input name="nome" id="nome"/>
					</div>

					<div className="grid">
						<Label htmlFor="preco">Preço (R$)</Label>
						<Input name="preco" id="preco"/>
					</div>

					<div className="grid">
						<Label htmlFor="status">Status</Label>
						<Select defaultValue="default" name="status" id="status">
							<option value="default" disabled>Selecione</option>
							<option value="disponivel">Disponível</option>
							<option value="indisponivel">Indisponível</option>
							<option value="pre-venda">Pré-Venda</option>
						</Select>
					</div>
				</div>
				
				<div className="grid">
					<Label htmlFor="descricao">Descrição</Label>
					<TextArea rows={6} name="descricao" id="descricao"/>
				</div>

				<Button type="submit">Enviar</Button>
			</Card>
		</form>
	);
}