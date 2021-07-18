class Utils {
	constructor () {

	}
	static getRandomFloat (min, max) {
		return Math.random() * (max - min) + min;
	}
	static getRandomInt (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	static getRandomBool () {
		return Math.floor(Math.random() * 2) === 1;
	}
	static getRandomItem (arr) {
		return arr[Utils.getRandomInt(0, arr.length - 1)];
	}
	static formatNumberWithCommas (x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}
	static distanceToPointSquare (v, w) {
		return (v.x - w.x) * (v.x - w.x) + (v.y - w.y) * (v.y - w.y)
	}
	static distanceToSegmentSquare (p, v, w) {
		const closestPointInSegment = this.closestPointInSegment(p, v, w)
		return this.distanceToPointSquare(p, closestPointInSegment)
	}
	static closestPointInSegment (p, v, w) {
		const lineSegmentLength = this.distanceToPointSquare(v, w)
		if (lineSegmentLength === 0) return v
		const t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / lineSegmentLength
		if (t < 0) return v
		if (t > 1) return w
		return {
			x: v.x + t * (w.x - v.x), 
			y: v.y + t * (w.y - v.y)
		}
	}
	static distanceBetweenSegmentsSquare (c1, p1, c2, p2) {
		return Math.min(
			Utils.distanceToSegmentSquare(c1, c2, p2),
			Utils.distanceToSegmentSquare(p1, c2, p2),
			Utils.distanceToSegmentSquare(c2, c1, p1),
			Utils.distanceToSegmentSquare(p2, c1, p1)
		)
	}
	static getWeightedAverage (valueA, weightA, valueB, weightB) {
		return (valueA * weightA + valueB * weightB) / (weightA + weightB)
	}

	static closestIntersection(cx, cy, radius, lineStart, lineEnd) {
		let intersections = Utils.findLineCircleIntersections(cx, cy, radius, lineStart, lineEnd);
		const n = intersections[0],
			intersection1 = intersections[1],
			intersection2 = intersections[2],
			t1 = intersections[3],
			t2 = intersections[4]


	    if (n === 1)
	        return [intersection1, t1]; // one intersection

	    if (n === 2) {
	        let dist1 = Utils.distance(intersection1, lineStart);
	        let dist2 = Utils.distance(intersection2, lineStart);

	        if (dist1 < dist2)
	            return [intersection1, t1];
	        else
	            return [intersection2, t2];
	    }

	    return false; // no intersections at all
	}

	static distance(p1, p2) {
	    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
	}

	// Find the points of intersection.
	static findLineCircleIntersections (cx, cy, radius, point1, point2) {
		let n;
	    let dx, dy, A, B, C, det, t1, t2;
	    let intersection1, intersection2;

	    dx = point2.x - point1.x;
	    dy = point2.y - point1.y;

	    A = dx * dx + dy * dy;
	    B = 2 * (dx * (point1.x - cx) + dy * (point1.y - cy));
	    C = (point1.x - cx) * (point1.x - cx) + (point1.y - cy) * (point1.y - cy) - radius * radius;

	    det = B * B - 4 * A * C;
	    if ((A <= 0.0000001) || (det < 0)) {
	        // No real solutions.
	        intersection1 = null;
	        intersection2 = null;
	        n = 0
	    } else if (det === 0) {
	        // One solution.
	        t1 = -B / (2 * A);
	        intersection1 = new Point(point1.x + t1 * dx, point1.y + t1 * dy);
	        intersection2 = null;
	        n = 1
	    } else {
	        // Two solutions.
	        t1 = ((-B + Math.sqrt(det)) / (2 * A));
	        intersection1 = new Point(point1.x + t1 * dx, point1.y + t1 * dy);
	        t2 = ((-B - Math.sqrt(det)) / (2 * A));
	        intersection2 = new Point(point1.x + t2 * dx, point1.y + t2 * dy);
	        n = 2
	    }
	    return [n, intersection1, intersection2, t1, t2];
	}
}