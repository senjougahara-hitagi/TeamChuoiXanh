var loadedData = [];
$(document).ready(function(){


  var itemModalTemplate = Handlebars.compile($("#item-modal-template").html());
  $.ajax({
    type : "get",
    url  : "libs/prodData.json"
  }).then(function(data){
    loadedData = loadedData.concat(data.items);
  }).fail(function(error){
    console.log("Error: " + error);
  });

  $('body').on('click', '.trigger_of_pop_up', function(){
    var itemId = $(this).attr('data-item-id');
    for(var i = 0; i < loadedData.length; i++){
      var itemData = loadedData[i];
      if(itemData.idShop == itemId){
        // Found it, populating data
        $("#accordion").html(itemModalTemplate(itemData));
        break;
      }
    }
    $("#item_modal").modal("show");
  });

// -----------------------------



  $(function() {
    $('.trigger').hover(function() {
      $(event.target).parent().find('.pop-up').show();
    }, function() {
      $(event.target).parent().find('.pop-up').hide();
    });
  });

  // document.getElementById('datestamp').innerHTML=Date();
// -----------------------------
  var source = $("#list_shop_template").html();
  var listShopTemplate = Handlebars.compile(source);
  $.ajax({
    type : "get",
    url  : "libs/shopData.json"
  }).then(function(data){
    var itemHtml = listShopTemplate(data);
    $("#list_shop").html(itemHtml);
    $("#list_shop").masonry({
      itemSelector: '.item_container',
      columnWidth: '.item_container',
      percentPosition: true
    });
    $("#list_shop").imagesLoaded().progress( function() {
      $("#list_shop").masonry('layout');
    });
  }).fail(function(error){
    console.log("Error: " + error);
  });
// ----------------------------

  $( function() {
    $( "#tab-list" ).tabs({
      event: "mouseover"
    });
  } );

  // ---------------------------
  $(window).on("scroll", function(e){

    if($(window).scrollTop() + $('.navbar.navbar-default').height() >= $('#home').height()){
      $('.site_logo img').css({
        "width": "30%"
      });
      $('.navbar.navbar-default').css({
        "background":"rgba(0, 0, 0, 1)"
      });
    }else{
      $('.site_logo img').css({
        "width": "50%"
      });
      $('.navbar.navbar-default').css({
        "background":"rgba(0, 0, 0, 0.3)"
      });

    }
    if($(window).width() <= 769){
      $('.menu-container .site_logo img').css({
        "width": "150px",
        "background": "transparent",
        "text-align": "center",
        "float": "left"
      });
      $('.navbar.navbar-default').css({
        "background":"rgba(0, 0, 0, 1)"
      });
    }
  });

  // ---------------------------
});

// ----------------------------
window.onload = function(){
  $(function() {
    $('.trigger_of_pop_up').hover(function() {

      $(event.target).parent().parent().find('.pop_up_on_shop_list').show();
      if(window.innerWidth < $(document).width()){
        $('.pop_up_on_shop_list').css({
          "transform": "translateX(-100.7%)"
        });
      }
    }, function() {
      $(event.target).parent().parent().find('.pop_up_on_shop_list').hide();

      $('.pop_up_on_shop_list').css({
        "transform": "translateX(100%)"
      });
    });
  });

}
// ---------------------------
$(window).on("scroll", function(e){
    if($(window).scrollTop() + $('.navbar.navbar-default').height() >= $('#home').height()){
      $('.site_logo img').css({
        "width": "37%"
      });
      $('.navbar.navbar-default').css({
        "background":"rgba(0, 0, 0, 1)"
      });
    }else{
      $('.site_logo img').css({
        "width": "50%"
      });
      $('.navbar.navbar-default').css({
        "background":"rgba(0, 0, 0, 0.3)"
      });
    }
  });
