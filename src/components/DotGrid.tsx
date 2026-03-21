"use client";

import { useEffect, useRef } from "react";

const DOT_SPACING = 12;
const DOT_BASE_RADIUS = 0.5;
const DOT_MAX_RADIUS = 1.0;
const HOVER_RADIUS = 100;
const BASE_OPACITY = 0.07;
const MAX_OPACITY = 0.18;
const ACCENT_BLEND = 0.15;

export const DotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const getColors = () => {
      const style = getComputedStyle(document.documentElement);
      return {
        dot: style.getPropertyValue("--foreground").trim(),
        accent: style.getPropertyValue("--accent").trim(),
      };
    };

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 128, g: 128, b: 128 };
    };

    const draw = () => {
      const { dot, accent } = getColors();
      const dotRgb = hexToRgb(dot);
      const accentRgb = hexToRgb(accent);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollY = window.scrollY;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const cols = Math.ceil(window.innerWidth / DOT_SPACING) + 1;
      const rows = Math.ceil(window.innerHeight / DOT_SPACING) + 1;

      // Offset dots by scroll so the grid feels anchored to the page
      const offsetY = scrollY % DOT_SPACING;

      for (let row = -1; row < rows; row++) {
        const screenY = row * DOT_SPACING - offsetY;
        for (let col = 0; col < cols; col++) {
          const screenX = col * DOT_SPACING;

          const dx = screenX - mx;
          const dy = screenY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const t = Math.max(0, 1 - dist / HOVER_RADIUS);
          const ease = t * t * (3 - 2 * t);

          const radius =
            (DOT_BASE_RADIUS + (DOT_MAX_RADIUS - DOT_BASE_RADIUS) * ease) * dpr;
          const opacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * ease;

          const r = Math.round(
            dotRgb.r + (accentRgb.r - dotRgb.r) * ease * ACCENT_BLEND,
          );
          const g = Math.round(
            dotRgb.g + (accentRgb.g - dotRgb.g) * ease * ACCENT_BLEND,
          );
          const b = Math.round(
            dotRgb.b + (accentRgb.b - dotRgb.b) * ease * ACCENT_BLEND,
          );

          ctx.beginPath();
          ctx.arc(screenX * dpr, screenY * dpr, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
          ctx.fill();
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(draw);
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      lastScrollY.current = window.scrollY;
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });

    resize();
    draw();

    observer.observe(document.documentElement);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const themeObserver = new MutationObserver(() => {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(draw);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
};
