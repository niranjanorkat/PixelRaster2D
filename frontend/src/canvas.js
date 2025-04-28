CONTEXT = "2d"
class Canvas {
    constructor(width, height, canvasId) {
        this.width = width;
        this.height = height;

        this.canvas = document.getElementById(canvasId);
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.ctx = this.canvas.getContext(CONTEXT);
        this.buffer = Array.from({ length: height }, () => Array(width).fill(0));
    }

    putImage() {
        console.log(this.width, this.height)
        const imageData = this.ctx.createImageData(this.width, this.height);
        const data = imageData.data;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const value = this.buffer[y][x];
                const index = (y * this.width + x) * 4;
                data[index] = value;     // Red
                data[index + 1] = value; // Green
                data[index + 2] = value; // Blue
                data[index + 3] = 255;   // Alpha
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }
}
