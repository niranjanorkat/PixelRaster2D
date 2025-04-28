function isPointInPolygon(P, polygon, bounds) {
    const [px, py] = P;
    const [minX, maxX, minY, maxY] = bounds;

    if (px < minX || px > maxX || py < minY || py > maxY) {
        return false;
    }

    let isInside = false;
    let i = 0, j = polygon.length - 1;
    for (; i < polygon.length; j = i++) {
        const [ix, iy] = polygon[i];
        const [jx, jy] = polygon[j];

        if ((iy > py) !== (jy > py) &&
            (px < (jx - ix) * (py - iy) / (jy - iy) + ix)) {
            isInside = !isInside;
        }
    }

    return isInside;
}

function getBoundingBox(polygon) {
    let minX = polygon[0][0], maxX = polygon[0][0];
    let minY = polygon[0][1], maxY = polygon[0][1];

    for (let n = 1; n < polygon.length; n++) {
        const [qx, qy] = polygon[n];
        minX = Math.min(qx, minX);
        maxX = Math.max(qx, maxX);
        minY = Math.min(qy, minY);
        maxY = Math.max(qy, maxY);
    }

    return [minX, maxX, minY, maxY];
}

function drawPolygon(polygon, fill) {
    const bounds = getBoundingBox(polygon);

    const scaledPolygon = polygon.map(([x, y]) => [x * canvas.cellSize, y * canvas.cellSize]);
    const scaledBounds = getBoundingBox(scaledPolygon);

    const insideCheck = (P) => isPointInPolygon(P, scaledPolygon, scaledBounds);

    antiAliasDraw(bounds[0], bounds[1], bounds[2], bounds[3], insideCheck, fill);
}