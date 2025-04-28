const CONTEXT = "2d";

const WHITE = [255, 255, 255, 255]
const BLACK = [0, 0, 0, 255]

class Canvas {
    constructor(width, height, cellSize, canvasId) {
        this.width = width;
        this.height = height;

        this.cellSize = cellSize;
        // Do a check if divisible
        this.totalCellWidth = this.width / this.cellSize;
        this.totalCellHeight = this.height / this.cellSize;

        this.aliasDim = 4;
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.ctx = this.canvas.getContext(CONTEXT);

        this.buffer = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => WHITE)
        );

        this.init();
    }

    init() {
        for (let y = 0; y < this.height; y += this.cellSize) {
            for (let x = 0; x < this.width; x += this.cellSize) {
                this.buffer[y][x] = BLACK;
            }
        }

        this.putImage();
    }

    putImage() {
        const imageData = this.ctx.createImageData(this.width, this.height);
        const data = imageData.data;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const [r, g, b, a] = this.buffer[y][x];
                const index = (y * this.width + x) * 4;
                data[index] = r;
                data[index + 1] = g;
                data[index + 2] = b;
                data[index + 3] = a;
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    fillPixel(cellX, cellY, color) {
        const startY = cellY * this.cellSize;
        const startX = cellX * this.cellSize;

        for (let y = startY; y <= startY + this.cellSize && y < this.height; y++) {
            for (let x = startX; x <= startX + this.cellSize && x < this.width; x++) {
                this.buffer[y][x] = color;
            }
        }
    }
}
