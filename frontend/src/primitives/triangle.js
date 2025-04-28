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

    let minX = Math.min(x1, x2, x3);
    let maxX = Math.max(x1, x2, x3);
    let minY = Math.min(y1, y2, y3);
    let maxY = Math.max(y1, y2, y3);

    let A = [x1 * canvas.cellSize, y1 * canvas.cellSize];
    let B = [x2 * canvas.cellSize, y2 * canvas.cellSize];
    let C = [x3 * canvas.cellSize, y3 * canvas.cellSize];

    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            let coverage = 0;

            for (let subX = 0; subX < canvas.aliasDim; subX++) {
                for (let subY = 0; subY < canvas.aliasDim; subY++) {
                    // Calculate supersampled point inside cell
                    let P = [
                        (i + (subX + 0.5) / canvas.aliasDim) * canvas.cellSize,
                        (j + (subY + 0.5) / canvas.aliasDim) * canvas.cellSize
                    ];

                    if (isPointInTriangle(P, A, B, C)) {
                        coverage += 1;
                    }
                }
            }

            coverage /= (canvas.aliasDim * canvas.aliasDim);

            if (coverage == 0) continue;

            let pixelFill = [...fill];
            pixelFill[3] = pixelFill[3] * coverage;
            canvas.fillPixel(i, j, pixelFill);
        }
    }
    canvas.putImage();
}