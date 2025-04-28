const canvas = new Canvas(1080, 1080, 10, "canvas");

drawPolygon([
    [20, 10],
    [40, 15],
    [35, 30],
    [15, 30],
    [10, 15]
], BLACK);

drawRectangle(60, 10, 20, 15, BLACK);

drawTriangle(20, 50, 40, 50, 30, 70, BLACK);

drawCircle(70, 55, 10, BLACK);

drawEllipse(25, 90, 12, 8, BLACK);

drawArc(75, 90, 10, 10, 0, Math.PI, BLACK);
