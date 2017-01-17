$(document).ready(function(){
  $('body').on('click', '.chat_button', function(){
    $("#chat_modal").modal("show");
  });

  // $(function() {
    // $(".map_container .map iframe").scroll( function() {
      // console.log("aaaa");
      // $(event.target).parent().find('div.over_map').show();
    // }, function() {
      // console.log("000");
      // $(event.target).parent().find('div.over_map').hide();
  //   });
  // });


  $(function() {
    $('img.trigger').hover(function() {
      $(event.target).parent().find('div.pop-up').show();
    }, function() {
      $(event.target).parent().find('div.pop-up').hide();
    });
  });

  document.getElementById('datestamp').innerHTML=Date();
});
