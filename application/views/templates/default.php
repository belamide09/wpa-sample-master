<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en-US"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang="en-US"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <title>WPA 2016</title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" type="image/x-icon" href="<?php echo base_url(); ?>img/favicon.ico" />
  <link rel='stylesheet' href="<?php echo base_url(); ?>css/vstyle.css" type="text/css" media="all" />
  <link rel='stylesheet' href="<?php echo base_url(); ?>css/skin_default.css" type="text/css" media="all" />
  <link rel='stylesheet' id='redux-google-fonts-virtue-css'  href='http://fonts.googleapis.com/css?family=Pacifico%3A400%7CLato%3A700%2C400%2C300&#038;subset=latin&#038;ver=1431668325' type='text/css' media='all' />
  <script type='text/javascript' src='<?php echo base_url(); ?>js/jquery.js'></script>
  <link rel='stylesheet' href="<?php echo base_url(); ?>css/dynamic.css" type="text/css" media="all" />
  <link rel='stylesheet' href="<?php echo base_url(); ?>css/blessed.css" type="text/css" media="all" />
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">



</head>
<body class="home page page-id-22 page-template-default wide">
  <div id="wrapper" class="container">

      <header class="banner headerclass" role="banner">

        <section id="topbar" class="topclass">
          <div class="container">
            <div class="row">

              <div class="col-md-6 col-sm-6 kad-topbar-left">
                <div class="topbarmenu clearfix">
                  <ul id="menu-topmenu1" class="sf-menu">
                    <li  class="menu-premium-demo menu-item-01"><a href="<?php echo base_url(); ?>">Home</a></li>
                    <li  class="menu-my-account menu-item-02"><a href="<?php echo base_url(); ?>registration">Registration</a></li>
                    <li  class="menu-my-account menu-item-03"><a href="<?php echo base_url(); ?>contact">Contact Us</a></li>
                  </ul>   
                </div>
              </div><!-- close col-md-6 --> 
              <div class="col-md-6 col-sm-6 kad-topbar-right">
                <div class="topbarmenu clearfix">
                  <ul id="menu-topmenu1" class="sf-menu">
                    <?php if($this->session->userdata('logged_in')) {?>
                    <li class="menu-my-account menu-item-03 pull-right"><a href="<?php echo base_url(); ?>logout">Logout</a></li>
                    <?php } else { ?>
                    <li class="menu-my-account menu-item-03 pull-right"><a href="<?php echo base_url(); ?>login">Login</a></li>
                   <?php } ;?>
                  </ul>
                </div>
              </div>

              <div class="col-md-6 col-sm-6 kad-topbar-right">
                <!-- <div id="topbar-search" class="topbar-widget">
                  <form role="search" method="get" id="searchform" class="form-search" action="">
                    <label class="hide" for="s">Search for:</label>
                    <input type="text" value="" name="s" id="s" class="search-query" placeholder="Search">
                    <button type="submit" id="searchsubmit" class="search-icon"><i class="icon-search"></i></button>
                  </form>        
                </div> -->
              </div> <!-- close col-md-6-->

            </div> <!-- Close Row -->
          </div> <!-- Close Container -->
        </section>

      <div class="container">
        <div class="row">
          <div class="col-md-2 clearfix kad-header-left" style="padding-top: 12px">
              <div id="logo" class="logocase">
                <a class="brand logofont" href="<?php echo base_url(); ?>">
                    <div id="thelogo">
                      <img src="<?php echo base_url(); ?>img/logo.png" alt="WPA 2016" class="kad-standard-logo" />
                    </div>
                </a>
              </div> <!-- Close #logo -->
          </div><!-- close logo span -->
                      
          <div class="col-md-10 kad-header-right">
            <nav id="nav-main" class="clearfix" role="navigation">
              <ul id="menu-mainmenu1" class="sf-menu">

                <li  class="menu-home current-menu-item current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor sf-dropdown menu-item-60"><a href="<?php echo base_url(); ?>">HOME</a></li>

                <li  class="menu-home current-menu-item sf-dropdown menu-item-11">
                  <a href="<?php echo base_url(); ?>congress">CONGRESS INFORMATION</a>
                  <ul class="sf-dropdown-menu">
                    <li  class="menu-style-one menu-item-12"><a href="<?php echo base_url(); ?>committees">Committees</a></li>
                    <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>venue">Venue</a></li>
                    <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>contact">Contact Us</a></li>
                  </ul>
                </li>

                <li  class="menu-shop menu-item-61">
                  <a href="<?php echo base_url(); ?>registration">REGISTRATION</a>
                  <ul class="sf-dropdown-menu">
                    <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>credit_card">Credit Card Payments</a></li>
                    <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>refund_policy">Refund Policy</a></li>
                  </ul>
                </li>

                <li  class="menu-portfolio menu-item-59"><a href="<?php echo base_url(); ?>programme">PROGRAMME</a></li>
                
                <li  class="menu-shop menu-item-61">
                  <a href="<?php echo base_url(); ?>accommodation">HOTEL AND TRAVEL</a>
                  <ul class="sf-dropdown-menu">
                    <li  class="menu-style-one menu-item-12"><a href="<?php echo base_url(); ?>travel_agency">Appointed Travel Agency</a></li>
                    <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>alt_accommodation">Alternative Accommodations</a></li>
                    <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>optional_tour">Optional Tours</a></li>
                  </ul>
                </li>

                <li  class="menu-download sf-dropdown menu-item-276"><a href="#">CONTACT PERSON</a>
              </ul>           
            </nav> 
          </div> <!-- Close menuclass-->
                     
        </div> <!-- Close Row -->

          <div id="mobile-nav-trigger" class="nav-trigger">
            <button class="nav-trigger-case mobileclass collapsed" data-toggle="collapse" data-target=".kad-nav-collapse">
                <span class="kad-navbtn"><i class="icon-reorder"></i></span>
                <span class="kad-menu-name">Menu</span>
            </button>
          </div>

          <div id="kad-mobile-nav" class="kad-mobile-nav">
              <div class="kad-nav-inner mobileclass">
                <div class="kad-nav-collapse">
                    <ul id="menu-mainmenu1-1" class="kad-mnav">
                      <li  class="menu-home current-menu-item current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor sf-dropdown menu-item-60">
                        <a href="<?php echo base_url(); ?>">HOME</a>
                      </li>

                      <li  class="menu-home sf-dropdown menu-item-11">
                        <a href="<?php echo base_url(); ?>congress">CONGRESS INFORMATION</a>
                        <ul class="sf-dropdown-menu">
                          <li  class="menu-style-one menu-item-12"><a href="<?php echo base_url(); ?>committees">Committees</a></li>
                          <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>venue">Venue</a></li>
                          <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>contact">Contact Us</a></li>
                        </ul>
                      </li>
                      <li  class="menu-shop menu-item-61">
                        <a href="<?php echo base_url(); ?>registration">REGISTRATION</a>
                        <ul class="sf-dropdown-menu">
                          <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>credit_card">Credit Card Payments</a></li>
                          <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>refund_policy">Refund Policy</a></li>
                        </ul>
                      </li>

                      <li  class="menu-portfolio menu-item-59"><a href="<?php echo base_url(); ?>programme">PROGRAMME</a></li>
                      
                      <li  class="menu-shop menu-item-61">
                        <a href="<?php echo base_url(); ?>accommodation">HOTEL AND TRAVEL</a>
                        <ul class="sf-dropdown-menu">
                          <li  class="menu-style-one menu-item-12"><a href="<?php echo base_url(); ?>travel_agency">Appointed Travel Agency</a></li>
                          <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>alt_accommodation">Alternative Accommodations</a></li>
                          <li  class="menu-style-two menu-item-13"><a href="<?php echo base_url(); ?>optional_tour">Optional Tours</a></li>
                        </ul>
                      </li>

                      <li  class="menu-download sf-dropdown menu-item-276"><a href="#">CONTACT PERSON</a>
                  
                    </ul>               
                </div>
            </div>
          </div>   
      </div> <!-- Close Container --> 
      </header>

      <?php echo $body; ?>

      <footer id="containerfooter" class="footerclass" role="contentinfo">
        <div class="container">
          <div class="row">
       
            <div class="col-md-3 col-sm-6 footercol1">
              <div class="widget-1 widget-first footer-widget">
                <aside id="text-3" class="widget widget_text">
                  <h3></h3>      
                  <div class="textwidget"></div>
                </aside>
              </div>          
            </div> 
                       
            <div class="col-md-3  col-sm-6 footercol2">
              
              <div class="widget-1 widget-first footer-widget">
                <aside id="widget_kadence_contact-2" class="widget widget_kadence_contact">
                  <h3>Contact Us</h3>    
                  <div class="vcard">
                    <p class="tel"><i class="icon-tablet"></i> +632.6359858</p>            
                    <p><a class="email" href="mailto:philpsych_org@yahoo.com"><i class="icon-envelope"></i> philpsych_org@yahoo.com</a></p>     
                  </div>
                </aside>
              </div>

              <div class="widget-2 widget-last footer-widget">
                <aside id="widget_kadence_social-2" class="widget widget_kadence_social">

                </aside>
              </div>

            </div> 
                         
            <div class="col-md-3 col-sm-6 footercol3">
              <div class="widget-1 widget-first footer-widget">
                <aside id="kadence_image_grid-3" class="widget kadence_image_grid">        

                  <div class="clearfix"></div>
                </aside>
              </div>        
            </div> 
                       
            <div class="col-md-3 col-sm-6 footercol4">
              <div class="widget-1 widget-first footer-widget">
                <aside id="nav_menu-2" class="widget widget_nav_menu">
      
                </aside>
              </div>         
            </div> 
          </div>

          <div class="footercredits clearfix">
        
            <div class="footernav clearfix">
              <ul id="menu-resources-1" class="footermenu">
                <li  class="menu-home current-menu-item current_page_item menu-item-229"><a href="<?php echo base_url(); ?>">Home</a></li>
                <li  class="menu-cart menu-item-230"><a href="<?php echo base_url(); ?>registration">Registration</a></li>
                <li  class="menu-contact-us menu-item-231"><a href="<?php echo base_url(); ?>contact">Contact Us</a></li>
              </ul>
            </div>         

            <p>&copy; 2015 All Rights Reserved </p>
          </div>

        </div>

      </footer>


    <script type='text/javascript' src='<?php echo base_url(); ?>js/plugins-min.js'></script>
    <script type='text/javascript' src='<?php echo base_url(); ?>js/main.js'></script>

    </div><!--Wrapper-->
  </body>
</html>