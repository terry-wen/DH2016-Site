/*schedule*/

function checkTime() {
  var now = new Date(2017, 01, 25, 12, 50, 00);
  var hour = now.getHours();
  var date = now.getDate();
  var timstamp = now.getHours()*100 + (now.getMinutes() * 5/3);

  //if(now.getMonth() == 1 && now.getFullYear() == 2017) {
    $('.schedule tr').each(function() {
      var whatday = $(this).parent('.whatday').attr('value');

      if($(this).hasClass('time')) {
        console.log('timtime: ' + timstamp);
        var eTime = parseFloat($(this).attr('value'));

        //current event is going on
        if(whatday == now.getDate() && (eTime - 25) < timstamp && (eTime + 100) > timstamp) {
          $(this).addClass('current');
        } else if(whatday < now.getDate() || (whatday == now.getDate() && (eTime + 100) < timstamp)) {
          $(this).removeClass('current');
          $(this).addClass('past');
        }

      }
    }) //end of loop
  //} //end of check month, year
}

$(document).ready(function() {

  checkTime();
  setInterval(checkTime, 1000 * 60 * 30); //every half hour
});
