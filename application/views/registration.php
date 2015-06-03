<div class="wrap contentclass" role="document">       

  <div id="pageheader" class="titleclass">
    <div class="container">
      <div class="page-header">
        <h1 class="entry-title" itemprop="name">Registration</h1>
      </div>    
    </div>
  </div>

  <div id="content" class="container">
    <div class="row">
      <div id="main" class="main col-md-6" role="main"> 
          <h3>Fee Covers</h3>
          <u>
            <li>Congress Scientific Sessions Attendance</li>
            <li>Participation in Opening Ceremony, Welcome Cocktail and Closing Ceremony</li>
            <li>Admission to the Exhibition Area</li>
            <li>Congress bag, Congress documents, Abstracts, Final Programme and other congress materials</li>
            <li>Coffee breaks</li>
          </u>
          
        </div>

        <div class="contactformcase col-md-6">
          <h3>Register now! </h3>
          <form action="" id="contactForm" method="post">
            <div class="contactform">
              <?php $strButtonAlertExist = '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'; ?>
              <?php 
                echo validation_errors(); 
                if(!empty($message)) {
                 echo $message;
                }
              ?>
              <p>
                <label for="contactFirstName"><b>First Name:</b></label>
                <input type="text" name="contactFirstName" id="contactFirstName" value="<?php echo $first_name; ?>" class="required requiredField full" required/>
              </p>

              <p>
                <label for="contactLastName"><b>Last Name:</b></label>
                <input type="text" name="contactLastName" id="contactLastName" value="<?php echo $last_name; ?>" class="required requiredField full" required/>
              </p>

              <p>
                <label for="email"><b>Email: </b></label>
                <input type="text" name="email" id="email" value="<?php echo $email; ?>" class="required requiredField email full" required/>
              </p>

              <p>
                <label for="password"><b>Password: </b></label>
                <input type="password" name="password" id="password" value="<?php echo $password; ?>" class="required requiredField email full" required/>
              </p>

              <p>
                <label for="cpassword"><b>Confirm Password: </b></label>
                <input type="password" name="cpassword" id="cpassword" value="<?php echo $cpassword; ?>" class="required requiredField email full" required/>
              </p>

              <p>
                <label for="contactPhone"><b>Phone</b></label>
                <input type="text" name="contactPhone" id="contactPhone" value="<?php echo $phone; ?>" class="required requiredField full" required/>
              </p>
              <p>
                <label for="contactAddress"><b>Address: </b></label>
                <textarea name="contactAddress" id="contactAddress" rows="10" class="required requiredField" required><?php echo $address; ?></textarea>
              </p>
              <p>
                <input type="submit" class="kad-btn kad-btn-primary" id="submit" value="Register"></input>
              </p>
            </div><!-- /.contactform-->
   
          </form>
        </div><!--contactform-->
                      
      </div>
    </div>
  </div>