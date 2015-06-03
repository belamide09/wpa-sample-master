<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

	function __construct()
	{
		parent::__construct();

		if($this->session->userdata('logged_in')){
			redirect('/', 'refresh');
		}

		$this->load->database();
		$this->load->library('template');
		$this->load->helper(array('form'));
	}


	public function index()
	{
		$data = array(
		    'title' => 'Sign in',
		);

		$data['username'] = '';
		$data['password'] = '';
		$this->load->library('form_validation');
		
		if($this->input->post('username')){
			$this->load->model('users','',TRUE);

			$this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
			$this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|callback_check_database');
			$data['username'] = $this->input->post('username');
			$data['password'] = $this->input->post('password');			

			if($this->form_validation->run() == true) {
				redirect('/', 'refresh');
			}
		}		 
		
		$this->template->load('plain', 'login', $data);
		
	}

	function check_database($password)
	{
		$username = $this->input->post('username');
		$result = $this->users->login($username, $password);

		if($result) {
			$sess_array = array();
			foreach($result as $row) {

				$sess_array = array(
				'id' => $row->id,
				'role' => $row->role,
				'username' => $row->name,
				'type' => 'personel'
				);
				$this->session->set_userdata('logged_in', $sess_array);
			}
			return true;
		}else {
			$loginVisitor = $this->users->loginVisitor($username,$password);
			if($loginVisitor) {
				$loginVisitor = $loginVisitor[0];
				$sess_array = array(
					'id' => $loginVisitor->id,
					'role' => 0,
					'username' => $loginVisitor->email,
					'type' => 'visitor'
					);
				$this->session->set_userdata('logged_in', $sess_array);
				return true;
			} else {
				$this->form_validation->set_message('check_database', 'Invalid username or password');
				return false;
			}	
		}
	}


}
