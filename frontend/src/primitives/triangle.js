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


function drawTriangle(x1, y1, x2, y2, x3, y3, fill) {
    let doesTriangleExceedBound = checkCoordinatesInBounds([[x1, y1], [x2, y2], [x3, y3]]);
    if (doesTriangleExceedBound) {
        console.error(`Triangle exceeds canvas bounds.`);
    }
    const A = [x1 * canvas.cellSize, y1 * canvas.cellSize];
    const B = [x2 * canvas.cellSize, y2 * canvas.cellSize];
    const C = [x3 * canvas.cellSize, y3 * canvas.cellSize];

    const minX = Math.min(x1, x2, x3);
    const maxX = Math.max(x1, x2, x3);
    const minY = Math.min(y1, y2, y3);
    const maxY = Math.max(y1, y2, y3);

    const insideCheck = (P) => isPointInTriangle(P, A, B, C);

    antiAliasDraw(minX, maxX, minY, maxY, insideCheck, fill);
}