function drawLine(x1, y1, x2, y2, fill) {
    const startX = x1 * canvas.cellSize;
    const startY = y1 * canvas.cellSize;
    const endX = x2 * canvas.cellSize;
    const endY = y2 * canvas.cellSize;

    const dx = endX - startX;
    const dy = endY - startY;

    const isGrad = isGradient(fill);
    const gradient = isGrad ? fill : null;
    const colorStart = isGrad ? gradient.colorStart : null;
    const colorEnd = isGrad ? gradient.colorEnd : null;

    if (dx === 0) { // Vertical line
        const [top, bottom] = startY < endY ? [startY, endY] : [endY, startY];
        const total = bottom - top || 1; // Avoid zero division
        for (let y = top; y <= bottom; y++) {
            if (startX >= 0 && startX < canvas.width && y >= 0 && y < canvas.height) {
                let pixelColor;
                if (isGrad) {
                    const t = (y - top) / total;
                    pixelColor = interpolateColor(colorStart, colorEnd, t);
                } else {
                    pixelColor = [...fill];
                }
                canvas.buffer[y][startX] = pixelColor;
            }
        }
        canvas.putImage();
        return;
    }

    const m = dy / dx;
    const b = startY - m * startX;

    const [left, right] = startX < endX ? [startX, endX] : [endX, startX];
    const total = right - left || 1; // Avoid zero division

    for (let x = left; x <= right; x++) {
        const y = Math.round(m * x + b);
        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
            let pixelColor;
            if (isGrad) {
                const t = (x - left) / total;
                pixelColor = interpolateColor(colorStart, colorEnd, t);
            } else {
                pixelColor = [...fill];
            }
            canvas.buffer[y][x] = pixelColor;
        }
    }

    canvas.putImage();
}
