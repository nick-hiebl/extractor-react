export class Vector {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	static zero() {
		return new Vector(0, 0);
	}

	add(other: Vector) {
		return new Vector(this.x + other.x, this.y + other.y);
	}

	sub(other: Vector) {
		return new Vector(this.x - other.x, this.y - other.y);
	}

	scale(factor: number) {
		return new Vector(this.x * factor, this.y * factor);
	}

	magnitude() {
		return Math.hypot(this.x, this.y);
	}
}