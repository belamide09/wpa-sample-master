<?php echo validation_errors(); ?>

<form class="form-user-register" accept-charset="utf-8" method="post">
	<div class="form-group">
		<label for="inputUsername">Username</label>
		<input type="text" name="username" class="form-control" id="inputUsername" placeholder="Username" requried autofocus>
	</div>

	<div class="form-group">
		<label for="inputPassword">Password</label>
		<input type="text" name="password" class="form-control" id="inputPassword" placeholder="Password"  requried autofocus>
	</div>

	<div class="form-group">
		<label for="selectRole">Role</label>
		<select name="role" class="form-control" id="selectRole">
	        <option value="1">Coordinator</option>
	        <option value="2">Passer</option>
	        <option value="3">Collector</option>
	        <option value="4">Admin</option>
      </select>
	</div>

	<div class="form-group" id="selectCollectorBlock">
		<label for="selectCollector">Collector</label>
		<select name="coordinator" class="form-control" id="selectCollector">
	        <option value=""></option>
	        <?php echo $collectorsOpt ?>
      </select>
	</div>

	<button type="submit" class="btn btn-primary">Register</button>
</form>

<script>
$(document).ready(function(){
	$('#selectRole').on('change', function(){
		if(this.value == 1){
			$('#selectCollectorBlock').show();
		}else{
			$('#selectCollectorBlock').hide();
		}
	});
});
</script>

