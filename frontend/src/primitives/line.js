function drawLine(x1, y1, x2, y2, fill) {
    const startX = x1 * canvas.cellSize;
    const startY = y1 * canvas.cellSize;
    const endX = x2 * canvas.cellSize;
    const endY = y2 * canvas.cellSize;

    const dx = endX - startX;
    const dy = endY - startY;

    if (dx === 0) {
        const [top, bottom] = startY < endY ? [startY, endY] : [endY, startY];
        for (let y = top; y <= bottom; y++) {
            if (startX >= 0 && startX < canvas.width && y >= 0 && y < canvas.height) {
                canvas.buffer[y][startX] = [...fill];
            }
        }
        canvas.putImage();
        return;
    }

    const m = dy / dx;
    const b = startY - m * startX;

    const [left, right] = startX < endX ? [startX, endX] : [endX, startX];

    for (let x = left; x <= right; x++) {
        const y = Math.round(m * x + b);
        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
            canvas.buffer[y][x] = [...fill];
        }
    }

    canvas.putImage();
}