<h1>WPA REGISTRATION RATES</h1>
<div class="two-third">
  <span style="font-size:18px; color:#2d5c88;">Delegates, Students and other Professionals</span>
<br>
<p>Attending all Congress Scientific Sessions<br>
  Participation in Opening Ceremony, Welcome Cocktail and Closing Ceremonies<br>
  Admission to Exhibit Area<br>
  Congress bag, Congress Documents, Abstract, Final Programme and other congress materials<br>
  Coffee Breaks
</p>
</div>
<div class="one-third last">
  <img src="https://www.paypalobjects.com/webstatic/mktg/logo/PP_AcceptanceMarkTray-NoDiscover_243x40.png" alt="Buy now with PayPal" />
</div>


<table border="0" class="rate_list">
    <th width="40%">REGISTRATION FEES <br><span>WPA Philippines 2016</span></th>
    <th width="20%">EARLY BIRD FEE <br><span>Until Nov 2015</span></th>
    <th width="20%">ADVANCE FEE <br><span>Nov 2015 - Feb 2016</span></th>
    <th width="20%">ONSITE FEE <br><span>Feb 2016 Onwards</span></th>
  <tr>
    <td>Psychiatrist/Physician from Group A Country</td>
    <td onClick="func_submit('1')"><?php echo $rates[1] ?></td>
    <td onClick="func_submit('2')"><?php echo $rates[2] ?></td>
    <td onClick="func_submit('3')"><?php echo $rates[3] ?></td>
  </tr>
  <tr>
    <td>Psychiatrist/Physician from Group B Country</td>
    <td onClick="func_submit('4')"><?php echo $rates[4] ?></td>
    <td onClick="func_submit('5')"><?php echo $rates[5] ?></td>
    <td onClick="func_submit('6')"><?php echo $rates[6] ?></td>
  </tr>
  <tr>
    <td>Psychiatrist/Physician from Group C Country</td>
    <td onClick="func_submit('7')"><?php echo $rates[7] ?></td>
    <td onClick="func_submit('8')"><?php echo $rates[8] ?></td>
    <td onClick="func_submit('9')"><?php echo $rates[9] ?></td>
  </tr>
  <tr>
    <td>Psychiatrist/Physician from Group D Country</td>
    <td onClick="func_submit('10')"><?php echo $rates[10] ?></td>
    <td onClick="func_submit('11')"><?php echo $rates[11] ?></td>
    <td onClick="func_submit('12')"><?php echo $rates[12] ?></td>
  </tr>
  <tr>
    <td>PPA Member (In good Standing)</td>
    <td onClick="func_submit('13')"><?php echo $rates[13] ?></td>
    <td onClick="func_submit('14')"><?php echo $rates[14] ?></td>
    <td onClick="func_submit('15')"><?php echo $rates[15] ?></td>
  </tr>
 <tr>
    <td>Students</td>
    <td onClick="func_submit('16')"><?php echo $rates[16] ?></td>
    <td onClick="func_submit('17')"><?php echo $rates[17] ?></td>
    <td onClick="func_submit('18')"><?php echo $rates[18] ?></td>
  </tr>
  <tr>
    <td>Other Professionals (Psychologists, Social Workers, Nurses, etc…)</td>
    <td onClick="func_submit('19')"><?php echo $rates[19] ?></td>
    <td onClick="func_submit('20')"><?php echo $rates[20] ?></td>
    <td onClick="func_submit('21')"><?php echo $rates[21] ?></td>
  </tr>
  <tr>
    <td>Daily Rate</td>
    <td onClick="func_submit('22')"><?php echo $rates[22] ?></td>
    <td onClick="func_submit('23')"><?php echo $rates[23] ?></td>
    <td onClick="func_submit('24')"><?php echo $rates[24] ?></td>
  </tr>
  <tr>
    <td>Pre Congress Workshops</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Gala Dinner</td>
    <td onClick="func_submit('25')"><?php echo $rates[25] ?></td>
    <td onClick="func_submit('26')"><?php echo $rates[26] ?></td>
    <td onClick="func_submit('27')"><?php echo $rates[27] ?></td>
  </tr>

</table>

<p>* Please refer to the list of countries by groups below<br>
* Current school ID is required to validate your status.</p>

<br>
<span style="font-size:18px; color:#2d5c88;">Group A : Upper and High Income Economies by world Bank</span>
<div style="clear:both"></div>

<table border="0" class="groupA">
  <tr>
  <?php
  $ac = 1;
  foreach ($group_a as $a) {
    echo '<td>'.$a.'</td>';
    echo ($ac % 4 == 0 )? '</tr><tr>':'';
    echo (count($group_a) == $ac && $ac % 4 != 0)? '</tr>':''; 
    $ac++;
  }
  ?>
</table>

<br>
<span style="font-size:18px; color:#2d5c88;">Group B: Upper-Middle - income economies by the World Bank</span>
<div style="clear:both"></div>

<table border="0" class="groupA">
  <tr>
  <?php
  $ac = 1;
  foreach ($group_b as $b) {
    echo '<td>'.$b.'</td>';
    echo ($ac % 4 == 0 )? '</tr><tr>':'';
    echo (count($group_b) == $ac && $ac % 4 != 0)? '</tr>':''; 
    $ac++;
  }
  ?>
</table>

<br>
<span style="font-size:18px; color:#2d5c88;">Group C: Lowe-Middle - income economies by the World Bank</span>
<div style="clear:both"></div>

<table border="0" class="groupA">
  <tr>
  <?php
  $ac = 1;
  foreach ($group_c as $c) {
    echo '<td>'.$c.'</td>';
    echo ($ac % 4 == 0 )? '</tr><tr>':'';
    echo (count($group_c) == $ac && $ac % 4 != 0)? '</tr>':''; 
    $ac++;
  }
  ?>
</table>

<br>
<span style="font-size:18px; color:#2d5c88;">Group D: Low-income economies by the World Bank</span>
<div style="clear:both"></div>

<table border="0" class="groupA">
  <tr>
  <?php
  $ac = 1;
  foreach ($group_d as $d) {
    echo '<td>'.$d.'</td>';
    echo ($ac % 4 == 0 )? '</tr><tr>':'';
    echo (count($group_d) == $ac && $ac % 4 != 0)? '</tr>':''; 
    $ac++;
  }
  ?>
</table>

<script type="text/javascript">
  function func_submit(val){
    document.registration.pay.value = val;
    //document.registration.submit();
    return;
}
</script>

<form action="" name="registration" method="post">
  <input type="hidden" name="pay" value="0">
</form>


<!-- <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="X5QWHZJ932XFS">
<table>
<tr><td><input type="hidden" name="on0" value="package">package</td></tr><tr><td><select name="os0">
  <option value="Option 1">Option 1 $1.00 USD</option>
  <option value="Option 2">Option 2 $2.00 USD</option>
  <option value="Option 3">Option 3 $3.00 USD</option>
</select> </td></tr>
</table>
<input type="hidden" name="currency_code" value="USD">
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form> -->

  