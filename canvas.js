function createCanvas() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100%';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;    
    return [canvas, ctx];
}

export const [canvas, ctx] = createCanvas();