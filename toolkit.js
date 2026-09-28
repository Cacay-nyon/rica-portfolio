"use strict";
(() => {
  const section = document.getElementById('tools');
  const button = document.getElementById('toolkit-pause');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  function sync() {
    section.classList.toggle('is-paused',paused || document.hidden);
    section.classList.toggle('is-reduced',reduced.matches);
    button.setAttribute('aria-pressed',String(paused));
    button.setAttribute('aria-label',paused ? 'Play tool animation' : 'Pause tool animation');
    button.title = paused ? 'Play tool animation' : 'Pause tool animation';
    button.firstElementChild.textContent = paused ? '▷' : 'Ⅱ';
  }
  button.addEventListener('click',() => {paused = !paused; sync();});
  reduced.addEventListener('change',sync);
  document.addEventListener('visibilitychange',sync);
  new IntersectionObserver(entries => {
    section.classList.toggle('is-visible',entries[0].isIntersecting);
  },{threshold:0}).observe(section);
  sync();
})();
