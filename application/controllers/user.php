<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {

	function __construct()
	{
		parent::__construct();

		$login_sess = $this->session->userdata('logged_in');

		if(empty($login_sess) || $login_sess['role'] != 5){
			redirect('/login', 'refresh');
		}

		$this->load->database();
		$this->load->model('users','',TRUE);
		$this->load->library('template');
	}


	public function register()
	{
		$this->load->library('form_validation');
		$collectors = $this->users->get_all_by_role(3);
		$collectorsOpt = '';
		if($collectors){
			foreach ($collectors as $colval) {
				$collectorsOpt .= '<option value="'.$colval->id.'">'.$colval->name.'</option>';
			}
		}

		$data = array(
		    'title' => 'Add new user',
		    'collectorsOpt' => $collectorsOpt
		);
		if($this->input->post('username') && $this->input->post('password') && $this->input->post('role')){
			$this->load->helper(array('form'));
			$this->load->library('form_validation');


			$this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean|callback_check_exists');
			$this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean');
			$this->form_validation->set_rules('role', 'Role', 'trim|required|xss_clean');
			$this->form_validation->set_rules('coordinator', 'Coordinator', 'trim|xss_clean|callback_require_coordinator');

			if($this->form_validation->run() == true) {

				$parent = ($this->input->post('role') == 1) ? $this->input->post('coordinator') : null;

				$user = array(
					'name' 		=> $this->input->post('username'),
					'password' 	=> $this->input->post('password'),
					'role' 		=> $this->input->post('role'),
					'parent' 	=> $parent,
					'created_at'=> date('Y-m-d H:i:s')
				);

				$this->users->save($user);

				redirect('user/'.get_role_name_by_id($this->input->post('role')), 'refresh');
			}


		}		 
		
		$this->template->load('default', 'user/register', $data);
		
	}

	function check_exists($username)
	{
		$result = $this->users->usernameExists($username);

		if($result) {
			$this->form_validation->set_message('check_exists', 'Username is not available.');
			return false;
		}
		return true;
	}

	function require_coordinator($coordinator)
	{
		$role = $this->input->post('role');
		if($role == 1 && empty($coordinator)) {
			$this->form_validation->set_message('require_coordinator', 'Must select a coordinator');
			return false;
		}
		return true;
	}

	function admin()
	{
		$data = array(
		    'title' => 'Admins',
		    'admins'	=> $this->users->get_all_by_role(4)
		);
		$this->template->load('default', 'user/admin', $data);
	}

	function passer()
	{
		$data = array(
		    'title' => 'Passers',
		    'passers'	=> $this->users->get_all_by_role(2)
		);
		$this->template->load('default', 'user/passer', $data);
	}

	function collector()
	{
		$data = array(
		    'title' => 'Passers',
		    'collectors'	=> $this->users->get_all_by_role(3)
		);
		$this->template->load('default', 'user/collector', $data);
	}

	function coordinator()
	{
		$data = array(
		    'title' => 'Passers',
		    'coordinators'	=> $this->users->get_all_by_role(1)
		);
		$this->template->load('default', 'user/coordinator', $data);
	}

	function edit($id)
	{	
		if(empty($id)) 
			redirect('/', 'refresh');

		$user = $this->users->getUser($id);

		if(!$user)
			redirect('/', 'refresh');

		$data = array(
		    'title' 	=> 'Edit User',
		    'user'		=> $user,
		    'return' 	=> $this->input->get('utype', true)
		);

		if($this->input->post('username')){
			echo 'hear';
			exit;
		}

		$this->load->library('form_validation');
		
		$this->template->load('default', 'user/edit', $data);
	}

	public function delete()
	{
		foreach ($_POST  as $str_name => $val) {
			$ids = str_replace('user_', '', $str_name);
			if(is_numeric($ids)){
				$id = str_replace('user_', '', $str_name);
				$user_ids[] = array( 
					'id' => $id, 
					'status' => 2
				);
				$childs = $this->users->getCoordinatorIds($id);
				if($childs){
					foreach ($childs as $val) {
						$user_ids[] = array( 
							'id' => $val->id, 
							'status' => 2
						);
					}
				}
			}
		}
		if(!empty($user_ids)){
			$this->users->delete($user_ids);
		}

		redirect('user/'.$this->input->post('return_url'),'refresh');
	}

}
