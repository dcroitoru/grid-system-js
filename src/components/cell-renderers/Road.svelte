<script>
	export let data;

	$: ({ road, allow, forbid } = data);
</script>

<div class="container" class:road class:road-allow={allow} class:road-forbid={forbid}>road</div>

<style>
	.container {
		display: grid;
		place-items: center;
	}
	.road {
		background-color: #18ab8d;
	}

	.road-allow {
		background-color: #b4b2f1;
	}

	.road-forbid {
		background-color: #ec6d6d;
	}

	.value {
		display: grid;
		place-items: center;
	}

	.tl,
	.tr,
	.bl,
	.br {
		position: absolute;
		color: #eee;
		background-color: #888;
		padding: 2px;
	}

	.tl,
	.tr {
		top: 0;
	}

	.bl,
	.br {
		bottom: 0;
	}

	.tl,
	.bl {
		left: 0;
	}

	.tr,
	.br {
		right: 0;
	}
</style>
