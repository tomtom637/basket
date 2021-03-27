import { ball, lastMoves } from './Ball.js';

// Controls
const speedToAdd = 25;

window.addEventListener('mousedown', handleMousedown);
window.addEventListener('touchstart', handleMousedown);

function handleMousedown(e) {
  let xVeloc;
  let yVeloc;

  if(e.clientX === undefined) {
    xVeloc = ball.x - e.changedTouches[0].clientX;
    yVeloc = ball.y - e.changedTouches[0].clientY;
  } else {
    xVeloc = ball.x - e.clientX;
    yVeloc = ball.y - e.clientY;
  }

  // normalize the speeds
  let nxVeloc = xVeloc > 0 ? xVeloc : -xVeloc;
  let nyVeloc = yVeloc > 0 ? yVeloc : -yVeloc;

 const xRatio = xVeloc / (nxVeloc + nyVeloc);
 const yRatio = yVeloc / (nxVeloc + nyVeloc);

 ball.xs += speedToAdd * xRatio;
 ball.ys += speedToAdd * yRatio;
}






 export let caught = false;

/*window.addEventListener('mousedown', handleMousedown);
window.addEventListener('mousemove', handleMousemove);
window.addEventListener('mouseup', handleMouseup);

window.addEventListener('keydown', e => {
    if(e.key === ' ') {
        if(ball.ys <= 2 || ball.ys >= -2) {
            ball.ys += 10;
        }
    }
    if(e.key === 'ArrowRight') {
        ball.xs += 10;
    }
    if(e.key === 'ArrowLeft') {
        ball.xs -= 10;
    }
});

function handleMousedown(e) {
    if (
        e.clientX > ball.x - ball.size / 2 * 1.5 &&
        e.clientX < ball.x + ball.size / 2 * 1.5 &&
        e.clientY > ball.y - ball.size / 2 * 1.5 &&
        e.clientY < ball.y + ball.size / 2 * 1.5
    ) {
        caught = true;
        ball.xs = 0;
        ball.ys = 0;
        ball.rotationSpeed = 0;
    } else {
        caught = false;
    }
}

function handleMousemove(e) {
    if (caught) {
        ball.x = e.clientX;
        ball.y = e.clientY;
    }
}

function handleMouseup(e) {
    if (caught && lastMoves[lastMoves.length - 8]) {
        ball.xs =
          (lastMoves[lastMoves.length - 1].x -
            lastMoves[lastMoves.length - 8].x) /
          10;
        ball.ys =
          (lastMoves[lastMoves.length - 1].y -
            lastMoves[lastMoves.length - 8].y) /
          10;
        lastMoves.length = 0;
    }
    caught = false;
} */