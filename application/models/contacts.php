<?php
Class Contacts extends CI_Model
{
	function addContact($data)
	{
		return $this->db->insert('contacts',$data);
	}
}