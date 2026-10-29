"use client";
import { useEffect, useState } from "react";
import type { Remedio } from "@/lib/tipos";

export default function MedicationDashboard() {
  const [remedios, setRemedios] = useState<Remedio[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const salvo = localStorage.getItem("remedios");
    if (salvo) {
      setRemedios(JSON.parse(salvo));
      setCarregando(false);
      return;
    }

    fetch("/api/medicacoes")
      .then((resposta) => {
        if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
        return resposta.json();
      })
      .then((lista: Remedio[]) =>
        setRemedios(lista.map((r) => ({ ...r, tomado: false })))
      )
      .catch(() => setErro("Não foi possível carregar os medicamentos."))
      .finally(() => setCarregando(false));
  }, []);

  // ... resto do componente (marcar, adicionar, remover, progresso)
}