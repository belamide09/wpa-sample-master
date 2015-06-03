<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
function get_role_name_by_id($id){

 	$role_id_name = array(
	 	1 => 'coordinator',
	 	2 => 'passer',
	 	3 => 'collector',
	 	4 => 'admin'
 	);

 	return (isset($role_id_name[$id]))? $role_id_name[$id]:null;
 }