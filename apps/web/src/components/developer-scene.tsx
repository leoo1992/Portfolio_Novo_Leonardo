'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window { THREE?: any; }
}

export function DeveloperScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let cleanup = () => {};

    const start = () => {
      if (disposed || !mount || !window.THREE) return;
      const THREE = window.THREE;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, .1, 100);
      camera.position.z = 6;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);
      const points = [];
      for (let i=0;i<42;i++) {
        const a=i*.71, r=1.25+(i%7)*.13;
        points.push(new THREE.Vector3(Math.cos(a)*r, Math.sin(a*1.37)*1.55, Math.sin(a)*r));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.PointsMaterial({ color: 0x8b85ff, size: .075, transparent:true, opacity:.9 });
      group.add(new THREE.Points(geometry, material));

      const linePositions:number[]=[];
      for(let i=0;i<points.length;i++) for(let j=i+1;j<points.length;j++) {
        if(points[i].distanceTo(points[j])<1.05) linePositions.push(...points[i].toArray(),...points[j].toArray());
      }
      const lineGeo=new THREE.BufferGeometry();
      lineGeo.setAttribute('position',new THREE.Float32BufferAttribute(linePositions,3));
      group.add(new THREE.LineSegments(lineGeo,new THREE.LineBasicMaterial({color:0x55dcff,transparent:true,opacity:.18})));

      let mx=0,my=0,frame=0;
      const pointer=(e:PointerEvent)=>{ const b=mount.getBoundingClientRect(); mx=(e.clientX-b.left)/b.width-.5; my=(e.clientY-b.top)/b.height-.5; };
      const resize=()=>{ const w=mount.clientWidth,h=mount.clientHeight; renderer.setSize(w,h,false); camera.aspect=w/Math.max(h,1); camera.updateProjectionMatrix(); };
      const tick=()=>{ group.rotation.y += .0018; group.rotation.x += (my*.22-group.rotation.x)*.025; group.rotation.y += (mx*.22-group.rotation.y)*.012; renderer.render(scene,camera); frame=requestAnimationFrame(tick); };
      resize(); tick();
      mount.addEventListener('pointermove',pointer,{passive:true}); window.addEventListener('resize',resize);
      cleanup=()=>{cancelAnimationFrame(frame);mount.removeEventListener('pointermove',pointer);window.removeEventListener('resize',resize);geometry.dispose();lineGeo.dispose();material.dispose();renderer.dispose();renderer.domElement.remove();};
    };

    if(window.THREE) start();
    else {
      const script=document.createElement('script');
      script.src='https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.min.js';
      script.async=true; script.dataset.portfolioThree='true'; script.onload=start;
      document.head.appendChild(script);
    }
    return()=>{disposed=true;cleanup();};
  },[]);

  return <div ref={mountRef} className="developer-scene" aria-hidden="true"><div className="scene-fallback" /></div>;
}
