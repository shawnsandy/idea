<riot-example>

	<div>
		<h1>
			Riot example..
		</h1>
	</div>


	<style>
		:scope {
			font-size: 24px;
		}
	</style>

	<script>
		this.on('mount', function () {
			console.log(this.root, "Loaded");
		})
	</script>

</riot-example>
