<?php
Class Customers extends CI_Model
{
	public function register($data) {
		$success = false;
		if($this->db->insert('registered_fees',$data)) {
			$success = $this->db->insert_id();
		}
		return $success;
	}
}