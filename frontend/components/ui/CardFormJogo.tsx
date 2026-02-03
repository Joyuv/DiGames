import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import Label from "./Label";
import Select from "./Select";
import SelectGeneros from "./SelectGeneros";
import TextArea from "./TextArea";
import { GeneroOption } from "@/types/genero";

interface CardFormJogoProps {
  submitButtonText: string;
  nomeValue?: string;
  precoValue?: string;
  statusValue?: string;
  descricaoValue?: string;
  generosValue?: GeneroOption[];
}

export default function CardFormJogo({
  submitButtonText,
  nomeValue,
  precoValue = "0,00",
  statusValue = "",
  descricaoValue,
  generosValue = [],
}: CardFormJogoProps) {
  return (
    <Card extraClassNames="w-3xl">
      <div className="grid-cols-2 grid gap-3">
        <div className="grid col-span-2">
          <Label htmlFor="nome">Nome do Jogo</Label>
          <Input defaultValue={nomeValue} required name="nome" id="nome" />
        </div>

        <div className="grid">
          <Label htmlFor="preco">Preço (R$)</Label>
          <Input
            type="price"
            required
            name="preco"
            id="preco"
            defaultValue={precoValue}
          />
        </div>

        <div className="grid">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={statusValue} required name="status" id="status">
            <option value="" disabled>
              Selecione
            </option>
            <option value="Disponível">Disponível</option>
            <option value="Indisponível">Indisponível</option>
            <option value="Pré-venda">Pré-venda</option>
          </Select>
        </div>
      </div>

      <div className="grid">
        <Label htmlFor="descricao">Descrição</Label>
        <TextArea
          defaultValue={descricaoValue}
          required
          rows={6}
          name="descricao"
          id="descricao"
        />
      </div>

      <div className="grid">
        <SelectGeneros generosDefault={generosValue}/>
      </div>

      <Button type="submit">{submitButtonText}</Button>
    </Card>
  );
}
