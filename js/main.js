$(document).ready(function(){
  $('body').on('click', '.chat_button', function(){
    $("#chat_modal").modal("show");
  });

  // $('body').scroll(function() {
  //   $( ".map_container" ).append("<div></div>");
  // });

  $(function() {
    $('img.trigger').hover(function() {
      // $(event.target).parent().find('div.pop-up').css('opacity', 1);
      $(event.target).parent().find('div.pop-up').show();
    }, function() {
      // $(event.target).parent().find('div.pop-up').css('opacity', 0);
      $(event.target).parent().find('div.pop-up').hide();
    });
  });
});
