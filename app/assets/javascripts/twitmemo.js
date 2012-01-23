$(document).ready(function(){

  $(".newmemo").click(function(){
    setTimeout(function(){
      var name = $(this).parent().parent().parent().find('.screen_name').text().slice(1);
      var img = $(this).parent().parent().parent().find('img').attr('src');
      $("input#input_screen_name").val(name);
      $("#twitter_icon").html($("<img/>",{ src: img , class:"service-profile-icon", style: "width:4em;height:4em;"}));
    }, 5000);
  });

  $("#send").click(function(){
    var name = $('#input_screen_name').val();
    var note = $('#input_note_area').val();
    var flag = 0; if ($('#private').is(':checked') == false) { flag = 1; }
    $.getJSON("https://api.twitter.com/1/users/show.json?screen_name="+ name +"&callback=?", function(json,status){
      $.ajax({
        type: "POST",
        url: "api/post.json",
        data: "name="+ name + "&twitter_id=" + json.id + "&note=" + note + "&flag=" + flag,
        success: function(){
          $('#my-modal').modal(false);
          location.reload();
        },
        error: function(){
          alert("failed!");
        }
    	});
    });
  });

  $('#my-modal').modal(true);
  $("#input_screen_name").bind("textchange", function(){
    clearTimeout(timeout);
    var timeout = setTimeout(function() {
      var api_url = "https://api.twitter.com/1/users/show.json?screen_name="+$("#input_screen_name").val()+"&callback=?";
      $.getJSON(api_url, function(json,status){
      $("#twitter_icon").html($("<img/>",{ src: json.profile_image_url , class:"service-profile-icon", style: "width:4em;height:4em;" }));
      });
    },300);
  });

  $("#modal_close").click(function(){
      $('#modal-from-dom').modal(false);
      return false;
  });

  $("a[href^=#]").click(function(){
    var Hash = $(this.hash);
	 var HashOffset = $(Hash).offset().top;
	 $("html,body").animate({
	   scrollTop: HashOffset
		}, 500);
	 return false;
	});

      var api_url = "https://api.twitter.com/1/users/show.json?screen_name="+$("#input_screen_name").val()+"&callback=?";
      $.getJSON(api_url, function(json,status){
      $("#twitter_icon").html($("<img/>",{ src: json.profile_image_url , class:"service-profile-icon", style: "width:4em;height:4em;" }));
      });





});
