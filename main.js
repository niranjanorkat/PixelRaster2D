const canvas = new Canvas(1080, 1080, "canvas");

// drawTriangle(0, 0, 0, 5, 5, 0, BLACK, canvas);
const concavePolygon = [
    [5, 2],
    [8, 5],
    [6, 5],
    [6, 8],
    [4, 8],
    [4, 5],
    [2, 5]
];

drawPolygon(concavePolygon, BLACK);