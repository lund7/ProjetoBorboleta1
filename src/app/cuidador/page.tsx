export default function CaregiverPage() {
  return <section className="content-area caregiver-profile">
    <h2>Central do Cuidador</h2>
    <div aria-label="Imagem de perfil de Maria Silva" style={{ width: 150, height: 150, borderRadius: "50%", background: "var(--secondary-color)", display: "grid", placeItems: "center", fontSize: 48, color: "var(--primary-color)", border: "4px solid var(--border-color)" }}>MS</div>
    <p><strong>Maria Silva</strong><br />Cuidadora Principal</p>
    <p>Ver Perfil Completo</p>
    <a href="https://www.gov.br/mdh/pt-br" target="_blank" rel="noreferrer">Informações e direitos humanos</a>
    <p>Chamar Agora</p>
  </section>;
}
