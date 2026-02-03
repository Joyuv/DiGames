"use client";

import FormAtualizarJogo from "@/components/forms/FormAtualizarJogo";
import FormSection from "@/components/ui/FormSection";
import { useParams } from "next/navigation";

export default function AtualizarJogo() {
  const params = useParams<{ id: string }>();

  return (
    <FormSection>
      <FormAtualizarJogo id={params.id} />
    </FormSection>
  );
}
