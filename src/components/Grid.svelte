<script>
	import { onMount } from 'svelte';

	import { drawGrid, setContext, worldToGrid } from './canvas';
	import { createGrid, createRect } from './grid';
	import { createRoads } from './roads';
	import { toXY } from '../grid-system/util';

	let canvas;
	let context;
	let grid;

	let startCell, currentCell;
	let dragActive = false;

	const canvasSize = 700;
	const cellSize = 70;
	const gridSize = 10;

	onMount(() => {
		context = canvas.getContext('2d');
		setContext(context, canvasSize, gridSize, cellSize);

		grid = createGrid(gridSize, gridSize);
		drawGrid(grid);
	});

	const highlightedSet = new Set();
	const gridSet = new Set();
	let highlighted = [];

	const draw = () => {
		drawGrid(grid);
	};

	const onMouseMove = (event) => {
		const pos = worldToGrid(event);

		// if (!startCell) {
		// 	clearHighlighted();
		// }

		if (pos) {
			pos && onCellEnter(pos);

			// console.log('should clear highlight ');
			// highlighted.filter(posEqual).map(onCellExit);
		} else {
		}
	};

	const onMouseDown = (event) => {
		const { x, y } = worldToGrid(event);

		startCell = grid[y][x];
		dragActive = true;

		// grid[y][x].data = { road: true };

		// draw();
	};

	const onMouseUp = (event) => {
		if (dragActive) {
			console.log('should create selection area', startCell, currentCell);

			createRoads(grid)(highlighted);
			clearHighlighted();
			draw();

			dragActive = false;
			startCell = null;
			currentCell = null;
		}
	};

	const onMouseLeave = (event) => {
		currentCell && unhighlightCell(currentCell);

		currentCell = null;

		draw();
	};

	const clearHighlighted = () => {
		highlighted.map(unhighlightCell);

		highlighted = [];

		console.log(grid);
	};

	const unhighlightCell = ({ x, y }) => {
		if (!grid[y][x].data?.allow) return;
		grid[y][x].data = {
			...grid[y][x].data,
			allow: false
		};
		highlightedSet.delete(grid[y][x].id);
	};

	const highlightCell = ({ x, y }) => {
		if (grid[y][x].data?.allow) return;
		grid[y][x].data = {
			...grid[y][x].data,
			allow: true
		};
		highlightedSet.add(grid[y][x].id);
	};

	const onCellEnter = (cell) => {
		if (currentCell?.x == cell.x && currentCell?.y == cell.y) return;

		if (dragActive) {
			const rect = createRect(startCell, cell);
			highlighted.map(unhighlightCell);
			highlighted = rect.map(toXY);
			highlighted.map(highlightCell);
			draw();
		} else {
			if (currentCell) {
				unhighlightCell(currentCell);
			}

			highlightCell(cell);
		}
		currentCell = cell;

		draw();
	};

	const onCellExit = (cell) => {};
</script>

<canvas
	bind:this={canvas}
	width={canvasSize}
	height={canvasSize}
	style="width: {canvasSize}px; height: {canvasSize}px;"
	on:mousemove={(e) => onMouseMove(e)}
	on:mousedown={(e) => onMouseDown(e)}
	on:mouseup={(e) => onMouseUp(e)}
	on:mouseleave={(e) => onMouseLeave(e)}
/>
