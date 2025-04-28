function isPointInEllipse(P, C, Rx, Ry) {
    const [Px, Py] = P;
    const [Cx, Cy] = C;

    const dx = Px - Cx;
    const dy = Py - Cy;

    return ((dx * dx) / (Rx * Rx) + (dy * dy) / (Ry * Ry)) <= 1;
}

function drawEllipse(x1, y1, rx, ry, fill) {
    const C = [x1 * canvas.cellSize, y1 * canvas.cellSize];
    const Rx = rx * canvas.cellSize;
    const Ry = ry * canvas.cellSize;

    const minX = x1 - rx;
    const maxX = x1 + rx;
    const minY = y1 - ry;
    const maxY = y1 + ry;

    const insideCheck = (P) => isPointInEllipse(P, C, Rx, Ry);

    antiAliasDraw(minX, maxX, minY, maxY, insideCheck, fill);
}

function drawCircle(x1, y1, r, fill) {
    drawEllipse(x1, y1, r, r, fill);
}
