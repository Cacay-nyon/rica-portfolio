"use strict";
// Small, eased movements; native scrolling remains in the visitor's control.
(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 700px), (pointer: coarse)');

  const hero = document.querySelector('.creative-hero');
  const gallery = document.querySelector('.fan-gallery');
  const personal = document.querySelector('.personal-gallery');
  const pieces = [...document.querySelectorAll('.personal-piece')];
  const reveals = [...document.querySelectorAll('.section-heading,.featured-edit,.about-heading,.about-editorial,.app-heading,.app-project-bar,.contact-copy')];
  let paused = reduced.matches;
  let frame = 0, lastTime = 0, fan = 0, portrait = 0;
  let heroTop = 0, heroHeight = 1, personalCenter = 0;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({target,isIntersecting}) => {
      if (isIntersecting) { target.classList.add('is-revealed'); observer.unobserve(target); }
    });
  }, {threshold: .08, rootMargin: '0px 0px 35px 0px'});
  reveals.forEach(el => {el.classList.add('scroll-reveal');observer.observe(el);});
  // Measure when the document changes size, not on every animation frame.
  function measure() {
    const a = hero.getBoundingClientRect(), b = personal.getBoundingClientRect();
    heroTop = a.top + scrollY; heroHeight = a.height;
    personalCenter = b.top + scrollY + b.height / 2;
    schedule();
  }
  function render(time) {
    frame = 0;
    if (paused || compact.matches || document.hidden) {lastTime = 0; return;}
    const targetFan = clamp((scrollY - heroTop) / (heroHeight * .8), 0, 1);
    const targetPortrait = clamp((scrollY + innerHeight / 2 - personalCenter) / innerHeight, -1, 1);
    const delta = lastTime ? Math.min(time - lastTime, 50) : 16.7;
    const ease = 1 - Math.exp(-delta / 100);
    lastTime = time;
    fan += (targetFan - fan) * ease;
    portrait += (targetPortrait - portrait) * ease;
    gallery.style.setProperty('--fan-scroll', fan.toFixed(4));
    pieces.forEach((piece,i) => {piece.style.translate = `0 ${(portrait * (i % 2 ? -18 : 22)).toFixed(2)}px`;});
    if (Math.abs(targetFan-fan) > .001 || Math.abs(targetPortrait-portrait) > .001) frame = requestAnimationFrame(render);
    else lastTime = 0;
  }
  function schedule() {if (!paused && !compact.matches && !document.hidden && !frame) frame = requestAnimationFrame(render);}
  function reset() {
    cancelAnimationFrame(frame); frame = 0; lastTime = 0; fan = 0; portrait = 0;
    gallery.style.removeProperty('--fan-scroll');
    pieces.forEach(piece => piece.style.removeProperty('translate'));
  }
  function setPaused(value) {
    paused = value; root.classList.toggle('motion-paused',value);


    reset();
    if (value) {
      reveals.forEach(el => el.classList.add('is-revealed'));
      document.getAnimations().forEach(animation => {if (Number.isFinite(animation.effect.getComputedTiming().endTime)) animation.finish();});
    } else schedule();
  }

  reduced.addEventListener('change',() => setPaused(reduced.matches));
  compact.addEventListener('change',() => {reset();measure();});
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',measure,{passive:true});
  addEventListener('load',measure,{once:true});
  new ResizeObserver(measure).observe(document.body);
  document.addEventListener('visibilitychange',() => document.hidden ? reset() : schedule());
  measure(); setPaused(paused);
})();
