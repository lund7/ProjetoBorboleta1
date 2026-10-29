"use client";
import { useEffect, useState } from "react";
import type { Servico } from "@/lib/tipos";

export default function ServiceList() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [tipo, setTipo] = useState("todos");
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/servicos?tipo=${tipo}&bairro=${encodeURIComponent(busca)}`)
      .then((resposta) => {
        if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
        return resposta.json();
      })
      .then((lista: Servico[]) => setServicos(lista))
      .catch(() => setErro("Não foi possível carregar os serviços."));
  }, [tipo, busca]);

  // ... select de tipo, campo de busca e lista de serviços
}