const canvas = new Canvas(1080, 1080, 10, "canvas");


drawPolygon([
    [20, 20],
    [40, 25],
    [35, 40],
    [15, 40],
    [10, 25]
], BLACK);

drawRectangle(60, 20, 20, 15, BLACK);

drawTriangle(20, 60, 40, 60, 30, 80, BLACK);

drawCircle(70, 65, 10, BLACK);

drawEllipse(25, 100, 12, 8, BLACK);

drawArc(75, 100, 10, 10, 0, Math.PI, BLACK);