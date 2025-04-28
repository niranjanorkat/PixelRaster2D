function antiAliasDraw(minX, maxX, minY, maxY, insideCheck, fill) {
    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            let coverage = 0;

            for (let subX = 0; subX < canvas.aliasDim; subX++) {
                for (let subY = 0; subY < canvas.aliasDim; subY++) {
                    let P = [
                        (i + (subX + 0.5) / canvas.aliasDim) * canvas.cellSize,
                        (j + (subY + 0.5) / canvas.aliasDim) * canvas.cellSize
                    ];
                    if (insideCheck(P)) {
                        coverage += 1;
                    }
                }
            }

            coverage /= (canvas.aliasDim * canvas.aliasDim);

            if (coverage == 0) continue;

            let pixelFill = [...fill];
            pixelFill[3] *= coverage;
            canvas.fillPixel(i, j, pixelFill);
        }
    }
    canvas.putImage();
}

function checkCoordinatesInBounds(coordinates) {
    for (let i = 0; i < coordinates.length; i++) {
        let [x, y] = coordinates[i];

        let doesCoordinateExceedBound = x > canvas.totalCellWidth || y > canvas.totalCellHeight;
        if (doesCoordinateExceedBound) {
            return true;
        }
    }
    return false;
}

function isGradient(fill) {
    if (!Array.isArray(fill)) {
        console.error("Invalid fill: fill must be an array.");
        return undefined;
    }

    if (fill.length === 4 && fill.every(v => typeof v === "number")) {
        return false;
    }

    if (fill.length === 2 &&
        Array.isArray(fill[0]) &&
        Array.isArray(fill[1]) &&
        fill[0].length === 4 &&
        fill[1].length === 4 &&
        fill[0].every(v => typeof v === "number") &&
        fill[1].every(v => typeof v === "number")) {
        return true;
    }

    console.error("Invalid fill: must be a [r,g,b,a] array or a [[r,g,b,a], [r,g,b,a]] array.");
    return undefined;
}