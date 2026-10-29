"use client";

import { useEffect, useState } from "react";

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedSize = Number(localStorage.getItem("tamanhoFonte"));
    const savedContrast = localStorage.getItem("altoContraste") === "true";
    if (savedSize) setFontSize(savedSize);
    setHighContrast(savedContrast);
    document.documentElement.style.setProperty("--font-scale", `${savedSize || 16}px`);
    document.body.classList.toggle("high-contrast", savedContrast);
  }, []);

  function changeFont(action: "menos" | "reset" | "mais") {
    const next = action === "reset" ? 16 : action === "mais" ? Math.min(26, fontSize + 2) : Math.max(12, fontSize - 2);
    setFontSize(next);
    document.documentElement.style.setProperty("--font-scale", `${next}px`);
    document.body.style.fontSize = `${next}px`;
    localStorage.setItem("tamanhoFonte", String(next));
  }

  function toggleContrast() {
    const next = !highContrast;
    setHighContrast(next);
    document.body.classList.toggle("high-contrast", next);
    localStorage.setItem("altoContraste", String(next));
  }

  return <div className="accessibility-bar">
    <span>Acessibilidade:</span>
    <button className="accessibility-btn" type="button" onClick={() => changeFont("menos")} aria-label="Diminuir fonte">A-</button>
    <button className="accessibility-btn" type="button" onClick={() => changeFont("reset")} aria-label="Restaurar fonte">A</button>
    <button className="accessibility-btn" type="button" onClick={() => changeFont("mais")} aria-label="Aumentar fonte">A+</button>
    <button className="accessibility-btn" type="button" onClick={toggleContrast}>🌓 Contraste</button>
  </div>;
}
