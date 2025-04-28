function isPointInTriangle(P, A, B, C) {
    const [Px, Py] = P;
    const [Ax, Ay] = A;
    const [Bx, By] = B;
    const [Cx, Cy] = C;

    const denom = (By - Cy) * (Ax - Cx) + (Cx - Bx) * (Ay - Cy);
    const u = ((By - Cy) * (Px - Cx) + (Cx - Bx) * (Py - Cy)) / denom;
    const v = ((Cy - Ay) * (Px - Cx) + (Ax - Cx) * (Py - Cy)) / denom;
    const w = 1 - u - v;

    return (u >= 0) && (v >= 0) && (w >= 0);
}

function drawTriangle(x1, y1, x2, y2, x3, y3, canvas) {
    minX = Math.min(x1, x2, x3);
    maxX = Math.max(x1, x2, x3);
    minY = Math.min(y1, y2, y3);
    maxY = Math.max(y1, y2, y3);

    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            let P = [i, j]
            let A = [x1, y1]
            let B = [x2, y2]
            let C = [x3, y3]

            if (isPointInTriangle(P, A, B, C)) {
                canvas.buffer[i][j] = 255
            }
        }
    }
    canvas.putImage()
}