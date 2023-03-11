<script>
	import { onMount } from 'svelte';
	import Cell from './Cell.svelte';
	import { clearGrid, createGrid, createRect } from './grid';
	import { canPlaceRoad } from './roads';
	import { max } from './util';

	const w = 10;
	const h = 10;

	let grid = createGrid(w, h);
	let startCell, endCell;

	let ghostRoads = [];

	grid[0][0].data = { road: true };

	const createGhostRoadData = (cell) => {
		const { x, y, data, id } = cell;
		if (canPlaceRoad(cell)) {
			return {
				...data,
				allow: true,
				forbid: false
			};
		} else {
			return {
				...data,
				allow: true,
				forbid: false
			};
		}

		// ghostRoads.push(cell);

		// grid = [...grid];
	};

	const clearGhostRoads = () => {
		ghostRoads.map(({ x, y, data }) => {
			console.log(x, y, data);
			if (data?.road) {
				grid[y][x].data = { road: true };
			} else {
				grid[y][x].data = null;
			}
		});
		ghostRoads = [];
		// grid.map((row) =>
		// 	row.map((cell) => {
		// 		const { x, y, data } = cell;
		// 		grid[y][x].data = { ...data, allow: false, forbid: false };
		// 	})
		// );
	};

	const onOver = (cell) => {
		endCell = cell;

		if (startCell) {
			clearGhostRoads();
			const rect = createRect(startCell, endCell);

			rect.map(([x, y]) => {
				grid[y][x].data = { allow: true };
				ghostRoads.push(grid[y][x]);
			});
		} else {
			const { x, y } = cell;
			grid[y][x].data = { allow: true };
			ghostRoads.push(cell);
		}
	};

	const onOut = (cell) => {
		// clearGhostRoads();
		if (startCell) {
		} else {
			clearGhostRoads();
		}
	};

	const onStart = (cell) => {
		startCell = cell;

		console.log('startdrag', cell);
	};

	const onEnd = () => {
		if (!startCell || !endCell) return;

		console.log('enddrag', endCell);

		const rect = createRect(startCell, endCell);

		rect.map(([x, y]) => {
			grid[y][x].data = { road: true };
		});

		// if (canPlaceRoad(cell)) {
		// 	const interval = createInterval(startCell.x, endCell.x);
		// 	const segment = createSegmentX(interval, startCell.y);
		// 	segment.map(([x, y]) => {
		// 		grid[y][x].road = true;
		// 	});
		// }

		clearGhostRoads();

		startCell = null;
		endCell = null;
	};

	onMount(() => {
		window.addEventListener('mouseup', onEnd);
	});

	const onClearGrid = () => {
		grid = [...clearGrid(grid)];
	};
</script>

<div class="grid">
	{#each grid as row}
		{#each row as cell}
			<Cell
				{cell}
				on:over-cell={() => onOver(cell)}
				on:out-cell={() => onOut(cell)}
				on:start-cell={() => onStart(cell)}
			/>
		{/each}
	{/each}
</div>

<button on:click={() => onClearGrid()}>Clear</button>

<style>
	:root {
		--cell-size: 70px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(10, var(--cell-size));
		grid-template-rows: repeat(10, var(--cell-size));
		column-gap: 2px;
		row-gap: 2px;
	}
</style>
