import { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BIRTHDAY_TEMPLATES = [
  { id: "t1", label: "Sunrise Spark", emoji: "🌅", accent: "#fb7185", title: "A Bright New Day" },
  { id: "t2", label: "Candy Bloom", emoji: "🌸", accent: "#f472b6", title: "Bloom With Joy" },
  { id: "t3", label: "Sky Adventure", emoji: "🚀", accent: "#38bdf8", title: "Next Level Fun" },
  { id: "t4", label: "Golden Delight", emoji: "🎂", accent: "#fbbf24", title: "Shine & Celebrate" },
  { id: "t5", label: "Orange Pop", emoji: "🍊", accent: "#f97316", title: "Fresh Birthday Vibes" },
  { id: "t6", label: "Ruby Party", emoji: "🎉", accent: "#ef4444", title: "Bold Celebration" },
  { id: "t7", label: "Mint Magic", emoji: "🪄", accent: "#22c55e", title: "Cool & Joyful" },
  { id: "t8", label: "Lavender Glow", emoji: "✨", accent: "#a855f7", title: "Soft & Dreamy" },
];

const ANNIVERSARY_TEMPLATES = [
  { id: "a1", label: "Rose Promise", emoji: "🌹", accent: "#fb7185", title: "Love In Bloom" },
  { id: "a2", label: "Amber Memories", emoji: "✨", accent: "#f59e0b", title: "Warm Golden Moments" },
  { id: "a3", label: "Forever Pink", emoji: "💞", accent: "#f472b6", title: "Together Always" },
  { id: "a4", label: "Blue Bond", emoji: "🕊️", accent: "#3b82f6", title: "Calm & Strong" },
  { id: "a5", label: "Golden Toast", emoji: "🥂", accent: "#fbbf24", title: "Celebrate The Journey" },
  { id: "a6", label: "Emerald Vows", emoji: "💚", accent: "#22c55e", title: "Fresh As Ever" },
  { id: "a7", label: "Crimson Hearts", emoji: "❤️", accent: "#ef4444", title: "Deep & True" },
  { id: "a8", label: "Midnight Luxury", emoji: "💎", accent: "#8b5cf6", title: "Elegant & Timeless" },
];

const GENDER_OPTIONS = [
  { value: "male", label: "Male → Hand Cricket 🏏" },
  { value: "female", label: "Female → XO Game ✨" },
  { value: "other", label: "Other → XO Game ✨" },
];

const DEFAULT_SECRET = "Your smile is the secret wish that makes every memory brighter.";

function useTypewriter(text, speed = 48) {
  const [value, setValue] = useState("");
  useEffect(() => {
    let i = 0;
    setValue("");
    const id = setInterval(() => {
      i += 1;
      setValue(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return value;
}

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function AppStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root { min-height: 100%; }

      body {
        font-family: 'DM Sans', sans-serif;
        background: #09070f;
        color: #e8e0f5;
        overflow-x: hidden;
      }

      body::before {
        content: "";
        position: fixed;
        inset: 0;
        z-index: 0;
        background:
          radial-gradient(ellipse 80% 50% at 20% 10%, rgba(139,92,246,.28) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(236,72,153,.20) 0%, transparent 55%),
          radial-gradient(ellipse 50% 60% at 55% 40%, rgba(14,165,233,.12) 0%, transparent 50%),
          #09070f;
        pointer-events: none;
      }

      body::after {
        content: "";
        position: fixed;
        inset: 0;
        z-index: 0;
        background-image: radial-gradient(circle, rgba(255,255,255,.045) 1px, transparent 1px);
        background-size: 36px 36px;
        pointer-events: none;
        opacity: .7;
      }

      button {
        border: 0;
        outline: 0;
        cursor: pointer;
        font-family: inherit;
      }

      .vw-app {
        position: relative;
        z-index: 1;
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        padding: 24px 20px 64px;
      }

      .vw-shell {
        width: min(1140px, 100%);
        display: flex;
        flex-direction: column;
        gap: 28px;
        align-items: center;
      }

      .topbar {
        width: min(100%, 900px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 14px 20px;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 20px;
        backdrop-filter: blur(14px);
        margin: 0 auto;
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: #e2d4ff;
        cursor: pointer;
        user-select: none;
        letter-spacing: .3px;
      }

      .brand-badge {
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        border-radius: 14px;
        background: linear-gradient(135deg, #7c3aed, #ec4899);
        color: white;
        font-size: .9rem;
        font-weight: 700;
        box-shadow: 0 0 20px rgba(139,92,246,.5);
      }

      .ghost-btn {
        padding: 10px 18px;
        border-radius: 999px;
        background: rgba(255,255,255,.06);
        border: 1px solid rgba(255,255,255,.12);
        color: #c4b5fd;
        font-weight: 600;
        font-size: .9rem;
        transition: all .22s ease;
      }

      .ghost-btn:hover {
        background: rgba(255,255,255,.1);
        transform: translateY(-2px);
      }

      .primary-btn {
        padding: 14px 26px;
        border-radius: 16px;
        background: linear-gradient(135deg, #7c3aed, #ec4899);
        color: white;
        font-size: .95rem;
        font-weight: 700;
        box-shadow: 0 10px 28px rgba(139,92,246,.35);
        display: inline-flex;
        align-items: center;
        gap: 8px;
        position: relative;
        overflow: hidden;
        transition: transform .22s ease, box-shadow .22s ease, filter .22s ease;
      }

      .primary-btn::before {
        content: "";
        position: absolute;
        top: 0;
        left: -120%;
        width: 100%;
        height: 100%;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,.22), transparent);
        transition: left .6s ease;
      }

      .primary-btn:hover::before {
        left: 120%;
      }

      .primary-btn:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 16px 38px rgba(139,92,246,.52);
      }

      .primary-btn:disabled {
        opacity: .65;
        cursor: not-allowed;
        transform: none;
      }

      .outline-btn {
        padding: 14px 26px;
        border-radius: 16px;
        background: rgba(255,255,255,.02);
        border: 1px solid rgba(167,139,250,.38);
        color: #c4b5fd;
        font-size: .95rem;
        font-weight: 600;
        transition: all .22s ease;
      }

      .outline-btn:hover {
        background: rgba(139,92,246,.12);
        transform: translateY(-3px);
        border-color: rgba(167,139,250,.7);
      }

      .hero {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
        justify-items: center;
        align-items: center;
        text-align: center;
      }

      .hero-card {
        width: min(100%, 900px);
        background: rgba(255,255,255,.05);
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 34px;
        padding: 48px 40px;
        backdrop-filter: blur(18px);
        position: relative;
        overflow: hidden;
        box-shadow: 0 28px 70px rgba(0,0,0,.35);
      }

      .hero-card::after {
        content: "";
        position: absolute;
        inset: -40%;
        background: linear-gradient(
          120deg,
          transparent 35%,
          rgba(255,255,255,.06) 50%,
          transparent 65%
        );
        transform: translateX(-60%);
        animation: shimmerMove 7s ease-in-out infinite;
        pointer-events: none;
      }

      @keyframes shimmerMove {
        0% { transform: translateX(-60%) rotate(10deg); opacity: 0; }
        30% { opacity: 1; }
        50% { transform: translateX(20%) rotate(10deg); opacity: .6; }
        100% { transform: translateX(60%) rotate(10deg); opacity: 0; }
      }

      .hero-card::before {
        content: "";
        position: absolute;
        top: -60px;
        left: -60px;
        width: 220px;
        height: 220px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(139,92,246,.18), transparent 70%);
        pointer-events: none;
      }

      .eyebrow {
        display: inline-flex;
        gap: 8px;
        align-items: center;
        padding: 8px 16px;
        border-radius: 999px;
        background: rgba(139,92,246,.15);
        border: 1px solid rgba(167,139,250,.25);
        color: #c4b5fd;
        font-size: .82rem;
        font-weight: 600;
        letter-spacing: .5px;
        text-transform: uppercase;
      }

      .hero h1 {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(2.8rem, 5.5vw, 5rem);
        line-height: .95;
        font-weight: 700;
        color: #f0eaff;
        margin: 20px auto 16px;
        max-width: 11ch;
      }

      .hero h1 .grad {
        background: linear-gradient(135deg, #c084fc, #f472b6, #fb923c);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .typewriter-line {
        min-height: 32px;
        color: #9d8bbf;
        font-size: .97rem;
        font-weight: 500;
        max-width: 60ch;
        margin: 0 auto;
      }

      .cursor {
        display: inline-block;
        width: 2px;
        height: 1em;
        background: #9d8bbf;
        vertical-align: text-bottom;
        margin-left: 2px;
        animation: blink .9s step-end infinite;
      }

      @keyframes blink {
        50% { opacity: 0; }
      }

      .hero-actions {
        display: flex;
        gap: 12px;
        margin-top: 28px;
        flex-wrap: wrap;
        justify-content: center;
      }

      .mini-note {
        margin-top: 16px;
        font-size: .82rem;
        color: #7a6893;
        line-height: 1.6;
        max-width: 62ch;
        margin-left: auto;
        margin-right: auto;
      }

      .feature-panel {
        width: min(100%, 900px);
        border-radius: 34px;
        overflow: hidden;
        min-height: 420px;
        position: relative;
        background: linear-gradient(145deg, #1e0a3c, #2d1052, #0f1729);
        border: 1px solid rgba(255,255,255,.08);
        box-shadow: 0 32px 80px rgba(0,0,0,.5);
        display: grid;
        place-items: center;
        padding: 28px;
      }

      .feature-panel::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse at 30% 30%, rgba(139,92,246,.35) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 70%, rgba(236,72,153,.25) 0%, transparent 45%);
        pointer-events: none;
      }

      .fp-orb {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(167,139,250,.18), transparent 70%);
        animation: floatOrb 6s ease-in-out infinite alternate;
      }

      .fp-orb1 {
        width: 200px;
        height: 200px;
        top: -50px;
        right: -50px;
      }

      .fp-orb2 {
        width: 160px;
        height: 160px;
        bottom: 20px;
        left: -40px;
        animation-delay: -3s;
      }

      @keyframes floatOrb {
        from { transform: scale(1) translate(0,0); }
        to { transform: scale(1.2) translate(15px,-15px); }
      }

      .feature-stack {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 18px;
        position: relative;
        z-index: 1;
      }

      .feature-row {
        display: flex;
        width: 100%;
      }

      .feature-row.left {
        justify-content: flex-start;
      }

      .feature-row.right {
        justify-content: flex-end;
      }

      .feature-card {
        width: min(330px, 78%);
        background: rgba(255,255,255,.08);
        border: 1px solid rgba(255,255,255,.12);
        backdrop-filter: blur(16px);
        border-radius: 22px;
        padding: 20px 22px;
        color: white;
        box-shadow: 0 16px 40px rgba(0,0,0,.3);
        position: relative;
        overflow: hidden;
        transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
      }

      .feature-card::after {
        content: "";
        position: absolute;
        inset: auto -30px -30px auto;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: rgba(255,255,255,.08);
        filter: blur(10px);
        pointer-events: none;
      }

      .feature-card strong {
        display: block;
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 6px;
        letter-spacing: .2px;
      }

      .feature-card span {
        font-size: .85rem;
        opacity: .78;
        line-height: 1.5;
      }

      .feature-row.left .feature-card {
        transform: rotate(-3deg);
        animation: floatCardLeft 5.5s ease-in-out infinite;
      }

      .feature-row.right .feature-card {
        transform: rotate(3deg);
        animation: floatCardRight 5.5s ease-in-out infinite;
      }

      .feature-row:nth-child(2) .feature-card {
        animation-delay: .15s;
      }

      .feature-row:nth-child(3) .feature-card {
        animation-delay: .3s;
      }

      .feature-card:hover {
        transform: translateY(-5px) scale(1.02) rotate(0deg) !important;
        box-shadow: 0 20px 50px rgba(0,0,0,.45);
      }

      @keyframes floatCardLeft {
        0%, 100% { transform: translateY(0) rotate(-3deg); }
        50% { transform: translateY(-8px) rotate(-3deg); }
      }

      @keyframes floatCardRight {
        0%, 100% { transform: translateY(0) rotate(3deg); }
        50% { transform: translateY(-8px) rotate(3deg); }
      }

      .glass-card {
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 28px;
        padding: 32px;
        backdrop-filter: blur(18px);
        width: min(100%, 900px);
      }

      .section-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(1.9rem, 4vw, 2.8rem);
        font-weight: 700;
        color: #ede9fe;
        margin-bottom: 6px;
        text-align: center;
      }

      .section-sub {
        color: #7a6893;
        font-size: .9rem;
        font-weight: 500;
        text-align: center;
      }

      .grid-2 {
        display: grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        gap: 18px;
      }

      .choice-card {
        min-height: 220px;
        border-radius: 26px;
        padding: 28px 26px;
        color: white;
        position: relative;
        overflow: hidden;
        text-align: left;
        box-shadow: 0 20px 50px rgba(0,0,0,.35);
        transition: all .25s ease;
        cursor: pointer;
        transform: translateY(0);
      }

      .choice-card::after {
        content: "";
        position: absolute;
        inset: auto -50px -60px auto;
        width: 160px;
        height: 160px;
        border-radius: 50%;
        background: rgba(255,255,255,.12);
        filter: blur(12px);
      }

      .choice-card:hover {
        transform: translateY(-6px) scale(1.01);
      }

      .choice-card h3 {
        font-family: 'Cormorant Garamond', serif;
        font-size: 2rem;
        font-weight: 700;
        margin: 14px 0 8px;
      }

      .choice-card p {
        opacity: .88;
        font-size: .88rem;
        line-height: 1.5;
        max-width: 22ch;
      }

      .birthday-choice {
        background: linear-gradient(145deg, #4c1d95, #7c3aed, #a855f7);
      }

      .anniversary-choice {
        background: linear-gradient(145deg, #831843, #db2777, #f472b6);
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        gap: 16px;
        margin-top: 24px;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 7px;
      }

      .field.full {
        grid-column: 1 / -1;
      }

      .field label {
        font-size: .82rem;
        font-weight: 600;
        color: #9d8bbf;
        letter-spacing: .3px;
        text-transform: uppercase;
      }

      .field input,
      .field select,
      .field textarea {
        background: rgba(255,255,255,.05);
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 14px;
        padding: 13px 15px;
        color: #e8e0f5;
        font: inherit;
        font-size: .93rem;
        transition: all .2s ease;
        outline: none;
      }

      .field input::placeholder,
      .field textarea::placeholder {
        color: #5c4e74;
      }

      .field select option {
        background: #1e1332;
        color: #e8e0f5;
      }

      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        border-color: rgba(139,92,246,.6);
        background: rgba(139,92,246,.07);
        box-shadow: 0 0 0 3px rgba(139,92,246,.15);
      }

      .field textarea {
        min-height: 110px;
        resize: vertical;
      }

      .template-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
        gap: 12px;
        margin-top: 8px;
      }

      .template-card {
        border-radius: 18px;
        padding: 16px;
        text-align: left;
        cursor: pointer;
        transition: all .2s ease;
        overflow: hidden;
      }

      .template-card:hover {
        transform: translateY(-2px);
      }

      .template-card.selected {
        transform: translateY(-2px);
      }

      .template-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .template-emoji {
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        border-radius: 12px;
        font-size: 1.2rem;
        color: white;
      }

      .template-card strong {
        display: block;
        color: #e2d4ff;
        font-size: .9rem;
        font-weight: 700;
      }

      .template-card .t-sub {
        color: #7a6893;
        font-size: .8rem;
        margin-top: 2px;
      }

      .banner {
        margin-top: 14px;
        padding: 14px 18px;
        border-radius: 14px;
        font-weight: 600;
        font-size: .9rem;
      }

      .banner.success {
        background: rgba(34,197,94,.12);
        border: 1px solid rgba(34,197,94,.2);
        color: #86efac;
      }

      .banner.error {
        background: rgba(239,68,68,.12);
        border: 1px solid rgba(239,68,68,.2);
        color: #fca5a5;
      }

      .spinner {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 2px solid rgba(255,255,255,.3);
        border-top-color: white;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .secret-layout {
        display: grid;
        grid-template-columns: .95fr 1.05fr;
        gap: 20px;
        margin-top: 20px;
      }

      .secret-badge {
        display: inline-flex;
        gap: 8px;
        align-items: center;
        padding: 8px 16px;
        border-radius: 999px;
        background: rgba(139,92,246,.14);
        border: 1px solid rgba(167,139,250,.25);
        color: #c4b5fd;
        font-weight: 600;
        font-size: .85rem;
      }

      .secret-head h2 {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(1.9rem, 4vw, 2.8rem);
        font-weight: 700;
        color: #f0eaff;
        margin: 12px 0 8px;
      }

      .secret-message {
        margin-top: 16px;
        padding: 18px 20px;
        border-radius: 18px;
        background: rgba(139,92,246,.08);
        border: 1px solid rgba(167,139,250,.18);
        color: #c4b5fd;
        line-height: 1.75;
        font-size: .93rem;
      }

      .secret-message strong {
        display: block;
        color: #a78bfa;
        font-size: .8rem;
        font-weight: 700;
        letter-spacing: .4px;
        text-transform: uppercase;
        margin-bottom: 10px;
      }

      .game-shell {
        background: rgba(255,255,255,.03);
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 24px;
        padding: 22px;
        backdrop-filter: blur(14px);
      }

      .game-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.6rem;
        font-weight: 700;
        color: #e2d4ff;
        margin-bottom: 12px;
      }

      .pill {
        padding: 6px 14px;
        border-radius: 999px;
        background: rgba(139,92,246,.14);
        border: 1px solid rgba(167,139,250,.2);
        color: #c4b5fd;
        font-size: .82rem;
        font-weight: 600;
      }

      .game-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 14px;
      }

      .game-panel {
        background: rgba(255,255,255,.03);
        border: 1px solid rgba(255,255,255,.07);
        border-radius: 18px;
        padding: 16px;
        margin-top: 12px;
      }

      .game-status {
        margin-top: 10px;
        font-weight: 600;
        color: #a78bfa;
        min-height: 22px;
        font-size: .9rem;
      }

      .shot-grid {
        display: grid;
        grid-template-columns: repeat(6, minmax(0,1fr));
        gap: 8px;
        margin-top: 14px;
      }

      .shot-btn {
        padding: 14px 0;
        border-radius: 14px;
        background: linear-gradient(135deg, #5b21b6, #7c3aed);
        color: white;
        font-weight: 800;
        font-size: 1rem;
        border: 1px solid rgba(167,139,250,.25);
        transition: all .15s ease;
        box-shadow: 0 4px 14px rgba(91,33,182,.3);
      }

      .shot-btn:hover:not(:disabled) {
        transform: translateY(-2px) scale(1.06);
        box-shadow: 0 8px 20px rgba(91,33,182,.4);
      }

      .shot-btn:disabled {
        opacity: .35;
        cursor: not-allowed;
      }

      .xo-board {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 14px;
        max-width: 260px;
      }

      .xo-cell {
        aspect-ratio: 1/1;
        border-radius: 14px;
        background: rgba(255,255,255,.05);
        border: 1px solid rgba(255,255,255,.10);
        font-size: 2rem;
        font-weight: 900;
        color: white;
        cursor: pointer;
        transition: all .15s ease;
        display: grid;
        place-items: center;
      }

      .xo-cell:hover:not(:disabled) {
        background: rgba(139,92,246,.18);
        transform: scale(1.04);
      }

      .xo-cell:disabled {
        cursor: default;
      }

      .xo-cell.x-cell {
        color: #f472b6;
      }

      .xo-cell.o-cell {
        color: #60a5fa;
      }

      .xo-cell.win-cell {
        background: rgba(139,92,246,.25);
        border-color: rgba(167,139,250,.5);
      }

      .ring-stage {
        min-height: 240px;
        display: grid;
        place-items: center;
        perspective: 900px;
      }

      .ring {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        position: relative;
        transform-style: preserve-3d;
        animation: ringSpin 2.6s linear infinite;
        background:
          radial-gradient(circle at 35% 35%, rgba(255,255,255,.65), transparent 18%),
          linear-gradient(145deg, #fde68a, #f59e0b 55%, #b45309 100%);
        box-shadow: 0 0 40px rgba(245,158,11,.3), 0 20px 40px rgba(0,0,0,.4);
      }

      .ring::before {
        content: "";
        position: absolute;
        inset: 26px;
        border-radius: 50%;
        background: linear-gradient(145deg, rgba(255,255,255,.8), rgba(9,7,15,.9));
      }

      .ring::after {
        content: "";
        position: absolute;
        inset: -10px;
        border-radius: 50%;
        border: 10px solid rgba(253,230,138,.4);
        filter: blur(3px);
        transform: translateZ(-25px);
      }

      @keyframes ringSpin {
        0%   { transform: rotateX(72deg) rotateZ(0deg); }
        100% { transform: rotateX(72deg) rotateZ(360deg); }
      }

      .footer-note {
        text-align: center;
        color: #fbf8ffff;
        font-size: .82rem;
        padding-bottom: 8px;
      }

      .fade-in {
        animation: fadeIn .45s ease both;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .center {
        text-align: center;
      }

      @media (max-width: 980px) {
        .hero,
        .secret-layout {
          grid-template-columns: 1fr;
        }

        .feature-panel {
          min-height: 320px;
        }

        .feature-card {
          width: min(340px, 92%);
        }
      }

      @media (max-width: 680px) {
        .topbar {
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .grid-2,
        .form-grid {
          grid-template-columns: 1fr;
        }

        .shot-grid {
          grid-template-columns: repeat(3, minmax(0,1fr));
        }

        .glass-card,
        .hero-card {
          padding: 22px 18px;
        }

        .hero-actions {
          flex-direction: column;
        }

        .primary-btn,
        .outline-btn {
          width: 100%;
          justify-content: center;
        }

        .feature-row.left,
        .feature-row.right {
          justify-content: center;
        }

        .feature-card {
          width: 100%;
          transform: none !important;
        }
      }
    `}</style>
  );
}

function TemplateGrid({ items, selected, onSelect }) {
  return (
    <div className="template-row">
      {items.map((t) => {
        const isSelected = selected === t.id;
        return (
          <button
            key={t.id}
            className={cx("template-card", isSelected && "selected")}
            onClick={() => onSelect(t.id)}
            type="button"
            style={{
              background: isSelected
                ? `linear-gradient(135deg, ${t.accent}28, ${t.accent}14 55%, rgba(255,255,255,.05))`
                : `linear-gradient(135deg, ${t.accent}18, rgba(255,255,255,.04))`,
              border: `1px solid ${isSelected ? t.accent : `${t.accent}55`}`,
              boxShadow: isSelected
                ? `0 0 0 2px ${t.accent}33, 0 16px 32px rgba(0,0,0,.25)`
                : "0 10px 24px rgba(0,0,0,.18)",
            }}
          >
            <div className="template-top">
              <div
                className="template-emoji"
                style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}cc)` }}
              >
                {t.emoji}
              </div>
              {isSelected && <span style={{ color: t.accent, fontSize: ".75rem", fontWeight: 700 }}>✓</span>}
            </div>
            <strong style={{ color: t.accent }}>{t.label}</strong>
            <div className="t-sub">{t.title}</div>
          </button>
        );
      })}
    </div>
  );
}

function sendWish(payload) {
  return fetch(`${API_URL}/api/send-wish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Something went wrong.");
    return data;
  });
}

function BirthdayForm({ goBack }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return BIRTHDAY_TEMPLATES[Math.floor(Math.random() * BIRTHDAY_TEMPLATES.length)].id;
  });
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    gender: "male",
    message: "",
    secretWish: DEFAULT_SECRET,
  });

  const gameLabel = useMemo(() => {
    return form.gender === "male" ? "Hand Cricket 🏏" : "XO Game ✨";
  }, [form.gender]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    if (!form.name || !form.email) {
      setStatus({ type: "error", text: "Name and email are required." });
      return;
    }
    setLoading(true);
    try {
      await sendWish({ occasion: "birthday", ...form, templateId: selectedTemplate });
      setStatus({ type: "success", text: "Mail sent successfully!" });
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Failed to send." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card fade-in">
      <button className="ghost-btn" type="button" onClick={goBack}>← Back</button>
      <div style={{ marginTop: 18 }}>
        <div className="section-title">Birthday Wish 🎂</div>
        <div className="section-sub">Choose a template & send a secret game link.</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="Priya"
            />
          </div>
          <div className="field">
            <label>Age</label>
            <input
              value={form.age}
              onChange={(e) => setForm((s) => ({ ...s, age: e.target.value }))}
              placeholder="25"
              type="number"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              placeholder="friend@email.com"
              type="email"
            />
          </div>
          <div className="field">
            <label>Game Mode</label>
            <select value={form.gender} onChange={(e) => setForm((s) => ({ ...s, gender: e.target.value }))}>
              {GENDER_OPTIONS.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          <div className="field full">
            <label>Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
              placeholder="Write something from the heart..."
            />
          </div>
          <div className="field full">
            <label>Secret Wish (unlocks after game)</label>
            <textarea
              value={form.secretWish}
              onChange={(e) => setForm((s) => ({ ...s, secretWish: e.target.value }))}
              placeholder="Hidden until they win..."
            />
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <div className="field">
            <label>Choose Template</label>
          </div>
          <TemplateGrid items={BIRTHDAY_TEMPLATES} selected={selectedTemplate} onSelect={setSelectedTemplate} />
        </div>

        <p className="mini-note" style={{ marginTop: 14 }}>
          Game: {gameLabel} · Secret reveals after winning.
        </p>

        {status && <div className={cx("banner", status.type)}>{status.text}</div>}

        <div style={{ marginTop: 18 }}>
          <button className="primary-btn" type="submit" disabled={loading}>
            {loading && <span className="spinner" />}
            {loading ? "Sending..." : "Send Birthday Wish 🎉"}
          </button>
        </div>
      </form>
    </div>
  );
}

function AnniversaryForm({ goBack }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return ANNIVERSARY_TEMPLATES[Math.floor(Math.random() * ANNIVERSARY_TEMPLATES.length)].id;
  });
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    message: "",
    secretWish: "May your love keep writing the prettiest story, one beautiful year at a time.",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    if (!form.name || !form.email) {
      setStatus({ type: "error", text: "Name and email are required." });
      return;
    }
    setLoading(true);
    try {
      await sendWish({ occasion: "anniversary", ...form, templateId: selectedTemplate });
      setStatus({ type: "success", text: "Mail sent successfully!" });
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Failed to send." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card fade-in">
      <button className="ghost-btn" type="button" onClick={goBack}>← Back</button>
      <div style={{ marginTop: 18 }}>
        <div className="section-title">Anniversary Wish 💍</div>
        <div className="section-sub">Celebrate love with a 3D ring reveal.</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label>Couple Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="Ravi & Ananya"
            />
          </div>
          <div className="field">
            <label>Years Together</label>
            <input
              value={form.age}
              onChange={(e) => setForm((s) => ({ ...s, age: e.target.value }))}
              placeholder="5"
              type="number"
            />
          </div>
          <div className="field full">
            <label>Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              placeholder="partner@email.com"
              type="email"
            />
          </div>
          <div className="field full">
            <label>Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
              placeholder="Share a memory or a wish..."
            />
          </div>
          <div className="field full">
            <label>Secret Wish (unlocks after ring reveal)</label>
            <textarea
              value={form.secretWish}
              onChange={(e) => setForm((s) => ({ ...s, secretWish: e.target.value }))}
              placeholder="Hidden until the reveal..."
            />
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <div className="field"><label>Choose Template</label></div>
          <TemplateGrid items={ANNIVERSARY_TEMPLATES} selected={selectedTemplate} onSelect={setSelectedTemplate} />
        </div>

        <p className="mini-note" style={{ marginTop: 14 }}>
          Game: 3D Ring Exchange 💍 · Secret reveals after the reveal.
        </p>

        {status && <div className={cx("banner", status.type)}>{status.text}</div>}

        <div style={{ marginTop: 18 }}>
          <button className="primary-btn" type="submit" disabled={loading}>
            {loading && <span className="spinner" />}
            {loading ? "Sending..." : "Send Anniversary Wish 💞"}
          </button>
        </div>
      </form>
    </div>
  );
}

function HandCricketGame({ onWin, onLose }) {
  const target = 15;
  const [state, setState] = useState({
    score: 0,
    balls: 10,
    last: "Pick your shot to start!",
    finished: false,
    result: null,
  });

  function play(shot) {
    setState((cur) => {
      if (cur.finished) return cur;

      const cpu = Math.ceil(Math.random() * 6);
      const nextBalls = cur.balls - 1;

      if (shot === cpu) {
        if (nextBalls <= 0) {
          const won = cur.score >= target;
          if (won) onWin?.(); else onLose?.();
          return {
            ...cur,
            balls: 0,
            last: `Both picked ${shot} — Out! Innings over.`,
            finished: true,
            result: won ? "win" : "lose",
          };
        }

        return {
          ...cur,
          balls: nextBalls,
          last: `Both picked ${shot} — Out! Try again, you still have more chances.`,
          result: "out",
        };
      }

      const nextScore = cur.score + shot;

      if (nextScore >= target) {
        onWin?.();
        return {
          score: nextScore,
          balls: nextBalls,
          last: `+${shot} runs! Target chased! 🎉`,
          finished: true,
          result: "win",
        };
      }

      if (nextBalls <= 0) {
        const win = nextScore >= target;
        if (win) onWin?.(); else onLose?.();
        return {
          score: nextScore,
          balls: 0,
          last: `Innings over. ${nextScore}/${target}`,
          finished: true,
          result: win ? "win" : "lose",
        };
      }

      return {
        score: nextScore,
        balls: nextBalls,
        last: `You: ${shot} · Bowler: ${cpu} → +${shot} runs`,
        result: null,
      };
    });
  }

  return (
    <div className="game-shell">
      <div className="game-title">🏏 Hand Cricket</div>
      <div className="game-meta">
        <span className="pill">Target {target}</span>
        <span className="pill">Balls {state.balls}</span>
        <span className="pill">Score {state.score}</span>
      </div>
      <div className="game-panel">
        <div style={{ color: "#c4b5fd", fontSize: ".9rem" }}>{state.last}</div>
        <div className="shot-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button key={n} type="button" className="shot-btn" onClick={() => play(n)} disabled={state.finished}>
              {n}
            </button>
          ))}
        </div>
        <div className="game-status">
          {state.result === "win" && "🏆 You won! Secret unlocking..."}
          {state.result === "lose" && "😔 Try again to unlock the secret."}
          {state.result === "out" && !state.finished && "⚡ Out! You still have more chances."}
        </div>
      </div>
    </div>
  );
}

function XOGame({ onWin, onLose }) {
  const WIN_LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winLine, setWinLine] = useState([]);
  const [finished, setFinished] = useState(false);
  const [status, setStatus] = useState("Your turn — You are ✕");

  function checkWinner(b) {
    for (const [a, c, d] of WIN_LINES) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return { mark: b[a], line: [a, c, d] };
    }
    return null;
  }

  function cpuMove(b) {
    for (const [a, c, d] of WIN_LINES) {
      const cells = [b[a], b[c], b[d]];
      if (cells.filter((x) => x === "O").length === 2 && cells.includes(null)) {
        return [a, c, d][cells.indexOf(null)];
      }
    }

    for (const [a, c, d] of WIN_LINES) {
      const cells = [b[a], b[c], b[d]];
      if (cells.filter((x) => x === "X").length === 2 && cells.includes(null)) {
        return [a, c, d][cells.indexOf(null)];
      }
    }

    if (!b[4]) return 4;

    const empty = b.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);
    return empty[Math.floor(Math.random() * empty.length)];
  }

  function handleClick(idx) {
    if (finished || board[idx] || !isX) return;
    const newBoard = [...board];
    newBoard[idx] = "X";
    const result = checkWinner(newBoard);

    if (result) {
      setBoard(newBoard);
      setWinLine(result.line);
      setStatus("🎉 You won!");
      setFinished(true);
      onWin?.();
      return;
    }

    if (newBoard.every(Boolean)) {
      setBoard(newBoard);
      setStatus("🤝 Draw! Try again.");
      setFinished(true);
      onLose?.();
      return;
    }

    setIsX(false);
    setStatus("CPU is thinking...");

    setTimeout(() => {
      const cpuIdx = cpuMove(newBoard);
      if (cpuIdx === undefined) {
        setBoard(newBoard);
        setIsX(true);
        setStatus("Your turn — You are ✕");
        return;
      }

      newBoard[cpuIdx] = "O";
      const cpuResult = checkWinner(newBoard);

      if (cpuResult) {
        setBoard([...newBoard]);
        setWinLine(cpuResult.line);
        setStatus("😔 CPU won! Secret stays hidden.");
        setFinished(true);
        onLose?.();
      } else if (newBoard.every(Boolean)) {
        setBoard([...newBoard]);
        setStatus("🤝 Draw! Try again.");
        setFinished(true);
        onLose?.();
      } else {
        setBoard([...newBoard]);
        setIsX(true);
        setStatus("Your turn — You are ✕");
      }
    }, 500);
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setIsX(true);
    setWinLine([]);
    setFinished(false);
    setStatus("Your turn — You are ✕");
  }

  return (
    <div className="game-shell">
      <div className="game-title">✕ XO Game</div>
      <div className="game-meta">
        <span className="pill">You = ✕</span>
        <span className="pill">CPU = ◯</span>
        <span className="pill">Win to unlock!</span>
      </div>
      <div className="game-panel">
        <div className="xo-board">
          {board.map((cell, i) => (
            <button
              key={i}
              type="button"
              className={cx("xo-cell", cell === "X" && "x-cell", cell === "O" && "o-cell", winLine.includes(i) && "win-cell")}
              onClick={() => handleClick(i)}
              disabled={!!cell || finished || !isX}
            >
              {cell}
            </button>
          ))}
        </div>
        <div className="game-status">{status}</div>
        {finished && (
          <button type="button" className="ghost-btn" onClick={reset} style={{ marginTop: 10 }}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}

function RingExchangeGame({ onWin }) {
  const [ready, setReady] = useState(false);
  const [note, setNote] = useState("Watch the ring spin...");

  useEffect(() => {
    const t = setTimeout(() => {
      setReady(true);
      setNote("The ring is ready ✨");
    }, 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="game-shell">
      <div className="game-title">💍 Ring Exchange</div>
      <div className="game-panel center">
        <div className="ring-stage">
          <div className="ring" />
        </div>
        <div style={{ color: "#c4b5fd", fontSize: ".9rem", marginBottom: 14 }}>{note}</div>
        <button type="button" className="primary-btn" onClick={onWin} disabled={!ready}>
          Reveal Secret Wish ✨
        </button>
        <div className="game-status">{ready ? "Ready!" : "Loading..."}</div>
      </div>
    </div>
  );
}

function SecretPage({ token, goHome }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/secret/${encodeURIComponent(token)}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Secret link not found.");
        if (alive) setData(json.data);
      } catch (err) {
        if (alive) setError(err.message || "Unable to load secret wish.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [token]);

  const gameType = data?.gameType || "ring";
  const secretWish = data?.secretWish || DEFAULT_SECRET;
  const isBirthday = data?.occasion === "birthday";

  return (
    <div className="glass-card fade-in">
      <button className="ghost-btn" type="button" onClick={goHome}>← Home</button>

      {loading && <p style={{ color: "#9d8bbf", marginTop: 16 }}>Loading your secret wish...</p>}
      {error && <div className="banner error" style={{ marginTop: 12 }}>{error}</div>}

      {data && (
        <div className="secret-layout">
          <div className="secret-head">
            <span className="secret-badge">
              {isBirthday ? "🎂 Birthday Secret" : "💍 Anniversary Secret"}
            </span>
            <h2>Welcome, {data.name} ✨</h2>
            <p className="section-sub">Win the game to unlock the hidden wish.</p>

            <div className="secret-message">
              <strong>Message</strong>
              {data.message || "A warm message is waiting here."}
            </div>

            {unlocked && (
              <div className="secret-message" style={{ marginTop: 14 }}>
                <strong>Secret Wish Unlocked 🎉</strong>
                {secretWish}
              </div>
            )}

            {unlocked && (
              <div style={{ marginTop: 18 }}>
                <button type="button" className="primary-btn" onClick={goHome}>Back to Home</button>
              </div>
            )}
          </div>

          <div>
            {!unlocked && gameType === "cricket" && (
              <HandCricketGame onWin={() => setUnlocked(true)} onLose={() => setUnlocked(false)} />
            )}
            {!unlocked && (gameType === "balloon" || gameType === "xo") && (
              <XOGame onWin={() => setUnlocked(true)} onLose={() => setUnlocked(false)} />
            )}
            {!unlocked && gameType === "ring" && (
              <RingExchangeGame onWin={() => setUnlocked(true)} />
            )}

            {unlocked && (
              <div className="game-shell center">
                <div className="game-title">🎉 Secret Unlocked</div>
                <div className="game-panel">
                  <div style={{ color: "#a78bfa", fontSize: ".9rem" }}>
                    {isBirthday ? "Your birthday secret is revealed!" : "Your anniversary secret is revealed!"}
                  </div>
                  <div style={{ marginTop: 12, color: "#e2d4ff", fontSize: "1rem", lineHeight: 1.7 }}>
                    {secretWish}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [token, setToken] = useState("");
  const displayed = useTypewriter("Send heartfelt wishes with secret games & beautiful cards ✨");

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const secretToken = params.get("token") || "";
      if (secretToken) {
        setToken(secretToken);
        setView("secret");
      }
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  function goHome() {
    const url = new URL(window.location.href);
    url.searchParams.delete("token");
    window.history.pushState({}, "", url.pathname);
    setView("home");
    setToken("");
  }

  return (
    <>
      <AppStyles />
      <div className="vw-app">
        <div className="vw-shell">

          <div className="topbar">
            <div className="brand" onClick={goHome} role="button" tabIndex={0}>
              <span className="brand-badge">V</span>
              <span>V-Wish</span>
            </div>
            {view !== "home" && (
              <button className="ghost-btn" type="button" onClick={goHome}>Home</button>
            )}
          </div>

          {view === "home" && (
            <div className="hero fade-in">
              <div className="hero-card">
                <span className="eyebrow">✦ Birthday & Anniversary Wishes</span>
                <h1>
                  Make every <span className="grad">special day</span> unforgettable.
                </h1>
                <div className="typewriter-line">
                  {displayed}
                  <span className="cursor" />
                </div>

                <div className="hero-actions">
                  <button className="primary-btn" type="button" onClick={() => setView("chooser")}>
                    Send a Wish ✨
                  </button>
                  <button className="outline-btn" type="button" onClick={() => setView("chooser")}>
                    Explore Templates
                  </button>
                </div>

                <p className="mini-note">
                  Birthday → gender-based game unlock · Anniversary → 3D ring reveal · Secret message delivered via email.
                </p>
              </div>

              <div className="feature-panel">
                <div className="fp-orb fp-orb1" />
                <div className="fp-orb fp-orb2" />

                <div className="feature-stack">
                  <div className="feature-row left">
                    <div className="feature-card" style={{ borderColor: "rgba(167,139,250,.35)" }}>
                      <strong>Birthday Cards</strong>
                      <span>5 glowing templates + secret wish.</span>
                    </div>
                  </div>

                  <div className="feature-row right">
                    <div className="feature-card" style={{ borderColor: "rgba(244,114,182,.35)" }}>
                      <strong>Anniversary Cards</strong>
                      <span>Elegant couple-themed designs.</span>
                    </div>
                  </div>

                  <div className="feature-row left">
                    <div className="feature-card" style={{ borderColor: "rgba(56,189,248,.28)" }}>
                      <strong>Fun Unlock Games</strong>
                      <span>Hand cricket, XO game & ring exchange.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "chooser" && (
            <div className="glass-card fade-in">
              <button className="ghost-btn" type="button" onClick={goHome}>← Back</button>
              <div style={{ marginTop: 18, marginBottom: 22 }}>
                <div className="section-title">Choose Occasion</div>
                <div className="section-sub">Pick the occasion to start building the wish.</div>
              </div>
              <div className="grid-2">
                <button className="choice-card birthday-choice" type="button" onClick={() => setView("birthday")}>
                  <span style={{ fontSize: "2.2rem" }}>🎂</span>
                  <h3>Birthday</h3>
                  <p>Templates, games & a secret surprise.</p>
                </button>
                <button className="choice-card anniversary-choice" type="button" onClick={() => setView("anniversary")}>
                  <span style={{ fontSize: "2.2rem" }}>💍</span>
                  <h3>Anniversary</h3>
                  <p>Cinematic ring reveal & love notes.</p>
                </button>
              </div>
            </div>
          )}

          {view === "birthday" && <BirthdayForm goBack={() => setView("chooser")} />}
          {view === "anniversary" && <AnniversaryForm goBack={() => setView("chooser")} />}
          {view === "secret" && token && <SecretPage token={token} goHome={goHome} />}

          <div className="footer-note">Made with ❤️ for V-Wishes</div>
        </div>
      </div>
    </>
  );
}