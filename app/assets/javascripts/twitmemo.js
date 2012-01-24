$(document).ready(function(){
  /*
  * post
  */
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
          $('#my-modal').modal(false);
          alert("failed!");
        }
    	});
    });
  });

  /*
  * open modal and img show 
  */
  $('#my-modal').modal(true);
  $("#input_screen_name").bind("textchange", function(){
    clearTimeout(timeout);
    var timeout = setTimeout(function() {
      var api_url = "https://api.twitter.com/1/users/show.json?screen_name="+$("#input_screen_name").val()+"&callback=?";
      $.getJSON(api_url, function(json,status){
      $("#twitter_icon").html($("<img/>",{ src: json.profile_image_url , class:"service-profile-icon", style: "width:4em;height:4em;" }));
      });
    },50);
  });

  /*
  * auto focus
  */
  $("#openmodal").click(function(){
    setTimeout(function(){
      document.getElementById("input_screen_name").focus();
    }, 0);
  });

  /*
  * edit
  */
  $(".editmemo").click(function(){
    setTimeout(function(){
      document.getElementById("input_note_area").focus();
    }, 0);
    var name = $(this).attr("data-name");
    var note = $(this).attr("data-note");
    var img = $(this).attr("data-img");
    $("input#input_screen_name").val(name);
    $("#input_note_area").val(note);
    $("#twitter_icon").html($("<img/>",{ src: img , class:"service-profile-icon", style: "width:4em;height:4em;"}));
  });

  /*
  * close modal
  */
  $("#modal_close").click(function(){
      $('#modal-from-dom').modal(false);
      $("input#input_screen_name").val("");
      return false;
  });

  /*
  * close modal
  */
  $(".close").click(function(){
      $('#my-modal').modal(false);
      $("input#input_screen_name").val("");
      $("#twitter_icon").empty();
      $("#input_note_area").val("");
      return false;
  });

  /*
  * scroll
  */
  $("a[href^=#]").click(function(){
    var Hash = $(this.hash);
	 var HashOffset = $(Hash).offset().top;
	 $("html,body").animate({
	   scrollTop: HashOffset
		}, 500);
	 return false;
	});
});
