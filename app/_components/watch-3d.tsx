"use client";

import { useEffect, useRef } from "react";
import type * as T from "three";

type Mode = "rest" | "listen" | "happy";
type Frames = { fps: number } & Record<Mode, { b: string }[]>;

/**
 * The hero watch in 3D (three.js): a metal case, bezel, glass, two buttons and a strap, with Buddy's
 * animation drawn onto the screen. It floats, turns slowly and tilts toward the pointer. onReady runs
 * after the first frame; without WebGL it never runs, and the drawn watch stays in its place.
 */
export function Watch3D({ onReady, className = "" }: { onReady: () => void; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const ready = useRef(onReady);

  useEffect(() => {
    ready.current = onReady;
  }, [onReady]);

  useEffect(() => {
    let cancelled = false;
    let dispose = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      const { RoundedBoxGeometry } = await import("three/addons/geometries/RoundedBoxGeometry.js");
      const frames: Frames = await fetch("/buddy-frames.json").then((r) => r.json());
      const el = host.current;
      if (cancelled || !el) return;

      let renderer: T.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        return;
      }
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      scene.environment = pmrem.fromScene(room, 0.04).texture;

      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
      camera.position.set(0, 0, 8.8);

      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(3, 4, 6);
      const rim = new THREE.DirectionalLight(0x6fe3b4, 2.4);
      rim.position.set(-4, 2, -3);
      const rim2 = new THREE.DirectionalLight(0x6fe3b4, 1.3);
      rim2.position.set(4, -1.5, -2);
      const glow = new THREE.PointLight(0x6fe3b4, 1.4, 4, 2);
      glow.position.set(0, 0, 1.3);
      scene.add(key, rim, rim2, glow);

      // Buddy on the screen: the app's own frames, drawn into a canvas texture. 1024 px, so the face stays
      // sharp on high-density screens.
      const S = 1024;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = S;
      const ctx = canvas.getContext("2d")!;
      const screenTex = new THREE.CanvasTexture(canvas);
      screenTex.colorSpace = THREE.SRGBColorSpace;
      screenTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      const shapes = new Map<string, Path2D>();
      const drawBuddy = (d: string) => {
        const bg = ctx.createRadialGradient(S / 2, S * 0.42, 0, S / 2, S / 2, S * 0.645);
        bg.addColorStop(0, "#17171b");
        bg.addColorStop(0.72, "#050506");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, S, S);
        let shape = shapes.get(d);
        if (!shape) {
          shape = new Path2D(d);
          shapes.set(d, shape);
        }
        const size = S * 0.6;
        ctx.save();
        ctx.translate((S - size) / 2, (S - size) / 2);
        ctx.scale(size / 200, size / 200);
        ctx.fillStyle = "#6fe3b4";
        ctx.fill(shape, "evenodd");
        ctx.restore();
        screenTex.needsUpdate = true;
      };

      const metal = new THREE.MeshPhysicalMaterial({ color: 0x74747e, metalness: 1, roughness: 0.2, clearcoat: 0.6, clearcoatRoughness: 0.15 });
      const dark = new THREE.MeshPhysicalMaterial({ color: 0x1b1b20, metalness: 0.85, roughness: 0.35 });
      const rubber = new THREE.MeshPhysicalMaterial({ color: 0x101013, roughness: 0.6, metalness: 0, clearcoat: 0.1, clearcoatRoughness: 0.7, envMapIntensity: 0.28 });
      const hole = new THREE.MeshStandardMaterial({ color: 0x08080a, roughness: 0.9 });
      const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.03, transparent: true, opacity: 0.1, clearcoat: 1 });
      const screen = new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false });

      const R = 1;
      const H = 0.34;
      const profile = [
        [0, -H / 2],
        [R - 0.1, -H / 2],
        [R - 0.03, -H / 2 + 0.02],
        [R, -H / 2 + 0.07],
        [R, H / 2 - 0.07],
        [R - 0.03, H / 2 - 0.02],
        [R - 0.08, H / 2],
        [0, H / 2],
      ].map(([x, y]) => new THREE.Vector2(x, y));
      const caseGeo = new THREE.LatheGeometry(profile, 128).rotateX(Math.PI / 2);
      const bezelGeo = new THREE.TorusGeometry(0.93, 0.045, 24, 160);
      const screenGeo = new THREE.CircleGeometry(0.885, 128);
      const glassGeo = new THREE.CircleGeometry(0.9, 128);
      const buttonGeo = new RoundedBoxGeometry(0.12, 0.28, 0.14, 4, 0.04);
      const strapGeo = new RoundedBoxGeometry(1.1, 1.7, 0.16, 6, 0.07);
      const holeGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.2, 24).rotateX(Math.PI / 2);
      const geometries = [caseGeo, bezelGeo, screenGeo, glassGeo, buttonGeo, strapGeo, holeGeo];

      const watch = new THREE.Group();
      const add = (geo: T.BufferGeometry, mat: T.Material, set: (m: T.Mesh) => void, parent: T.Object3D = watch) => {
        const m = new THREE.Mesh(geo, mat);
        set(m);
        parent.add(m);
        return m;
      };
      add(caseGeo, metal, () => {});
      add(bezelGeo, dark, (m) => (m.position.z = H / 2));
      add(screenGeo, screen, (m) => (m.position.z = H / 2 + 0.004));
      add(glassGeo, glass, (m) => (m.position.z = H / 2 + 0.02));
      for (const a of [0.44, -0.44]) {
        add(buttonGeo, metal, (m) => {
          m.position.set((R + 0.03) * Math.cos(a), (R + 0.03) * Math.sin(a), 0);
          m.rotation.z = a;
        });
      }
      add(strapGeo, rubber, (m) => {
        m.position.set(0, R + 0.72, -0.12);
        m.rotation.x = -0.22;
      });
      const bottom = add(strapGeo, rubber, (m) => {
        m.position.set(0, -(R + 0.72), -0.12);
        m.rotation.x = 0.22;
      });
      for (const y of [0.12, -0.1, -0.32]) add(holeGeo, hole, (m) => m.position.set(0, y, 0), bottom);
      scene.add(watch);

      // Size, pointer, visibility.
      const fit = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      fit();
      const resize = new ResizeObserver(fit);
      resize.observe(el);

      const pointer = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true;
      const seen = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      seen.observe(el);

      let mode: Mode = "rest";
      let modeStart = performance.now();
      const onMode = (e: Event) => {
        const next = (e as CustomEvent<Mode>).detail;
        if (next === mode || mode === "happy") return;
        mode = next;
        modeStart = performance.now();
      };
      window.addEventListener("buddy", onMode);

      let shown = "";
      const frameFor = (now: number) => {
        const list = frames[mode];
        const n = Math.max(0, Math.floor(((now - modeStart) / 1000) * frames.fps));
        if (mode === "happy") return list[Math.min(n, list.length - 1)].b;
        const period = 2 * list.length - 2;
        const k = still ? 0 : n % period;
        return list[k < list.length ? k : period - k].b;
      };

      const t0 = performance.now();
      let rx = 0;
      let ry = 0;
      let raf = 0;
      let first = true;
      const tick = (now: number) => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        const t = (now - t0) / 1000;
        const idle = still ? 0 : 1;
        ry += (pointer.x * 0.5 - ry) * 0.05;
        rx += (pointer.y * 0.3 - rx) * 0.05;
        watch.rotation.y = -0.38 + idle * Math.sin(t * 0.55) * 0.22 + (still ? 0 : ry);
        watch.rotation.x = -0.1 + idle * Math.sin(t * 0.8) * 0.05 + (still ? 0 : rx);
        watch.position.y = idle * Math.sin(t * 1.1) * 0.07;
        const d = frameFor(now);
        if (d !== shown) {
          drawBuddy(d);
          shown = d;
        }
        renderer.render(scene, camera);
        if (first) {
          first = false;
          ready.current();
        }
      };
      raf = requestAnimationFrame(tick);

      dispose = () => {
        cancelAnimationFrame(raf);
        resize.disconnect();
        seen.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("buddy", onMode);
        geometries.forEach((g) => g.dispose());
        [metal, dark, rubber, hole, glass, screen].forEach((m) => m.dispose());
        screenTex.dispose();
        scene.environment?.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
      if (cancelled) dispose();
    })().catch(() => {});

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return <div ref={host} aria-hidden="true" className={className} />;
}
