// const roads = [createSegment(0, 0, 4), createSegment(0, 2, 4, true)];
// roads.map((road) => createGridRoad(road));

import { value } from './grid';
import { extend, max, sum } from './util';

// const newRoads = [createSegment(0, 1, 6), createSegment(1, 2, 4, true)];
// newRoads.map((road) => createGridRoad(road, 2));

export const createRoads = (grid) => (cells) => {
	// console.log('should place roads', cells);

	cells.map(placeRoad(grid));
};

const placeRoad =
	(grid) =>
	({ x, y }) => {
		grid[y][x].data = { road: true };
	};

export const canPlaceRoad = (grid) => (cell) => {
	const { x, y } = cell;
	const s = calcNeighbours(grid)(x, y);
	grid[y][x].s = s;
	const maxs = s.reduce(max);
	const allow = maxs < 3;

	return allow;
};

export const calcNeighbours = (grid) => (i, j) => {
	const gridValue = value(grid);
	const tl = extend(i, j, -1, -1);
	const tlValue = tl.map(gridValue).reduce(sum);
	const tr = extend(i, j, 1, -1);
	const trValue = tr.map(gridValue).reduce(sum);
	const bl = extend(i, j, -1, 1);
	const blValue = bl.map(gridValue).reduce(sum);
	const br = extend(i, j, 1, 1);
	const brValue = br.map(gridValue).reduce(sum);

	return [tlValue, trValue, blValue, brValue];
};

export const createRoad =
	(grid) =>
	(roadData, v = 1) => {
		roadData.forEach(([x, y]) => {
			grid[y][x].value = v;
			const s = calcNeighbours(grid)(x, y);
			grid[y][x].s = s;
			if (v == 2) {
				const forbid = s.filter((v) => v >= 3).length;

				if (forbid) {
					grid[y][x].value = 3;
					grid[y][x].forbid = true;
				} else {
					grid[y][x].value = 2;
					grid[y][x].allow = true;
				}
			}
		});
	};
