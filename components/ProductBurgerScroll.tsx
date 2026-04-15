"use client";

import { useEffect, useRef, useCallback } from "react";

interface ProductBurgerScrollProps {
  folderPath: string;
  themeColor: string;
  totalFrames?: number;
  frameExt?: string;
}

export default function ProductBurgerScroll({
  folderPath,
  totalFrames = 240,
  frameExt = "jpg",
}: ProductBurgerScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isScrollingRef = useRef(false);
  const autoFrameRef = useRef(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    // Use viewport dimensions — NOT the 500vh scroll container
    const W = window.innerWidth;
    const H = window.innerHeight;
    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    }
  }, []);

  // Draw frame using CONTAIN fit — original size, no zoom
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const clampedIndex = ((index % totalFrames) + totalFrames) % totalFrames;
    const img = imagesRef.current[clampedIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    const ir = img.naturalWidth / img.naturalHeight;
    const cr = W / H;
    let dw: number, dh: number, dx: number, dy: number;

    const isMobile = W < 768;

    if (ir > cr) {
      dw = W; dh = W / ir; dx = 0; dy = (H - dh) / 2;
    } else {
      dh = H; dw = H * ir; dx = (W - dw) / 2; dy = 0;
    }

    // Apply Mobile Zoom and Top-Alignment
    if (isMobile) {
      const zoomScale = 1.35; // Zoom in 35%
      dw *= zoomScale;
      dh *= zoomScale;
      dx = (W - dw) / 2; // Keep centered horizontally
      // Position burger in top 40% of screen
      dy = (H * 0.35) - (dh / 2); 
    }

    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  }, [totalFrames]);

  // Main animation loop: auto-play in loop OR follow scroll
  useEffect(() => {
    let running = true;
    const animate = () => {
      if (!running) return;

      if (!isScrollingRef.current) {
        // Auto-loop mode: advance frame
        autoFrameRef.current += 0.5; // speed: 0.5 frame per rAF (~30fps playback)
        if (autoFrameRef.current >= totalFrames) autoFrameRef.current = 0;
        const idx = Math.floor(autoFrameRef.current);
        if (imagesRef.current[idx]) {
          drawFrame(idx);
        }
      } else {
        // Scroll mode: lerp toward target
        const target = currentFrameRef.current;
        const current = autoFrameRef.current;
        const next = current + (target - current) * 0.3;
        autoFrameRef.current = Math.abs(target - next) < 0.5 ? target : next;
        const idx = Math.round(autoFrameRef.current);
        if (imagesRef.current[idx]) {
          drawFrame(idx);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, [drawFrame, totalFrames]);

  // Preload images
  useEffect(() => {
    const images: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);

    // Load first frame immediately
    const first = new Image();
    first.src = `${folderPath}/1.${frameExt}`;
    first.onerror = () => {};
    first.onload = () => {
      images[0] = first;
      imagesRef.current = images;
      resizeCanvas();
      drawFrame(0);

      // Batch load rest
      let batchStart = 1;
      const batchSize = 20;
      const loadBatch = () => {
        const end = Math.min(batchStart + batchSize, totalFrames);
        for (let i = batchStart; i < end; i++) {
          const img = new Image();
          img.src = `${folderPath}/${i + 1}.${frameExt}`;
          img.onload = () => { images[i] = img; imagesRef.current = images; };
          img.onerror = () => { images[i] = null; };
        }
        batchStart = end;
        if (batchStart < totalFrames) setTimeout(loadBatch, 30);
      };
      loadBatch();
    };

    return () => { imagesRef.current = []; };
  }, [folderPath, totalFrames, frameExt, resizeCanvas, drawFrame]);

  // Scroll and Touch handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartFrame = 0;
    let isTouching = false;
    let isHorizontalSwipe = false;

    const handleScroll = () => {
      if (isTouching) return; // Touch takes priority

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableHeight, 0), 1);

      if (scrolled > 0) {
        isScrollingRef.current = true;
        currentFrameRef.current = progress * (totalFrames - 1);

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 2000);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      isTouching = true;
      isHorizontalSwipe = false;
      isScrollingRef.current = true;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartFrame = currentFrameRef.current;

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;
      
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchX - touchStartX;
      const deltaY = touchY - touchStartY;

      // Detection: If we haven't decided the swipe direction yet
      if (!isHorizontalSwipe && Math.abs(deltaX) > 5) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          isHorizontalSwipe = true;
        }
      }

      if (isHorizontalSwipe) {
        // Lock vertical scroll while spinning horizontally
        if (e.cancelable) e.preventDefault();
        
        // Sensitivity: Swiping across 80% of screen width = 1 full rotation
        const sensitivity = 0.8;
        const frameDelta = (deltaX / (window.innerWidth * sensitivity)) * totalFrames;
        
        // Update target frame (inverted for natural 'spin' direction)
        currentFrameRef.current = touchStartFrame - frameDelta;
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
      isHorizontalSwipe = false;
      // Resume auto-loop after 2s of inactivity
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    // touchmove MUST be { passive: false } to allow e.preventDefault() for the scroll lock
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [totalFrames]);

  useEffect(() => {
    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resizeCanvas]);

  return (
    <div ref={containerRef} className="h-[260vh] relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
