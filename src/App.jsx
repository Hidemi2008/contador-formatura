import { useEffect, useState } from "react";

// Fim do semestre: 16/10/2026 às 23:59:59 (mês começa em 0 → 9 = outubro)
const TARGET = new Date(2026, 11, 16, 23, 59, 59);

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    done: false,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n) => String(n).padStart(2, "0");

function Unit({ value, label }) {
  return (
    <div className="unit">
      <span className="unit-value" key={value}>
        {pad(value)}
      </span>
      <span className="unit-label">{label}</span>
    </div>
  );
}

export default function App() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="stage">
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <section className="card">
        <p className="eyebrow">🎓 Contagem regressiva</p>
        <h1>
          Rumo à <span className="grad">formatura</span>
        </h1>
        <p className="sub">
          {time.done
            ? "Semestre concluído. Missão cumprida!"
            : "Falta pouco para o fim do semestre (16/10/2026)"}
        </p>

        <div className="clock">
          <Unit value={time.days} label="dias" />
          <span className="sep">:</span>
          <Unit value={time.hours} label="horas" />
          <span className="sep">:</span>
          <Unit value={time.minutes} label="minutos" />
          <span className="sep">:</span>
          <Unit value={time.seconds} label="segundos" />
        </div>

        <p className="foot">Feito com React ⚛️</p>
      </section>
    </main>
  );
}