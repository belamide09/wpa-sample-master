<div class="wrap contentclass" role="document">

  <div id="pageheader" class="titleclass">
    <div class="container">
      <div class="page-header">
        <h1 class="entry-title" itemprop="name">Contact Us  </h1>
      </div>    
    </div>
</div>

  <div id="content" class="container">
    <div class="row">
      <div id="main" class="main col-md-6" role="main"> 
        <div class="space_20 clearfix"></div>

          <h3>Secretariat</h3>
          <h4>www. philpsych.ph</h4>
          <p><strong>Email: </strong> philpsych_org@yahoo.com</p>
          <p><strong>Telephone Number: </strong> +632.6359858</p>
          <p><strong>Address: </strong> Unit 1011 Medical Plaza Bldg. San Miguel Avenue, Ortigas Center, Pasig City</p>
          <p><strong>Facebook: </strong> Philippine Psychiatric Association, Inc. (PPA)</p>
          <p><strong>Twitter: </strong> PPA Psychiatry/ @PPA_Psychiatry</p>
        </div>

        <div class="contactformcase col-md-6">
          <h3>Send us an Email</h3>
          <form action="" id="contactForm" method="post">
           <?php $strButtonAlertExist = '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'; ?>
              <?php 
                // echo validation_errors(); 
                if(isset($message)) {
                 echo $message;
                }
              ?>
            <div class="contactform">
              <p>
                <label for="contactName"><b>Name:</b></label>
                <input type="text" name="contactName" id="contactName" value="" class="required requiredField full" required/>
              </p>

              <p>
                <label for="email"><b>Email: </b></label>
                <input type="email" name="email" id="email" value="" class="required requiredField email full" required/>
              </p>

              <p>
                <label for="commentsText"><b>Message: </b></label>
                <textarea name="comments" id="commentsText" rows="10" class="required requiredField" required></textarea>
              </p>
              <p>
                <input type="submit" class="kad-btn kad-btn-primary" id="submit" value="Send Email"></input>
              </p>
            </div><!-- /.contactform-->
            <input type="hidden" name="submitted" id="submitted" value="true" />
          </form>
        </div><!--contactform-->
                      
      </div>
    </div>
  </div>