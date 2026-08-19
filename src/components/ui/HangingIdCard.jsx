import React, { useRef, useEffect, useCallback, useState } from "react";
import { cn } from "../../utils/cn";
import sibaPhoto from "../../assets/siba.jpg";

// ─── Physics constants ────────────────────────────────────────────────────────
const SPRING_K = 0;
const DAMPING = 0.92;
const GRAVITY = 3000;
const MASS = 1;

export const HangingIdCard = ({
  children,
  ropeLength = 75,
  ropeColor = "#27272a",
  className,
  name = "SIBANANDA BEHERA",
  role = "Full-Stack Developer",
  badgeId = "SB-2024-PRO",
  accentColor = "#8b5cf6",
  cardWidth = "w-72 sm:w-80 md:w-84",
  photo = sibaPhoto,
}) => {
  const physRef = useRef({ angle: 0, vel: 0 });
  const rafRef = useRef(null);
  const prevTimeRef = useRef(null);
  const prevAngleRef = useRef(0);
  const isDraggingRef = useRef(false);

  const [angle, setAngle] = useState(0);
  const [, setIsDragState] = useState(false);
  const dragStartX = useRef(0);
  const dragAngle0 = useRef(0);

  // ── Physics loop ────────────────────────────────────────────────────────────
  const tick = useCallback(
    (now) => {
      if (prevTimeRef.current === null) {
        prevTimeRef.current = now;
      }
      const dt = Math.min((now - prevTimeRef.current) / 1000, 0.05);
      prevTimeRef.current = now;

      const s = physRef.current;
      if (!isDraggingRef.current) {
        const L = ropeLength + 100;
        const torque =
          -(GRAVITY / L) * Math.sin(s.angle) -
          (DAMPING / MASS) * s.vel -
          (SPRING_K / MASS) * s.angle;

        s.vel += torque * dt;
        s.angle += s.vel * dt;

        setAngle(s.angle);

        if (Math.abs(s.angle) > 0.001 || Math.abs(s.vel) > 0.001) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          s.angle = 0;
          s.vel = 0;
          setAngle(0);
        }
      } else {
        if (dt > 0) {
          s.vel = (s.angle - prevAngleRef.current) / dt;
        }
        prevAngleRef.current = s.angle;
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [ropeLength]
  );

  const startPhysics = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // ── Pointer events ──────────────────────────────────────────────────────────
  const onPointerDown = useCallback(
    (e) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      isDraggingRef.current = true;
      setIsDragState(true);
      dragStartX.current = e.clientX;
      dragAngle0.current = physRef.current.angle;
      prevAngleRef.current = physRef.current.angle;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      prevTimeRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    },
    [tick]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartX.current;
      const L = ropeLength + 100;
      const newAngle = dragAngle0.current - dx / L;
      const clamped = Math.max(-1.4, Math.min(1.4, newAngle));
      physRef.current.angle = clamped;
      setAngle(clamped);
    },
    [ropeLength]
  );

  const onPointerUp = useCallback((e) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDraggingRef.current = false;
    setIsDragState(false);
  }, []);

  // ── Click impulse (tap) ─────────────────────────────────────────────────────
  const onCardClick = useCallback(() => {
    if (Math.abs(physRef.current.vel) < 0.1 && Math.abs(physRef.current.angle) < 0.05) {
      physRef.current.vel = 4.0;
      startPhysics();
    }
  }, [startPhysics]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const cardRotateDeg = angle * (180 / Math.PI);

  return (
    <div
      className={cn("flex flex-col items-center select-none", className)}
      style={{ touchAction: "none" }}
    >
      {/* Ceiling anchor pin */}
      <div className="w-3.5 h-3.5 rounded-full shadow-md z-10 relative bg-zinc-900 border border-zinc-700" />

      {/* The Pendulum Assembly */}
      <div
        className="flex flex-col items-center cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onCardClick}
        style={{
          transform: `rotate(${cardRotateDeg}deg)`,
          transformOrigin: "top center",
          willChange: "transform",
          marginTop: "-6px",
        }}
      >
        {/* Lanyard Rope */}
        <div style={{ pointerEvents: "none" }}>
          <svg
            width="44"
            height={ropeLength + 38}
            viewBox={`0 0 44 ${ropeLength + 38}`}
            style={{ display: "block", margin: "0 auto", overflow: "visible" }}
          >
            <defs>
              <linearGradient id="metalDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#71717a" />
                <stop offset="35%" stopColor="#27272a" />
                <stop offset="70%" stopColor="#52525b" />
                <stop offset="100%" stopColor="#18181b" />
              </linearGradient>
              <linearGradient id="hookDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#52525b" />
                <stop offset="40%" stopColor="#18181b" />
                <stop offset="100%" stopColor="#3f3f46" />
              </linearGradient>
              <linearGradient
                id="strapHighlight"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                <stop offset="25%" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="75%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Main Lanyard Ribbon Strap */}
            <rect
              x="12"
              y="0"
              width="20"
              height={ropeLength + 4}
              rx="2"
              fill={ropeColor || "#27272a"}
            />
            <rect
              x="12"
              y="0"
              width="20"
              height={ropeLength + 4}
              rx="2"
              fill="url(#strapHighlight)"
            />

            {/* Strap side stitch lines */}
            <line
              x1="13.5"
              y1="0"
              x2="13.5"
              y2={ropeLength + 4}
              stroke="#ffffff"
              strokeOpacity="0.15"
              strokeWidth="0.75"
              strokeDasharray="3 2"
            />
            <line
              x1="30.5"
              y1="0"
              x2="30.5"
              y2={ropeLength + 4}
              stroke="#ffffff"
              strokeOpacity="0.15"
              strokeWidth="0.75"
              strokeDasharray="3 2"
            />

            {/* Metallic Ribbon Crimp Clamp */}
            <rect
              x="10"
              y={ropeLength}
              width="24"
              height="10"
              rx="2.5"
              fill="url(#metalDark)"
              stroke="#18181b"
              strokeWidth="0.8"
            />
            <circle cx="13.5" cy={ropeLength + 5} r="1.3" fill="#a1a1aa" />
            <circle cx="30.5" cy={ropeLength + 5} r="1.3" fill="#a1a1aa" />

            {/* Swivel Ring Loop */}
            <path
              d={`M 15 ${ropeLength + 9} C 15 ${ropeLength + 16}, 29 ${ropeLength + 16}, 29 ${ropeLength + 9}`}
              fill="none"
              stroke="url(#metalDark)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Swivel Joint */}
            <rect
              x="19"
              y={ropeLength + 12}
              width="6"
              height="6"
              rx="1"
              fill="url(#metalDark)"
            />

            {/* Metal Snap Hook */}
            <path
              d={`M 20 ${ropeLength + 17} 
                 L 20 ${ropeLength + 26} 
                 C 20 ${ropeLength + 35}, 24 ${ropeLength + 35}, 24 ${ropeLength + 26} 
                 L 24 ${ropeLength + 17}`}
              fill="none"
              stroke="url(#hookDark)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line
              x1="20.5"
              y1={ropeLength + 21}
              x2="20.5"
              y2={ropeLength + 30}
              stroke="#d4d4d8"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* ID Card */}
        {children ? (
          children
        ) : (
          <div
            className={cn(
              "relative rounded-[1.75rem] overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-900/95 pointer-events-none mt-[-16px]",
              cardWidth
            )}
          >
            {/* Punched Slot Hole */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div className="w-9 h-2.5 rounded-full bg-black/70 border border-white/30 shadow-inner flex items-center justify-center">
                <div className="w-7 h-1 rounded-full bg-zinc-950 opacity-90" />
              </div>
            </div>

            <div className="flex flex-col h-full w-full">
              {/* Card Header Banner with Avatar */}
              <div
                className="relative px-5 pt-7 pb-6 flex flex-col items-center text-white overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${accentColor} 0%, #1e1b4b 100%)`,
                }}
              >
                {/* Circuit background overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                {/* Profile Photo with Glowing Ring - Using local photo */}
                <div className="mt-1 relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-primary to-purple-400 backdrop-blur-md shadow-2xl border border-white/50 overflow-hidden group">
                  <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover rounded-full filter contrast-105"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Card Body - Dark background */}
              <div className="p-5 flex flex-col items-center text-center bg-slate-900 flex-1 gap-3">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-white">
                    {name}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                    <span className="text-cyan-400 text-xs font-semibold">{role}</span>
                  </div>
                </div>

                <div className="w-full border-t border-slate-700/50 my-0.5" />

                {/* Details 2x2 Grid */}
                <div className="grid grid-cols-2 gap-2.5 w-full text-left bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase tracking-widest font-bold">
                      Specialty
                    </span>
                    <span className="font-bold text-white text-xs">
                      Full-Stack
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase tracking-widest font-bold">
                      Location
                    </span>
                    <span className="font-bold text-white text-xs">Remote</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase tracking-widest font-bold">
                      Experience
                    </span>
                    <span className="font-bold text-white text-xs">
                      3+ Years
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase tracking-widest font-bold">
                      Status
                    </span>
                    <span className="font-bold text-emerald-500 text-xs flex items-center gap-1">
                      ● Active
                    </span>
                  </div>
                </div>

                {/* HD Barcode & Auth Tag */}
                <div className="flex flex-col items-center mt-1 w-full gap-1">
                  <div className="flex gap-[2.5px] items-end h-7 px-3 py-0.5 bg-slate-800/50 rounded-lg border border-slate-700/50 w-full justify-center">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-cyan-400/70 rounded-[1px]"
                        style={{
                          width:
                            i % 4 === 0 ? "3.5px" : i % 2 === 0 ? "2px" : "1px",
                          height: `${50 + Math.sin(i * 1.4) * 45}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between w-full px-1 text-[10px]">
                    <span
                      className="font-mono font-bold tracking-widest text-cyan-400"
                      style={{ color: accentColor }}
                    >
                      {badgeId}
                    </span>
                    <span className="text-slate-400 font-semibold text-[9px] uppercase tracking-wider">
                      3D PORTFOLIO
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drag hint */}
      <p className="mt-8 text-[11px] text-zinc-400 font-medium select-none pointer-events-none">
        Drag or click the card
      </p>
    </div>
  );
};

export default HangingIdCard;