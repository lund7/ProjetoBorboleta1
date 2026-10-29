import { NextResponse } from "next/server";
import type { Dados } from "@/lib/tipos";

export async function GET(request: Request) {
  const urlJson = new URL("/data/borboleta-dados.json", request.url);

  try {
    const resposta = await fetch(urlJson, { cache: "no-store" });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    const dados: Dados = await resposta.json();

    return NextResponse.json(dados.medicacoes);
  } catch {
    return NextResponse.json(
      { erro: "Não foi possível carregar os medicamentos." },
      { status: 500 }
    );
  }
}