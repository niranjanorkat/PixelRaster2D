function drawRectangle(x, y, width, height, fill) {
    const startX = x * canvas.cellSize;
    const startY = y * canvas.cellSize;
    const endX = (x + width) * canvas.cellSize;
    const endY = (y + height) * canvas.cellSize;

    for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
            if (i >= 0 && i < canvas.width && j >= 0 && j < canvas.height) {
                canvas.buffer[j][i] = [...fill];
            }
        }
    }

    canvas.putImage();
}

function drawSquare(x, y, size, fill) {
    drawRectangle(x, y, size, size, fill);
}
