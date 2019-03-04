<template>
	<div class="loading-box">
		<div class="bar"></div>
	</div>
</template>

<script>
	export default {
		name: 'Loading',
		data() {
			return {};
		},
	};
</script>

<style scoped>
	.loading-box{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background-color: rgba(255, 255, 255, .5);
	}

	/* Loading bar */
	.loading-box .bar{
		width: 300px;
		height: 20px;
		background-color: #00d1b2;
		border-radius: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: LoadingBar infinite 2s;
	}

	/* Animate the loading bar */
	@keyframes LoadingBar{
		from{
			width: 0;
		}

		to{
			width: 300px
		}
	}
</style>
