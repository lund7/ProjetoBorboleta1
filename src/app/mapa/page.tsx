export default function MapPage() {
  const searchUrl = (query: string) => `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
  return <section className="content-area">
    <h2>Opções</h2>
    <div className="map-options">
      <a href={searchUrl("UBS unidade básica de saúde") } target="_blank" rel="noreferrer"><button id="UBS" type="button">UBS próxima</button></a>
      <a href={searchUrl("hospital") } target="_blank" rel="noreferrer"><button id="Hospital" type="button">Hospital próximo</button></a>
      <a href="tel:192"><button id="emergencia" type="button">Emergência (192)</button></a>
    </div>
    <article className="container" id="Mapa"><h2>Navegação / UBS</h2><p>Selecione uma opção para abrir uma pesquisa no Google Maps. Os resultados dependem da sua localização e das informações disponíveis no serviço externo.</p></article>
  </section>;
}
