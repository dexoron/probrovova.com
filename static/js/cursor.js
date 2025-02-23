const { animate, frame } = window.Motion;

const ball = document.querySelector(".ball");

const { top, left, width, height } = ball.getBoundingClientRect();
const initialX = left + width / 2;
const initialY = top + height / 2;

let pointerX = 0;
let pointerY = 0;

function springToPointer() {
  animate(
    ball,
    {
      x: pointerX - initialX,
      y: pointerY - initialY
    },
    { type: "spring", stiffness: 100, damping: 10 }
  );
}

document.addEventListener("pointermove", (e) => {
  pointerX = e.clientX;
  pointerY = e.clientY;

  /**
   * By using `frame.postRender`, we achieve two things:
   * 1. The animation will be triggered at the end of the animation loop, giving
   *    any existing spring animations a chance to run for a frame and render.
   * 2. Debounce the animation to prevent a new one being triggered every pointer
   *    move, which could be more regular than the animation loop.
   */
  frame.postRender(springToPointer);
});
