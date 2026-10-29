"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

type Medication = { id: number; nome: string; horario: string; tomado: boolean };
const DEFAULT_MEDICATIONS: Medication[] = [
  { id: 1, nome: "Remédio 1", horario: "08:00", tomado: false },
  { id: 2, nome: "Remédio 2", horario: "12:00", tomado: false },
  { id: 3, nome: "Remédio 3", horario: "18:00", tomado: false },
];

export default function MedicationDashboard() {
  const [medications, setMedications] = useState<Medication[]>(DEFAULT_MEDICATIONS);
  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("08:00");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("remedios");
      let loaded = saved === null ? DEFAULT_MEDICATIONS : JSON.parse(saved);
      if (!Array.isArray(loaded)) loaded = [];
      const today = new Date().toDateString();
      if (localStorage.getItem("ultimoReset") !== today) {
        loaded = loaded.map((item: Medication) => ({ ...item, tomado: false }));
        localStorage.setItem("ultimoReset", today);
      }
      setMedications(loaded);
      if (saved === null) localStorage.setItem("remedios", JSON.stringify(loaded));
    } catch (e) {
      console.error("Erro ao carregar medicamentos:", e);
      setMedications([]);
    } finally { setReady(true); }
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("remedios", JSON.stringify(medications));
  }, [medications, ready]);

  const sorted = useMemo(() => [...medications].sort((a, b) => a.horario.localeCompare(b.horario)), [medications]);
  const taken = medications.filter(item => item.tomado).length;
  const progress = medications.length ? Math.round(taken / medications.length * 100) : 0;

  function toggleTaken(id: number) {
    setMedications(current => current.map(item => item.id === id ? { ...item, tomado: !item.tomado } : item));
  }
  function removeMedication(item: Medication) {
    if (window.confirm(`Remover "${item.nome}" da lista?`)) setMedications(current => current.filter(m => m.id !== item.id));
  }
  function addMedication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) { setError("Por favor, informe o nome do remédio."); return; }
    if (!time) { setError("Por favor, informe o horário."); return; }
    const nextId = medications.length ? Math.max(...medications.map(m => m.id)) + 1 : 1;
    setMedications(current => [...current, { id: nextId, nome: name.trim(), horario: time, tomado: false }]);
    setName(""); setTime("08:00"); setError(""); setModalOpen(false);
  }

  return <>
    <section className="content-area">
      <div className="page-heading"><h2>Lembrete de Remédios</h2><button id="btnAdicionarRemedio" className="btn-acao" type="button" onClick={() => { setError(""); setModalOpen(true); }}>+ Adicionar</button></div>
      <article id="Lista"><ul>{sorted.length === 0 ? <li style={{ justifyContent: "center", color: "var(--text-muted)" }}>Nenhum remédio cadastrado.</li> : sorted.map(item => <li key={item.id} className={item.tomado ? "medication-done" : ""}>
        <span>{item.nome} — {new Date(2000, 0, 1, Number(item.horario.split(":")[0]), Number(item.horario.split(":")[1])).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
        <div className="medication-actions"><button className={`btn-acao ${item.tomado ? "btn-muted" : ""}`} type="button" onClick={() => toggleTaken(item.id)}>{item.tomado ? "↩ Desmarcar" : "Já tomei"}</button><button className="btn-acao btn-danger" type="button" onClick={() => removeMedication(item)}>Remover</button></div>
      </li>)}</ul></article>
      <article id="progresso" style={{ marginTop: 10 }}><h2>Progresso Diário</h2><progress value={progress} max={100} /><p id="textoProgresso" style={{ fontSize: ".85rem", color: "var(--text-muted)", marginTop: 4 }}>{taken} de {medications.length} remédio{medications.length !== 1 ? "s" : ""} tomado{taken !== 1 ? "s" : ""} hoje ({progress}%)</p></article>
    </section>
    {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setModalOpen(false); }}><form className="modal-card" onSubmit={addMedication} aria-labelledby="modal-title">
      <h3 id="modal-title">Adicionar Remédio</h3><label htmlFor="nomeRemedio">Nome do remédio</label><input id="nomeRemedio" autoFocus value={name} onChange={event => setName(event.target.value)} placeholder="Ex.: Vitamina D" />
      <label htmlFor="horarioRemedio">Horário</label><input id="horarioRemedio" type="time" value={time} onChange={event => setTime(event.target.value)} />
      {error && <p className="error-message" role="alert">{error}</p>}
      <div className="modal-actions"><button className="accessibility-btn" type="button" onClick={() => setModalOpen(false)}>Cancelar</button><button className="btn-acao" type="submit">Adicionar</button></div>
    </form></div>}
  </>;
}
