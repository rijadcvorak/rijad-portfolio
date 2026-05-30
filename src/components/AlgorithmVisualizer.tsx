import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, AlertCircle, Cpu, Zap } from 'lucide-react';

export default function AlgorithmVisualizer() {
  const [activeTab, setActiveTab] = useState<'sorting' | 'particles'>('sorting');
  const [arraySize, setArraySize] = useState<number>(35);
  const [speed, setSpeed] = useState<number>(50);
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [primaryIndices, setPrimaryIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'selection' | 'insertion'>('bubble');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  const isPausedRef = useRef<boolean>(false);
  const shouldStopRef = useRef<boolean>(false);

  useEffect(() => {
    isPausedRef.current = paused;
  }, [paused]);

  const generateArray = () => {
    shouldStopRef.current = true;
    setSorting(false);
    setPaused(false);
    setPrimaryIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);

    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 85) + 15);
    }
    setArray(newArray);
    setTimeout(() => {
      shouldStopRef.current = false;
    }, 50);
  };

  useEffect(() => {
    generateArray();
    return () => {
      shouldStopRef.current = true;
    };
  }, [arraySize]);

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const checkState = async (): Promise<boolean> => {
    if (shouldStopRef.current) return false;
    while (isPausedRef.current) {
      if (shouldStopRef.current) return false;
      await sleep(100);
    }
    return !shouldStopRef.current;
  };

  const bubbleSort = async () => {
    setSorting(true);
    setPaused(false);
    const arr = [...array];
    const n = arr.length;
    let localComparisons = 0;
    let localSwaps = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (shouldStopRef.current) return;
        
        setPrimaryIndices([j, j + 1]);
        localComparisons++;
        setComparisons(localComparisons);

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          localSwaps++;
          setSwaps(localSwaps);
          
          setArray([...arr]);
        }

        const proceed = await checkState();
        if (!proceed) return;
        await sleep(Math.max(5, 120 - speed));
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setPrimaryIndices([]);
    setSorting(false);
  };

  const selectionSort = async () => {
    setSorting(true);
    setPaused(false);
    const arr = [...array];
    const n = arr.length;
    let localComparisons = 0;
    let localSwaps = 0;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (shouldStopRef.current) return;

        setPrimaryIndices([j, minIdx]);
        localComparisons++;
        setComparisons(localComparisons);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }

        const proceed = await checkState();
        if (!proceed) return;
        await sleep(Math.max(5, 120 - speed));
      }

      if (minIdx !== i) {
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        localSwaps++;
        setSwaps(localSwaps);
        setArray([...arr]);
      }
      setSortedIndices((prev) => [...prev, i]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setPrimaryIndices([]);
    setSorting(false);
  };

  const insertionSort = async () => {
    setSorting(true);
    setPaused(false);
    const arr = [...array];
    const n = arr.length;
    let localComparisons = 0;
    let localSwaps = 0;

    setSortedIndices([0]);

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      if (shouldStopRef.current) return;

      while (j >= 0 && arr[j] > key) {
        if (shouldStopRef.current) return;

        setPrimaryIndices([j, j + 1]);
        localComparisons++;
        setComparisons(localComparisons);

        arr[j + 1] = arr[j];
        localSwaps++;
        setSwaps(localSwaps);
        setArray([...arr]);

        j--;

        const proceed = await checkState();
        if (!proceed) return;
        await sleep(Math.max(5, 120 - speed));
      }
      arr[j + 1] = key;
      setArray([...arr]);
      setSortedIndices(Array.from({ length: i + 1 }, (_, index) => index));
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setPrimaryIndices([]);
    setSorting(false);
  };

  const handleStart = () => {
    if (sorting && paused) {
      setPaused(false);
    } else {
      setSorting(true);
      setPaused(false);
      setSortedIndices([]);
      setComparisons(0);
      setSwaps(0);
      if (algorithm === 'bubble') {
        bubbleSort();
      } else if (algorithm === 'selection') {
        selectionSort();
      } else {
        insertionSort();
      }
    }
  };

  useEffect(() => {
    if (activeTab !== 'particles') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 600;
    let height = canvas.height = 320;

    const resizeHandler = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 320;
      }
    };
    window.addEventListener('resize', resizeHandler);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      mass: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 3.5 + 1.5;
        this.mass = this.radius * 0.8;
        const hue = Math.random() > 0.5 ? 200 : 220;
        this.color = `hsl(${hue}, 85%, 65%)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < this.radius) {
          this.x = this.radius;
          this.vx *= -1;
        } else if (this.x > width - this.radius) {
          this.x = width - this.radius;
          this.vx *= -1;
        }

        if (this.y < this.radius) {
          this.y = this.radius;
          this.vy *= -1;
        } else if (this.y > height - this.radius) {
          this.y = height - this.radius;
          this.vy *= -1;
        }

        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            this.vx += (dx / dist) * force * 0.08;
            this.vy += (dy / dist) * force * 0.08;

            const speedLimit = 3.5;
            const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (currentSpeed > speedLimit) {
              this.vx = (this.vx / currentSpeed) * speedLimit;
              this.vy = (this.vy / currentSpeed) * speedLimit;
            }
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    const particleCount = Math.floor(width / 12);
    for (let i = 0; i < Math.min(particleCount, 80); i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 0.5;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 0.7, 0, Math.PI * 2);
          ctx.fillStyle = '#cbd5e1';
          ctx.fill();
        }
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const alpha = (90 - dist) / 90 * 0.25;
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      if (mouseRef.current.active) {
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 120, 0, Math.PI * 2);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeTab]);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden" id="algorithm-visualizer-container">
      <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 justify-between items-center flex-wrap gap-2">
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg">
          <button
            id="tab-btn-sorting"
            onClick={() => {
              setActiveTab('sorting');
              generateArray();
            }}
            className={activeTab === 'sorting'
                ? "px-3 py-1.5 text-xs font-semibold rounded-md transition-all bg-white text-blue-600 shadow-sm"
                : "px-3 py-1.5 text-xs font-semibold rounded-md transition-all text-slate-600 hover:text-slate-900"
            }
          >
            Sorting Visualizer
          </button>
          <button
            id="tab-btn-particles"
            onClick={() => {
              setActiveTab('particles');
              shouldStopRef.current = true;
              setSorting(false);
            }}
            className={activeTab === 'particles'
                ? "px-3 py-1.5 text-xs font-semibold rounded-md transition-all bg-white text-blue-600 shadow-sm"
                : "px-3 py-1.5 text-xs font-semibold rounded-md transition-all text-slate-600 hover:text-slate-900"
            }
          >
            HTML5 Canvas Particles
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
          <Cpu className="w-3 h-3 text-blue-500 animate-pulse" />
          <span>Interactive Skills Proof</span>
        </div>
      </div>

      {activeTab === 'sorting' ? (
        <div className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-5 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                  Select Model
                </label>
                <select
                  id="algo-select"
                  value={algorithm}
                  onChange={(e) => {
                    setAlgorithm(e.target.value as any);
                    generateArray();
                  }}
                  disabled={sorting && !paused}
                  className="bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
                >
                  <option value="bubble">Bubble Sort (O(n²))</option>
                  <option value="selection">Selection Sort (O(n²))</option>
                  <option value="insertion">Insertion Sort (O(n²))</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                  Delay Speed
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="speed-slider"
                    type="range"
                    min="1"
                    max="115"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="font-mono text-xs text-slate-500 w-6">
                    {speed}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                  Elements Count
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="size-slider"
                    type="range"
                    min="15"
                    max="65"
                    value={arraySize}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    disabled={sorting && !paused}
                    className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-55"
                  />
                  <span className="font-mono text-xs text-slate-500 w-5">
                    {arraySize}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-sort-start"
                onClick={handleStart}
                disabled={sorting && !paused}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Sort</span>
              </button>

              {sorting && (
                <button
                  id="btn-sort-pause"
                  onClick={() => setPaused(!paused)}
                  className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>{paused ? 'Resume' : 'Pause'}</span>
                </button>
              )}

              <button
                id="btn-sort-reset"
                onClick={generateArray}
                className="flex items-center gap-1 border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-xl p-4 sm:p-6 mb-4 h-[250px] flex items-end justify-between gap-[2px] sm:gap-[4px] overflow-hidden">
            {array.map((val, idx) => {
              const isActive = primaryIndices.includes(idx);
              const isSorted = sortedIndices.includes(idx);
              let barColor = 'bg-slate-700';

              if (isActive) {
                barColor = 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]';
              } else if (isSorted) {
                barColor = 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]';
              }

              return (
                <div
                  key={idx}
                  className={`w-full rounded-t-sm transition-all duration-75 ${barColor}`}
                  style={{
                    height: `${val}%`,
                  }}
                  title={`Index: ${idx}, Value: ${val}`}
                />
              );
            })}

            <div className="absolute top-3 left-3 flex items-center gap-2 text-[10px] font-mono font-medium text-slate-500">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>O(1) Memory Workspace Array Space</span>
            </div>
            
            {sorting && !paused && (
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono text-sky-400 bg-sky-950/40 px-2 py-0.5 rounded border border-sky-900/40">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span>
                <span>Calculating Passes...</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50/50 rounded-xl p-2.5 border border-slate-100/80 text-center">
              <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase font-sans">
                Array Size
              </span>
              <span className="font-mono text-base font-bold text-slate-700">
                {arraySize}
              </span>
            </div>
            <div className="bg-slate-50/50 rounded-xl p-2.5 border border-slate-100/80 text-center">
              <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase font-sans">
                Comparisons
              </span>
              <span className="font-mono text-base font-bold text-slate-700">
                {comparisons}
              </span>
            </div>
            <div className="bg-slate-50/50 rounded-xl p-2.5 border border-slate-100/80 text-center">
              <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase font-sans">
                Array Swaps
              </span>
              <span className="font-mono text-base font-bold text-slate-700 text-blue-600">
                {swaps}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 text-center">
          <div className="mb-3 text-left">
            <h4 className="text-xs font-bold font-sans text-slate-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Interactive Geometry and Vector Animation Proof</span>
            </h4>
            <p className="text-[11px] text-slate-500">
              Move your cursor inside the canvas container to activate gravitational pull forces. This simulates standard coordinate trigonometry, vector addition, and physical border collisions.
            </p>
          </div>

          <div 
            className="w-full bg-slate-900 ring-1 ring-slate-800 rounded-xl overflow-hidden cursor-crosshair relative"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                active: true,
              };
            }}
            onMouseLeave={() => {
              mouseRef.current.active = false;
            }}
          >
            <canvas ref={canvasRef} className="block w-full h-[320px]" />
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500 bg-slate-950/60 px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
              Canvas Sandbox System Activated
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-50 border-t border-slate-100 p-3 flex gap-2 items-start text-xs text-slate-500">
        <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong>Interactive CV Highlight:</strong> This interactive component maps directly to the 
          <em> "Algorithm & Animation Scripts"</em> listed under Rijad's projects. It is built strictly from scratch in HTML5 Canvas and React state streams.
        </p>
      </div>
    </div>
  );
}
