import { canvas, ctx } from './canvas.js';
import { caught } from './controls.js';

export const lastMoves = [];

class Ball {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.xs = 1;
        this.ys = 1;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.wallCollision = null;
        this.grounded = false;
    }
    calcSpeed() {
        return Math.sqrt(this.xs*this.xs + this.ys*this.ys);
    }
    runPhysics() {
        // collisions
        // x > canvas ?
        if(this.x >= canvas.width - this.size / 2 && this.xs > 0) {
            this.wallCollision = 'right';
            this.xs *= -1;
        }
        // x < canvas ?
        if(this.x <= 0 + this.size / 2 && this.xs < 0) {
            this.wallCollision = 'left';
            this.xs *= -1;
        }
        // y > canvas ?
        if(this.y >= canvas.height - this.size / 2 && this.ys > 0) {
            this.wallCollision = 'bottom';
            this.ys *= -1;
        }
        // y < canvas ?
        if(this.y <= 0 + this.size / 2 && this.ys < 0) {
            this.wallCollision = 'top';
            this.ys *= -1;
        }

        // rotation
        // normalizing xs & ys
        let nxs = this.xs > 0 ? this.xs : -this.xs;
        let nys = this.ys > 0 ? this.ys : -this.ys;

        // top
        if(this.wallCollision === 'top') {
            this.rotationSpeed -= 1.4 / this.size * this.calcSpeed() * this.xs / (nxs + nys);
        }
        // right
        if(this.wallCollision === 'right') {
            this.rotationSpeed -= 1.4 / this.size * this.calcSpeed() * this.ys / (nxs + nys);
        }
        // bottom
        if(this.wallCollision === 'bottom') {
            this.rotationSpeed += 1.4 / this.size * this.calcSpeed() * this.xs / (nxs + nys);
        }
        // left
        if(this.wallCollision === 'left') {
            this.rotationSpeed += 1.4 / this.size * this.calcSpeed() * this.ys / (nxs + nys);
        }

        // friction
        if(this.wallCollision === 'bottom' && this.ys < 1 && this.ys > -1 ) {
            this.grounded = true;
        } else {
            this.grounded = false;
        }
        if(this.wallCollision !== null) {
            if(this.grounded) {
                this.rotationSpeed *= 0.52;
                this.xs *= 0.97;
                if(this.wallcollision === 'right' || this.wallcollision === 'left') {
                    this.xs *= 0.4;
                }
            } else {
                this.rotationSpeed *= 0.55;
                this.xs *= 0.95;
                this.ys *= 0.85;
            }
        }
    }
    update(deltatime, caught) {
        // gravity
        if(!caught) {

        if(this.grounded) {
            this.y = canvas.height - this.size / 2;
        } else {
            this.grounded = false;
            this.ys += 1;
            this.y += this.ys * deltatime;
        }

        this.x += this.xs * deltatime;
        this.rotation += this.rotationSpeed * deltatime;
        }
        this.wallCollision = null;
    }
    draw(basketballImg) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(
            basketballImg,
            - this.size / 2,
            - this.size / 2,
            this.size,
            this.size
        );
        ctx.restore();
    }
}

export const ball = new Ball(200, 200, 80, '#444');