import { promisedImgs } from './imgLoader.js';
import { canvas, ctx } from './canvas.js';
import { Ball, lastMoves} from './Ball.js';

let timecheck = 0;
let deltatime = 0;

async function animate(timestamp) {
    const imgs = await Promise.all(promisedImgs);
    const [basketballImg, basketfieldImg] = imgs;

    deltatime = (timestamp - timecheck) / 19;    
    drawBg(basketfieldImg);
    ball.runPhysics();
    ball.update(deltatime, caught);
    ball.draw(basketballImg);
    timecheck = timestamp;

    lastMoves.push({ x: ball.x + ball.size / 2, y: ball.y + ball.size / 2 });

    window.onresize = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        drawBg(basketfieldImg);
        ball.draw(basketballImg);
    }

    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

function drawBg(basketfieldImg) {
    ctx.drawImage(basketfieldImg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const ball = new Ball(200, 200, 80, '#444');

// Controls
let caught = false;

window.addEventListener('mousedown', handleMousedown);
window.addEventListener('mousemove', handleMousemove);
window.addEventListener('mouseup', handleMouseup);

// dirty controls to work on to next
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
}