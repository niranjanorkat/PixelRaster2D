const canvas = new Canvas(1080, 1080, 10, "canvas");

drawPolygon([
    [20, 10],
    [40, 15],
    [35, 30],
    [15, 30],
    [10, 15]
], createLinearGradient(
    [255, 165, 0, 255], // Orange
    [255, 105, 180, 255] // Pink
));

drawRectangle(60, 10, 20, 15, createRadialGradient(
    [0, 255, 255, 255],  // Cyan
    [0, 0, 139, 255],    // Deep Blue
    [70 * canvas.cellSize, 17.5 * canvas.cellSize],
    10 * canvas.cellSize
));

drawTriangle(
    20, 50,
    40, 50,
    30, 70,
    createLinearGradient(
        [255, 255, 0, 255], // Yellow
        [255, 0, 0, 255],   // Red
        "y"
    )
);

drawCircle(70, 55, 10, createRadialGradient(
    [255, 255, 255, 255], // White
    [0, 0, 255, 255],     // Blue
    [70 * canvas.cellSize, 55 * canvas.cellSize],
    10 * canvas.cellSize
));

drawEllipse(25, 90, 12, 8, createLinearGradient(
    [0, 255, 0, 255],   // Green
    [128, 0, 128, 255]  // Purple
));

drawArc(75, 90, 10, 10, 0, Math.PI, createRadialGradient(
    [173, 216, 230, 255], // Light Blue
    [0, 0, 128, 255],     // Navy
    [75 * canvas.cellSize, 90 * canvas.cellSize],
    10 * canvas.cellSize
));
