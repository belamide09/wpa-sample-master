
<form class="form-signin" accept-charset="utf-8" method="post" action="login">
	<?php $strButtonAlertExist = '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'; ?>
	<?php 
		if(validation_errors())
			echo '<div class="alert alert-danger" role="alert">' . $strButtonAlertExist .validation_errors().'</div>'; 
	?>
    <h2 class="form-signin-heading">Sign in</h2>
    <label for="inputUsername" class="sr-only">Username</label>
    <input type="text" id="inputUsername" name="username" class="form-control" placeholder="Username or Email" value="<?php echo $username; ?>" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" value="<?php echo $password; ?>" required>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
</form>