function drawRectangle(x, y, width, height, fill) {
    const startX = x * canvas.cellSize;
    const startY = y * canvas.cellSize;
    const endX = (x + width) * canvas.cellSize;
    const endY = (y + height) * canvas.cellSize;

    const isGrad = isGradient(fill);
    for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
            if (i >= 0 && i < canvas.width && j >= 0 && j < canvas.height) {
                let pixelColor;

                if (isGrad) {
                    let bounds = fill.axis === "y" ? [startY, endY] : [startX, endX];
                    const t = computeT(i, j, fill, bounds);
                    pixelColor = interpolateColor(fill.colorStart, fill.colorEnd, t);
                } else {
                    pixelColor = [...fill];
                }

                canvas.buffer[j][i] = pixelColor;
            }
        }
    }

    canvas.putImage();
}

function drawSquare(x, y, size, fill) {
    drawRectangle(x, y, size, size, fill);
}
