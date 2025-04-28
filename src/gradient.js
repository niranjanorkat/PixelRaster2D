function isGradient(fill) {
    if (!Array.isArray(fill)) {
        console.error("Invalid fill: must be an array.");
        return false;
    }

    if (fill.length === 4 && fill.every(v => typeof v === "number")) {
        return false; // solid color
    }

    if ((fill.length === 2 || fill.length === 3) &&
        Array.isArray(fill[0]) &&
        Array.isArray(fill[1]) &&
        fill[0].length === 4 &&
        fill[1].length === 4 &&
        fill[0].every(v => typeof v === "number") &&
        fill[1].every(v => typeof v === "number")) {
        return true; // gradient
    }

    console.error("Invalid fill: must be [r,g,b,a] or [[r,g,b,a], [r,g,b,a]]");
    return false;
}

/**
 * Compute linear interpolation factor t for a pixel
 * @param {number} p - The pixel coordinate (either x or y)
 * @param {number} start - Start coordinate
 * @param {number} end - End coordinate
 * @returns {number} t in [0,1]
 */
function computeTLinear(p, start, end) {
    if (start === end) return 0;
    if (p <= start) return 0;
    if (p >= end) return 1;
    return (p - start) / (end - start);
}

/**
 * Interpolates between two colors based on t
 * @param {Array<number>} colorStart 
 * @param {Array<number>} colorEnd 
 * @param {number} t 
 * @returns {Array<number>} interpolated color
 */
function interpolateColor(colorStart, colorEnd, t) {
    return [
        Math.round(colorStart[0] + (colorEnd[0] - colorStart[0]) * t),
        Math.round(colorStart[1] + (colorEnd[1] - colorStart[1]) * t),
        Math.round(colorStart[2] + (colorEnd[2] - colorStart[2]) * t),
        Math.round(colorStart[3] + (colorEnd[3] - colorStart[3]) * t)
    ];
}
