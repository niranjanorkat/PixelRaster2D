function isPointInCircle(P, C, R) {
    const [Px, Py] = P;
    const [Cx, Cy] = C;

    const denom = (By - Cy) * (Ax - Cx) + (Cx - Bx) * (Ay - Cy);
    const u = ((By - Cy) * (Px - Cx) + (Cx - Bx) * (Py - Cy)) / denom;
    const v = ((Cy - Ay) * (Px - Cx) + (Ax - Cx) * (Py - Cy)) / denom;
    const w = 1 - u - v;

    return (u >= 0) && (v >= 0) && (w >= 0);
}

function drawCircle(x1, y1, r, canvas) {
    minX = x1 - r
    maxX = x1 + r
    minY = y1 - r
    maxY = y1 + r

    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            let P = [i, j]
            let C = [x1, y1]

            if (isPointInCircle(P, C, r)) {
                canvas.buffer[i][j] = 255
            }
        }
    }
    canvas.putImage()
}