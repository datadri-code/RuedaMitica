"use client";

import { useState } from "react";

type Creature = {
  name: string;
  subtitle: string;
  emoji: string;
  color: string;
};

const creatures: Creature[] = [
  { name: "Dragón", subtitle: "Guardián de fuego", emoji: "🐉", color: "#e56b4f" },
  { name: "Fénix", subtitle: "Ave del renacer", emoji: "🦅", color: "#e5a34f" },
  { name: "Kraken", subtitle: "Abismo de las mareas", emoji: "🐙", color: "#5b8e9f" },
  { name: "Unicornio", subtitle: "Magia indómita", emoji: "🦄", color: "#aa86c5" },
  { name: "Grifo", subtitle: "Vigía de las cumbres", emoji: "🦁", color: "#768d63" },
  { name: "Yeti", subtitle: "Señor de la nieve", emoji: "👣", color: "#82a5ac" },
];

function CreatureMark({ creature, large = false }: { creature: Creature; large?: boolean }) {
  return (
    <span
      className={`creature-mark ${large ? "creature-mark-large" : ""}`}
      style={{ backgroundColor: `${creature.color}22` }}
      aria-hidden="true"
    >
      {creature.emoji}
    </span>
  );
}

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  function spin() {
    if (spinning) return;
    const next = Math.floor(Math.random() * creatures.length);
    setSpinning(true);
    setRotation((current) => current + 1440 + (330 - next * 60));
    window.setTimeout(() => {
      setSelected(next);
      setHistory((current) => [next, ...current.filter((item) => item !== next)].slice(0, 3));
      setSpinning(false);
    }, 1800);
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Mítica, inicio">
          <span className="brand-mark">✦</span>
          <span>Mítica</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#wheel">La rueda</a>
          <a href="#creatures">Criaturas</a>
          <button className="language-button" type="button">ES <span>⌄</span></button>
        </nav>
      </header>

      <section className="intro" id="top">
        <p className="eyebrow">Oráculo de bolsillo <span>✧</span></p>
        <h1>¿Qué criatura<br /><em>te encuentra hoy?</em></h1>
        <p className="intro-copy">Deja que el azar abra una puerta. Cada giro revela una criatura, una energía y una pequeña historia.</p>
      </section>

      <section className="game-layout" id="wheel">
        <div className="wheel-column">
          <div className={`wheel-wrap ${spinning ? "is-spinning" : ""}`}>
            <div className="wheel-pointer" aria-hidden="true">▼</div>
            <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
              {creatures.map((creature, index) => (
                <div
                  className="wheel-slice"
                  key={creature.name}
                  style={{ transform: `rotate(${index * 60 + 30}deg)` }}
                >
                  <span style={{ transform: `rotate(-${index * 60 + 30}deg)` }}>{creature.emoji}</span>
                </div>
              ))}
              <div className="wheel-center"><span>✦</span></div>
            </div>
          </div>
          <button className="spin-button" type="button" onClick={spin} disabled={spinning}>
            {spinning ? "Escuchando..." : "Girar la rueda"}<span>↗</span>
          </button>
          <p className="hint"><span>↻</span> El destino cambia en cada giro</p>
        </div>

        <aside className="result-panel" aria-live="polite">
          <div className="panel-label"><span>01</span> TU CRIATURA</div>
          <div className="result-portrait" style={{ backgroundColor: `${creatures[selected].color}20` }}>
            <CreatureMark creature={creatures[selected]} large />
            <span className="portrait-sparkle">✦</span>
          </div>
          <p className="result-kicker">Tu energía de hoy</p>
          <h2>{creatures[selected].name}</h2>
          <p className="result-subtitle">{creatures[selected].subtitle}</p>
          <div className="result-line" />
          <p className="result-quote">“Hay algo antiguo en ti que sabe exactamente cuándo alzar el vuelo.”</p>
          <div className="result-footer"><span>Descubierta ahora</span><span className="dot" /></div>
        </aside>
      </section>

      <section className="creature-section" id="creatures">
        <div className="section-heading"><div><p className="eyebrow">El bestiario</p><h2>Seis mundos,<br /><em>un solo giro.</em></h2></div><p>Una colección de símbolos<br />para dejarte sorprender.</p></div>
        <div className="creature-grid">
          {creatures.map((creature, index) => (
            <button className={`creature-card ${selected === index ? "active" : ""}`} key={creature.name} onClick={() => setSelected(index)} type="button">
              <CreatureMark creature={creature} />
              <span><strong>{creature.name}</strong><small>{creature.subtitle}</small></span>
              <span className="card-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      {history.length > 0 && <section className="history"><span>ÚLTIMOS DESCUBRIMIENTOS</span>{history.map((index) => <strong key={index}>{creatures[index].emoji} {creatures[index].name}</strong>)}</section>}
      <footer><span>Proyecto final de la materia de ingeniería de software - Carrera Ahumada Adrián - id 225361598</span><span><p></p></span><span>Hecho para las mentes curiosas <b>✦</b><b>✦</b></span>      
      </footer>
      <p>Memento mori</p>  
    </main>
  );
}
