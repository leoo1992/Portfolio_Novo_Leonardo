'use client';

import { useEffect } from 'react';

const REVEAL_SELECTOR = '[data-reveal]';

export function MotionLayer() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let revealObserver: IntersectionObserver | null = null;

    const registerReveal = (element: Element) => {
      if (!(element instanceof HTMLElement)) return;

      if (reducedMotion.matches || !revealObserver) {
        element.classList.add('is-visible');
        return;
      }

      revealObserver.observe(element);
    };

    const registerTree = (root: ParentNode) => {
      if (root instanceof Element && root.matches(REVEAL_SELECTOR)) {
        registerReveal(root);
      }

      root.querySelectorAll?.(REVEAL_SELECTOR).forEach(registerReveal);
    };

    if (!reducedMotion.matches && 'IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver?.unobserve(entry.target);
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
      );
    }

    registerTree(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) registerTree(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    let pointerFrame = 0;
    let scrollFrame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;

      window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
        document.documentElement.dataset.pointer = 'active';
      });
    };

    const handlePointerLeave = () => {
      delete document.documentElement.dataset.pointer;
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
        document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
      });
    };

    handleScroll();
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.cancelAnimationFrame(pointerFrame);
      window.cancelAnimationFrame(scrollFrame);
      mutationObserver.disconnect();
      revealObserver?.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor-ambient" aria-hidden="true" />
      <div className="cursor-core" aria-hidden="true" />
      <div className="scroll-meter" aria-hidden="true"><span /></div>
    </>
  );
}
