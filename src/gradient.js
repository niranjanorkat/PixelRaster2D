function isGradient(fill) {
    if (!fill || typeof fill !== "object") {
        return false;
    }

    if (fill.type === "linear" || fill.type === "radial") {
        return true;
    }

    if (Array.isArray(fill) && fill.length === 4 && fill.every(v => typeof v === "number")) {
        return false;
    }

    console.error("Invalid fill format.");
    return false;
}

function createLinearGradient(colorStart, colorEnd, axis = "x") {
    return {
        type: "linear",
        colorStart,
        colorEnd,
        axis
    };
}

function createRadialGradient(colorStart, colorEnd, center, radius) {
    return {
        type: "radial",
        colorStart,
        colorEnd,
        center,
        radius
    };
}

function computeTLinear(p, start, end) {
    if (start === end) return 0;
    if (p <= start) return 0;
    if (p >= end) return 1;
    return (p - start) / (end - start);
}

function computeTRadial(px, py, cx, cy, radius) {
    const dx = px - cx;
    const dy = py - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (radius === 0) return 0;
    return Math.min(1, distance / radius);
}

function interpolateColor(colorStart, colorEnd, t) {
    return [
        Math.round(colorStart[0] + (colorEnd[0] - colorStart[0]) * t),
        Math.round(colorStart[1] + (colorEnd[1] - colorStart[1]) * t),
        Math.round(colorStart[2] + (colorEnd[2] - colorStart[2]) * t),
        Math.round(colorStart[3] + (colorEnd[3] - colorStart[3]) * t)
    ];
}

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
