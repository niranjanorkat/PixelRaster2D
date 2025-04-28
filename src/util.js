function antiAliasDraw(minX, maxX, minY, maxY, insideCheck, fill) {
    const isGrad = isGradient(fill);
    const gradient = isGrad ? fill : null;

    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            let coverage = 0;

            for (let subX = 0; subX < canvas.aliasDim; subX++) {
                for (let subY = 0; subY < canvas.aliasDim; subY++) {
                    const P = [
                        (i + (subX + 0.5) / canvas.aliasDim) * canvas.cellSize,
                        (j + (subY + 0.5) / canvas.aliasDim) * canvas.cellSize
                    ];
                    if (insideCheck(P)) {
                        coverage += 1;
                    }
                }
            }

            coverage /= (canvas.aliasDim * canvas.aliasDim);

            if (coverage === 0) continue;

            let pixelColor;

            if (isGrad) {
                const px = (i + 0.5) * canvas.cellSize;
                const py = (j + 0.5) * canvas.cellSize;
                let bounds;
                if (gradient.type === "linear") {
                    bounds = gradient.axis === "y"
                        ? [(minY * canvas.cellSize), (maxY * canvas.cellSize)]
                        : [(minX * canvas.cellSize), (maxX * canvas.cellSize)];
                }
                const t = computeT(px, py, gradient, bounds);
                pixelColor = interpolateColor(gradient.colorStart, gradient.colorEnd, t);
            } else {
                pixelColor = [...fill];
            }

            pixelColor[3] *= coverage;
            canvas.fillPixel(i, j, pixelColor);
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