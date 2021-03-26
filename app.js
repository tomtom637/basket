import { promisedImgs } from './imgLoader.js';
import { canvas, ctx } from './canvas.js';
import { ball, lastMoves} from './Ball.js';
import { caught } from './controls.js';

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
