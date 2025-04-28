function checkCoordinatesInBounds(coordinates, canvas) {
    for (let i = 0; i < coordinates.length; i++) {
        let [x, y] = coordinates[i];

        let doesCoordinateExceedBound = x > canvas.totalCellWidth || y > canvas.totalCellHeight;
        if (doesCoordinateExceedBound) {
            return true;
        }
    }
    return false;
}