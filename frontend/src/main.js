const canvas = new Canvas(window.innerWidth, window.innerHeight, "canvas");

// Set all values to black
for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
        canvas.buffer[y][x] = 0;
    }
}

// Draw onto the canvas
canvas.putImage();

drawTriangle(10, 10, 250, 350, 500, 540, canvas)