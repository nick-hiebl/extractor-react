export class Canvas {
	element: HTMLCanvasElement | OffscreenCanvas;
	ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

	private constructor(canvas: HTMLCanvasElement | OffscreenCanvas) {
		this.element = canvas;

		const ctx = canvas.getContext('2d' as const);

		if (!ctx) {
			throw new Error('Could not get 2d rendering context for canvas.');
		}

		this.ctx = ctx as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
	}

	get width() {
		return this.element.width;
	}

	get height() {
		return this.element.height;
	}

	static fromId(id: string): Canvas {
		const canvas = document.getElementById(id);

		if (!canvas) {
			throw new Error(`Could not find specified canvas with id: ${id}`);
		}

		return new Canvas(canvas as HTMLCanvasElement);
	}

	static create(width: number, height: number): Canvas {
		const canvas = new OffscreenCanvas(width, height);

		return new Canvas(canvas);
	}
}
