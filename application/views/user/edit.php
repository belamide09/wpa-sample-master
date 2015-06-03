<h2 class="form-signin-heading"><?php echo $title ?></h2>

<form class="form-signin" accept-charset="utf-8" method="post" action="login">
    <?php echo validation_errors(); ?>
    <label for="inputUsername" class="sr-only">Username</label>
    <input type="text" id="inputUsername" name="username" class="form-control" placeholder="Username" value="<?php echo $user->name ?>" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="text" id="inputPassword" name="password" class="form-control" placeholder="Password"  value="<?php echo $user->password ?>" required>
    <input type="hidden" value="<?php echo $return ?>">
    <button class="btn btn-lg btn-primary btn-block" type="submit">Update</button>
</form>