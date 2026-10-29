import { NextResponse } from "next/server";
import type { Dados } from "@/lib/tipos";

export async function GET(request: Request) {
  // No servidor, o fetch exige URL absoluta
  const urlJson = new URL("/data/borboleta-dados.json", request.url);

  try {
    const resposta = await fetch(urlJson, { cache: "no-store" });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    const dados: Dados = await resposta.json();

    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get("tipo");
    const bairro = (searchParams.get("bairro") ?? "").toLowerCase();

    const servicos = dados.servicos
      .filter((s) => !tipo || tipo === "todos" || s.tipo === tipo)
      .filter((s) => s.bairro.toLowerCase().includes(bairro));

    return NextResponse.json(servicos);
  } catch {
    return NextResponse.json(
      { erro: "Não foi possível carregar os dados." },
      { status: 500 }
    );
  }
}