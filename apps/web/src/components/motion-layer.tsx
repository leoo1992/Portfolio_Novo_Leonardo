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

      root
        .querySelectorAll?.(REVEAL_SELECTOR)
        .forEach((element) => registerReveal(element));
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
        {
          threshold: 0.12,
          rootMargin: '0px 0px -8% 0px',
        },
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

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    let pointerFrame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;

      window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.cancelAnimationFrame(pointerFrame);
      mutationObserver.disconnect();
      revealObserver?.disconnect();
    };
  }, []);

  return <div className="cursor-ambient" aria-hidden="true" />;
}
