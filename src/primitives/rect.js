function drawRectangle(x, y, width, height, fill) {
    const startX = x * canvas.cellSize;
    const startY = y * canvas.cellSize;
    const endX = (x + width) * canvas.cellSize;
    const endY = (y + height) * canvas.cellSize;

    const gradientFill = isGradient(fill);
    let gradientAxis = "x"; // Default axis

    let colorStart = fill;
    let colorEnd = fill;

    if (gradientFill) {
        colorStart = fill[0];
        colorEnd = fill[1];
        if (fill.length === 3 && (fill[2] === "x" || fill[2] === "y")) {
            gradientAxis = fill[2];
        }
    }

    for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
            if (i >= 0 && i < canvas.width && j >= 0 && j < canvas.height) {
                let pixelColor;
                if (gradientFill) {
                    let t;
                    if (gradientAxis === "x") {
                        t = computeTLinear(i, startX, endX);
                    } else {
                        t = computeTLinear(j, startY, endY);
                    }
                    pixelColor = interpolateColor(colorStart, colorEnd, t);
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
