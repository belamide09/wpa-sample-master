<h2 class="sub-header">Admin Users</h2>

<?php if($admins): ?>
<form accept-charset="utf-8" method="post" action="delete">
<div class="table-responsive">
	<table class="table table-striped">
	  <thead>
	    <tr>
	      <th><input type="checkbox" id="check-all"></th>
	      <th>Username</th>
	    </tr>
	  </thead>
	  <tbody>
	  	<?php foreach($admins as $user): ?>
	    <tr>
	      <td><input type="checkbox" name="user_<?php echo $user->id ?>"></td>
	      <td><a href="<?php echo site_url('user/edit/'.$user->id) ?>"><?php echo $user->name ?></a></td>
	    </tr>
		<?php endforeach; ?>
	  </tbody>
	</table>
</div>
<button type="submit" class="btn btn-primary">Delete Users</button>
<input type="hidden" name="return_url" value="admin">
</form>
<?php else: ?>
<a href="<?php echo base_url(); ?>user/register"><button class="btn btn-primary">Create Admin User</button></a>
<?php endif; ?>


<script type="text/javascript">
	$(document).ready(function(){
		$('#check-all').click(function () {    
		     $('input:checkbox').prop('checked', this.checked);    
		 });
	})
</script>