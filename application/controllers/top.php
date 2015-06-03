<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if(!isset($_SESSION)){
	session_start();
}

class Top extends CI_Controller {

	function __construct()
	{
		parent::__construct();

		$this->load->database();
		$this->load->library('template');

		if(!$this->session->userdata('logged_in')){
			//redirect('/login', 'refresh');
		}
	}

	public function index()
	{
		$data = array(
		    'title' => 'CodeIgniter this is it',
		);
		 

		$this->template->load('default', 'index', $data);
	}

	public function registration()
	{
		$data = array(
			    'first_name' => '',
			    'last_name' => '',
			    'email' => '',
			    'password' => '',
			    'cpassword' => '',
			    'phone' => '',
			    'address' => ''
			);
		$message = "";
		$this->load->library('form_validation');

		if($this->input->post('contactFirstName')) {
			$this->form_validation->set_rules('contactFirstName', 'First Name', 'trim|required|xss_clean');
			$this->form_validation->set_rules('contactLastName', 'Last Name', 'trim|required|xss_clean');
			$this->form_validation->set_rules('email', 'Email Address', 'unique,trim|required|xss_clean|regex_match[/^\S+@\S+\.\S+$/]');
			$this->form_validation->set_rules('contactPhone', 'Phone', 'trim|required|xss_clean|regex_match[/[0-9]{6,}/]');
			$this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean');
			$this->form_validation->set_rules('cpassword', 'Confirm Password', 'trim|required|xss_clean');
			$this->load->model('users','',TRUE);
			$data = array(
						'first_name' => $this->input->post('contactFirstName'),
						'last_name' => $this->input->post('contactLastName'),
						'email' => $this->input->post('email'),
						'password' => md5($this->input->post('password')),
						'phone' => $this->input->post('contactPhone'),
						'address' => $this->input->post('contactAddress')
					);
			if($this->form_validation->run() == true) {
				if(!$this->users->emailExists($this->input->post('email'))) {
					if($this->users->registerVisitor($data)) {
						$data = array(
								    'first_name' => '',
								    'last_name' => '',
								    'email' => '',
								    'password' => '',
								    'cpassword' => '',
								    'phone' => '',
								    'address' => ''
								);
						$message = 'You have successfully register';
					} else {
						$message = 'Failed to register. Kindly try again.';			
						$data['password'] = $this->input->post('password');
						$data['cpassword'] = $this->input->post('cpassword');
					}
				} else {
					$message = 'Email is already use';				
					$data['password'] = $this->input->post('password');
					$data['cpassword'] = $this->input->post('cpassword');
				}
			} else {
				$data['password'] = $this->input->post('password');
				$data['cpassword'] = $this->input->post('cpassword');
			}

		}
		$data['message'] = $message;
		$data['title'] = 'Registration';
		$this->template->load('default', 'registration', $data);
	}

	public function contact()
	{
		$this->load->library('form_validation');
		if($this->input->post('contactName')) {
			$this->load->model('contacts','',TRUE);		

			$data = array(
				'contactName' => $this->input->post('contactName'),
				'email' => $this->input->post('email'),
				'messages' => $this->input->post('comments')
			);

			$this->form_validation->set_rules('contactName', 'Contact Name', 'trim|required|xss_clean');
			$this->form_validation->set_rules('email', 'Email Address', 'trim|required|xss_clean|regex_match[/^\S+@\S+\.\S+$/]');
			$this->form_validation->set_rules('comments', 'Message', 'trim|required|xss_clean');

			if($this->form_validation->run() == true) {
				if($this->contacts->addContact($data)) {
					$data['message'] = 'You have successfully register';
				} else {
					$data['message'] = 'Failed to register. Kindly try again.';
				}
			} else {
				$data['message'] = validation_errors();
			}
		}
		$data['title'] = 'Contact Us';
		$this->template->load('default', 'contact', $data);
	}

	public function congress()
	{
		$data = array(
		    'title' => "Congress Information ",
		);
		$this->template->load('default', 'congress', $data);
	}

	public function committees()
	{
		$data = array(
		    'title' => "Committees",
		);
		$this->template->load('default', 'committees', $data);
	}

	public function credit_card()
	{
		$data = array(
		    'title' => "Credit Card Payments",
		);
		$this->template->load('default', 'credit_card', $data);
	}

	public function refund_policy()
	{
		$data = array(
		    'title' => "Refund Policy",
		);
		$this->template->load('default', 'refund_policy', $data);
	}

	public function programme()
	{
		$data = array(
		    'title' => "Programme",
		);
		$this->template->load('default', 'programme', $data);
	}

	public function about_philippines()
	{
		$data = array(
		    'title' => "It's More Fun in the Philippines",
		);
		$this->template->load('default', 'about_philippines', $data);
	}

	public function logout()
	{
		$this->session->unset_userdata('logged_in');
		session_destroy();
		header('location: '.$this->config->config['base_url']);
	}

}
