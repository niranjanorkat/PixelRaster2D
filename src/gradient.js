function isGradient(fill) {
    if (!fill || typeof fill !== "object") {
        return false;
    }

    if (fill.type === "linear" || fill.type === "radial") {
        return true; // proper Gradient object
    }

    if (Array.isArray(fill) && fill.length === 4 && fill.every(v => typeof v === "number")) {
        return false; // simple solid color [r,g,b,a]
    }

    console.error("Invalid fill format.");
    return false;
}
/**
 * Create a linear gradient object.
 * @param {Array<number>} colorStart 
 * @param {Array<number>} colorEnd 
 * @param {"x"|"y"} [axis="x"] 
 * @returns {object}
 */
function createLinearGradient(colorStart, colorEnd, axis = "x") {
    return {
        type: "linear",
        colorStart,
        colorEnd,
        axis
    };
}

/**
 * Create a radial gradient object.
 * @param {Array<number>} colorStart 
 * @param {Array<number>} colorEnd 
 * @param {Array<number>} center - [cx, cy]
 * @param {number} radius 
 * @returns {object}
 */
function createRadialGradient(colorStart, colorEnd, center, radius) {
    return {
        type: "radial",
        colorStart,
        colorEnd,
        center,
        radius
    };
}

/**
 * Compute linear interpolation factor t for a pixel.
 * @param {number} p - The pixel coordinate (either x or y).
 * @param {number} start - Start coordinate.
 * @param {number} end - End coordinate.
 * @returns {number} t in [0,1]
 */
function computeTLinear(p, start, end) {
    if (start === end) return 0;
    if (p <= start) return 0;
    if (p >= end) return 1;
    return (p - start) / (end - start);
}

/**
 * Compute radial interpolation factor t for a pixel.
 * @param {number} px - pixel x
 * @param {number} py - pixel y
 * @param {number} cx - center x
 * @param {number} cy - center y
 * @param {number} radius - maximum radius
 * @returns {number} t in [0,1]
 */
function computeTRadial(px, py, cx, cy, radius) {
    const dx = px - cx;
    const dy = py - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (radius === 0) return 0;
    return Math.min(1, distance / radius);
}

/**
 * Interpolates between two colors based on t.
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

/**
 * Compute interpolation t for a given pixel based on gradient type.
 * @param {number} px 
 * @param {number} py 
 * @param {object} gradient 
 * @param {Array<number>} bounds - [min, max] for linear; ignored for radial
 * @returns {number} t in [0,1]
 */
function computeT(px, py, gradient, bounds) {
    if (gradient.type === "linear") {
        if (gradient.axis === "y") {
            const [minY, maxY] = bounds;
            return computeTLinear(py, minY, maxY);
        } else {
            const [minX, maxX] = bounds;
            return computeTLinear(px, minX, maxX);
        }
    }

    if (gradient.type === "radial") {
        const [cx, cy] = gradient.center;
        return computeTRadial(px, py, cx, cy, gradient.radius);
    }

    console.error("Unknown gradient type:", gradient.type);
    return 0;
}