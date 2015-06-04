<link href="<?php echo base_url(); ?>contact_form/css/style.css" media="screen" rel="stylesheet" type="text/css"/>
<link href="<?php echo base_url(); ?>contact_form/css/uniform.css" media="screen" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<?php echo base_url(); ?>contact_form/js/jquery.tools.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>contact_form/js/jquery.uniform.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>contact_form/js/main.js"></script>
    
  <div class="one-half">

    <h2>Contact</h2>
    <p><strong>Secretariat</strong><br />
    www. philpsych.ph<br />
    Email: philpsych_org@yahoo.com<br />
    Telephone Number: +632.6359858 <br />
    Address: Unit 1011 Medical Plaza Bldg. San Miguel Avenue, Ortigas Center, Pasig City <br />
    Facebook: Philippine Psychiatric Association, Inc. (PPA)<br />
    Twitter: PPA Psychiatry/ @PPA_Psychiatry<br /><br />
    </p>
          
    <!-- <iframe width="465" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.no/maps?f=q&amp;source=s_q&amp;hl=no&amp;geocode=&amp;q=Hafstadvegen+35,+F%C3%B8rde&amp;aq=0&amp;oq=hafstadvegen+35&amp;sll=61.143235,9.09668&amp;sspn=17.454113,57.084961&amp;ie=UTF8&amp;hq=&amp;hnear=Hafstadvegen+35,+6800+F%C3%B8rde,+Sogn+og+Fjordane&amp;t=m&amp;z=14&amp;iwloc=A&amp;ll=61.450253,5.859145&amp;output=embed"></iframe><br /><small><a href="http://maps.google.no/maps?f=q&amp;source=embed&amp;hl=no&amp;geocode=&amp;q=Hafstadvegen+35,+F%C3%B8rde&amp;aq=0&amp;oq=hafstadvegen+35&amp;sll=61.143235,9.09668&amp;sspn=17.454113,57.084961&amp;ie=UTF8&amp;hq=&amp;hnear=Hafstadvegen+35,+6800+F%C3%B8rde,+Sogn+og+Fjordane&amp;t=m&amp;z=14&amp;iwloc=A&amp;ll=61.450253,5.859145" style="color:#0000FF;text-align:left">Enlarge Map</a></small> -->
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.3287270844394!2d121.0593961!3d14.5803351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c814e2f04cbf%3A0x6fca2a6bfede1503!2sMedical+Plaza+Bldg%2C+25+San+Miguel+Ave%2C+Ortigas+Center%2C+Pasig%2C+Metro+Manila!5e0!3m2!1sen!2sph!4v1432451782451" width="465" height="350" frameborder="0" style="border:0"></iframe>
  </div>
    
  <div class="one-half last">
   
         <h2>Send Email</h2>

          <p><?php echo $msg ?></p>

         <form action="" class="TTWForm" method="post" novalidate="">
            
          <div id="field1-container" class="field f_50">
               <label for="field1">Name</label>
               <input name="name" id="field1" required="required" type="text">
          </div>
          
          
          <div id="field2-container" class="field f_50">
               <label for="field2">Telephone</label>
               <input name="tel" id="field2" required="required" type="text">
          </div>

          <div id="field5-container" class="field f_50">
               <label for="field5">Email</label>
               <input name="email" id="field5" required="required" type="email">
          </div>
          
          
          <div id="field4-container" class="field f_100">
               <label for="field4">Message</label>
               <textarea rows="5" cols="20" name="message" id="field4" required="required"></textarea>
          </div>
          
          <div id="form-submit" class="field f_100 clearfix submit">
               <input value="Submit" type="submit">
          </div>
     </form>
     
    <!--END form ID contact_form -->
   
  </div>