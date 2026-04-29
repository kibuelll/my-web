"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Trophy, Cpu, Zap, Shield, User } from "lucide-react";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const PLAYER_SIZE = 20;
const ENEMY_SIZE = 24;
const POWERUP_SIZE = 16;

interface GameObject {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  type: "enemy" | "powerup";
}

export default function PlaygroundSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(1);

  const [playerName, setPlayerName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  const playerRef = useRef({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
  const objectsRef = useRef<GameObject[]>([]);
  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/playground/score");
      const data = await res.json();
      if (Array.isArray(data)) setLeaderboard(data);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const saveScore = async (finalScore: number) => {
    if (!playerName) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/playground/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, score: finalScore }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Score save failed:", errorData);
      } else {
        fetchLeaderboard();
      }
    } catch (err) {
      console.error("Failed to save score:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const spawnObject = useCallback((diff: number) => {
    const side = Math.floor(Math.random() * 4);
    let x, y, speedX, speedY;
    const isPowerup = Math.random() > 0.9;

    if (side === 0) { // Top
      x = Math.random() * GAME_WIDTH;
      y = -ENEMY_SIZE;
      speedX = (Math.random() - 0.5) * 2;
      speedY = (Math.random() * 2 + 1) * diff;
    } else if (side === 1) { // Right
      x = GAME_WIDTH + ENEMY_SIZE;
      y = Math.random() * GAME_HEIGHT;
      speedX = -(Math.random() * 2 + 1) * diff;
      speedY = (Math.random() - 0.5) * 2;
    } else if (side === 2) { // Bottom
      x = Math.random() * GAME_WIDTH;
      y = GAME_HEIGHT + ENEMY_SIZE;
      speedX = (Math.random() - 0.5) * 2;
      speedY = -(Math.random() * 2 + 1) * diff;
    } else { // Left
      x = -ENEMY_SIZE;
      y = Math.random() * GAME_HEIGHT;
      speedX = (Math.random() * 2 + 1) * diff;
      speedY = (Math.random() - 0.5) * 2;
    }

    objectsRef.current.push({
      x, y, speedX, speedY,
      type: isPowerup ? "powerup" : "enemy"
    });
  }, []);

  const update = useCallback((time: number) => {
    if (lastTimeRef.current !== undefined) {
      const deltaTime = time - lastTimeRef.current;

      // Update difficulty
      const currentDiff = 1 + (score / 1000);
      setDifficulty(currentDiff);

      // Spawn objects
      spawnTimerRef.current += deltaTime;
      if (spawnTimerRef.current > 400 / currentDiff) {
        spawnObject(currentDiff);
        spawnTimerRef.current = 0;
      }

      // Update objects
      objectsRef.current = objectsRef.current.filter(obj => {
        obj.x += obj.speedX;
        obj.y += obj.speedY;

        // Collision detection
        const dx = obj.x - playerRef.current.x;
        const dy = obj.y - playerRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (obj.type === "enemy" ? (PLAYER_SIZE + ENEMY_SIZE) / 2 : (PLAYER_SIZE + POWERUP_SIZE) / 2)) {
          if (obj.type === "enemy") {
            setGameOver(true);
            setIsPlaying(false);
            saveScore(score);
            return false;
          } else {
            setScore(s => s + 50);
            return false;
          }
        }

        // Keep objects within slightly larger bounds
        return obj.x > -50 && obj.x < GAME_WIDTH + 50 && obj.y > -50 && obj.y < GAME_HEIGHT + 50;
      });

      setScore(s => s + Math.floor(deltaTime / 10));

      // Draw
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Draw Grid
        ctx.strokeStyle = "rgba(139, 92, 246, 0.1)";
        ctx.lineWidth = 1;
        for (let i = 0; i < GAME_WIDTH; i += 40) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, GAME_HEIGHT);
          ctx.stroke();
        }
        for (let i = 0; i < GAME_HEIGHT; i += 40) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(GAME_WIDTH, i);
          ctx.stroke();
        }

        // Draw Player
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#3b82f6";
        ctx.fillStyle = "#3b82f6";
        ctx.beginPath();
        ctx.arc(playerRef.current.x, playerRef.current.y, PLAYER_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw Objects
        objectsRef.current.forEach(obj => {
          if (obj.type === "enemy") {
            ctx.shadowColor = "#f43f5e";
            ctx.fillStyle = "#f43f5e";
            ctx.fillRect(obj.x - ENEMY_SIZE / 2, obj.y - ENEMY_SIZE / 2, ENEMY_SIZE, ENEMY_SIZE);
          } else {
            ctx.shadowColor = "#10b981";
            ctx.fillStyle = "#10b981";
            ctx.beginPath();
            ctx.moveTo(obj.x, obj.y - POWERUP_SIZE / 2);
            ctx.lineTo(obj.x + POWERUP_SIZE / 2, obj.y);
            ctx.lineTo(obj.x, obj.y + POWERUP_SIZE / 2);
            ctx.lineTo(obj.x - POWERUP_SIZE / 2, obj.y);
            ctx.closePath();
            ctx.fill();
          }
        });
        ctx.shadowBlur = 0;
      }
    }
    lastTimeRef.current = time;
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(update);
    }
  }, [isPlaying, score, spawnObject]);

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(update);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, update]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    playerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    playerRef.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  };

  const startGame = () => {
    if (!playerName.trim()) return;
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setIsNameEntered(true);
    objectsRef.current = [];
    lastTimeRef.current = performance.now();
    playerRef.current = { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
  };

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <section id="playground" className="pb-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-secondary/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold font-outfit mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block"
          >
            Cyber Playground
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Sela-sela waktu coding? Cobain game dodge neon sederhana ini.
          </m.p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

          <div className="relative bg-black/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center">
            {/* Game UI Overlay */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-10">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Skor Saat Ini</p>
                <p className="text-3xl font-mono text-white font-bold tracking-tighter">{score.toLocaleString()}</p>
                {playerName && <p className="text-[10px] text-primary font-bold">PILOT: {playerName.toUpperCase()}</p>}
              </div>
              <div className="text-right space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold flex items-center justify-end gap-1">
                  <Trophy size={12} className="text-yellow-500" /> Skor Tertinggi
                </p>
                <p className="text-xl font-mono text-gray-300">{highScore.toLocaleString()}</p>
              </div>
            </div>

            {/* Game Canvas */}
            <canvas
              ref={canvasRef}
              width={GAME_WIDTH}
              height={GAME_HEIGHT}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className={`max-w-full h-auto cursor-none ${isPlaying ? 'opacity-100' : 'opacity-30 blur-sm'}`}
            />

            {/* Start/Game Over Screens */}
            <AnimatePresence>
              {!isPlaying && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20 p-8"
                >
                  {gameOver ? (
                    <div className="text-center">
                      <m.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 text-red-500"
                      >
                        <Zap size={40} />
                      </m.div>
                      <h3 className="text-3xl font-bold text-white mb-2">SISTEM CRASH</h3>
                      <p className="text-gray-400 mb-8 max-w-xs mx-auto">Skor akhir kamu: <span className="text-white font-bold">{score.toLocaleString()}</span>. Coba lagi?</p>
                      <button
                        onClick={startGame}
                        className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-primary hover:text-white transition-all transform active:scale-95"
                      >
                        <RotateCcw size={18} /> MULAI ULANG SISTEM
                      </button>
                    </div>
                  ) : !isNameEntered ? (
                    <div className="text-center w-full max-w-xs">
                      <m.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary"
                      >
                        <User size={40} />
                      </m.div>
                      <h3 className="text-2xl font-bold text-white mb-6">Siapa saya?</h3>
                      <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value.slice(0, 15))}
                        placeholder="Masukkan nama Anda..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:border-primary outline-none mb-6 transition-all"
                      />
                      <button
                        onClick={startGame}
                        disabled={!playerName.trim()}
                        className="w-full group flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        MASUK & MAIN
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <m.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/20 text-primary border border-primary/30"
                      >
                        <Cpu size={48} />
                      </m.div>
                      <h3 className="text-3xl font-bold text-white mb-4">SIAP, {playerName.toUpperCase()}?</h3>
                      <button
                        onClick={startGame}
                        className="group flex items-center gap-2 px-12 py-5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all transform active:scale-95"
                      >
                        <Play size={20} fill="currentColor" /> LUNCURKAN SISTEM
                      </button>
                    </div>
                  )}
                </m.div>
              )}
            </AnimatePresence>

            {/* Game Stats Bottom */}
            <div className="w-full bg-white/5 border-t border-white/10 px-6 py-4 flex justify-between items-center">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_#3b82f6]" />
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Pesawat</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-sm shadow-[0_0_8px_#f43f5e]" />
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Rintangan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rotate-45 shadow-[0_0_8px_#10b981]" />
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Energi</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Cpu size={14} />
                <span className="text-xs font-mono">KESULITAN: {difficulty.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 bg-white/[0.02] border border-white/5 rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold font-outfit flex items-center gap-2">
              <Trophy className="text-yellow-500" size={24} />
              Papan Peringkat
            </h3>
            <div className="h-px flex-1 mx-6 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid gap-3">
            {leaderboard.length > 0 ? leaderboard.map((entry, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${i === 0 ? "bg-yellow-500/20 text-yellow-500" :
                    i === 1 ? "bg-gray-400/20 text-gray-400" :
                      i === 2 ? "bg-orange-500/20 text-orange-500" :
                        "bg-white/5 text-gray-500"
                    }`}>
                    {i + 1}
                  </span>
                  <span className="text-gray-200 font-medium group-hover:text-white transition-colors">{(entry.guesses as any)?.guess_name || "Pilot Anonim"}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-gray-500 font-mono">
                    {new Date().toLocaleDateString()}
                  </span>
                  <span className="text-xl font-mono font-bold text-primary tabular-nums">
                    {entry.score.toLocaleString()}
                  </span>
                </div>
              </m.div>
            )) : (
              <div className="py-10 text-center text-gray-500 italic">
                Belum ada data skor. Jadilah yang pertama!
              </div>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
}
