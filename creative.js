"use strict";
// Motion follows the visitor's scroll; it never changes the natural page flow.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.getElementById('motion-toggle');
  const root = document.documentElement;
  const gallery = document.querySelector('.fan-gallery');
  const personal = document.querySelector('.personal-gallery');
  const pieces = [...document.querySelectorAll('.personal-piece')];
  const revealTargets = [...document.querySelectorAll('.section-heading,.featured-edit,.about-heading,.about-editorial,.founder-note,.contact-copy')];
  let paused = reducedMotion.matches;
  let frame = 0;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}
    });
  },{threshold:.12});
  revealTargets.forEach(el => {el.classList.add('scroll-reveal');observer.observe(el);});
  function renderMotion(){
    frame=0;
    if(paused)return;
    if(gallery){
      const hero = document.querySelector('.creative-hero').getBoundingClientRect();
      if(hero.bottom>0&&hero.top<innerHeight){
        const progress=Math.max(0,Math.min(1,-hero.top/(hero.height*.8)));
        gallery.style.setProperty('--fan-scroll',progress.toFixed(3));
      }
    }
    if(personal){
      const rect=personal.getBoundingClientRect();
      if(rect.bottom>0&&rect.top<innerHeight){
        const progress=Math.max(-1,Math.min(1,(innerHeight/2-(rect.top+rect.height/2))/innerHeight));
        pieces.forEach((piece,i)=>{piece.style.translate=`0 ${progress*(i%2===0?55:-45)}px`;});
      }
    }
  }
  function schedule(){if(!paused&&!frame)frame=requestAnimationFrame(renderMotion);}
  function setPaused(value){
    paused=value;root.classList.toggle('motion-paused',paused);
    toggle.setAttribute('aria-pressed',String(paused));
    toggle.textContent=paused?'Enable motion':'Pause motion';
    if(paused){
      if(frame)cancelAnimationFrame(frame);frame=0;
      gallery?.style.removeProperty('--fan-scroll');
      pieces.forEach(piece=>piece.style.removeProperty('translate'));
      revealTargets.forEach(el=>el.classList.add('is-revealed'));
    }else schedule();
  }
  toggle.addEventListener('click',()=>setPaused(!paused));
  reducedMotion.addEventListener('change',event=>setPaused(event.matches));
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}else schedule();});
  setPaused(paused);
})();
