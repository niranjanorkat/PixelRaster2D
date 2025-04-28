function isPointInArc(P, C, Rx, Ry, startAngle, stopAngle) {
    const [Px, Py] = P;
    const [Cx, Cy] = C;

    const dx = Px - Cx;
    const dy = Py - Cy;

    const ellipseValue = (dx * dx) / (Rx * Rx) + (dy * dy) / (Ry * Ry);

    if (ellipseValue > 1) {
        return false;
    }

    let theta = Math.atan2(dy, dx);
    if (theta < 0) theta += 2 * Math.PI;

    if (startAngle < stopAngle) {
        return startAngle <= theta && theta <= stopAngle;
    } else {
        return theta >= startAngle || theta <= stopAngle;
    }
}
function drawArc(x1, y1, rx, ry, startAngle, stopAngle, fill) {
    const C = [x1 * canvas.cellSize, y1 * canvas.cellSize];
    const Rx = rx * canvas.cellSize;
    const Ry = ry * canvas.cellSize;

    const minX = x1 - rx;
    const maxX = x1 + rx;
    const minY = y1 - ry;
    const maxY = y1 + ry;

    const insideCheck = (P) => isPointInArc(P, C, Rx, Ry, startAngle, stopAngle);

    antiAliasDraw(minX, maxX, minY, maxY, insideCheck, fill);
}

function drawEllipse(x1, y1, rx, ry, fill) {
    drawArc(x1, y1, rx, ry, 0, 2 * Math.PI, fill);
}

function drawCircle(x1, y1, r, fill) {
    drawEllipse(x1, y1, r, r, fill);
}
