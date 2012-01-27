$(document).ready(function(){
  /*
   * stickyscroll
   */ 
  $('.sidebar').containedStickyScroll({
    duration: 200,
    closeChar: 'x',
    closeRight: 10
  } );
  /*
  * post
  */
  $("#send").click(function(){
    var name = $('#input_screen_name').val();
    var note = $('#input_note_area').val();
    var flag = 1; if ($('#private').is(':checked') == false) { flag = 0; }
    var label;
    if (flag==0){
      label = "<span class='label warning status'>Public</span>"
    } else {
      label = "<span class='label notice status'>Private</span>"
    }

    $.getJSON("https://api.twitter.com/1/users/show.json?screen_name="+ name +"&callback=?", function(json,status){
      $.ajax({
        type: "POST",
        url: "api/post.json",
        data: "name="+ name + "&twitter_id=" + json.id + "&note=" + note + "&flag=" + flag,
        success: function(){
          $.meow({
            message: "Success!"
          });
          $("input#input_screen_name").val("");
          $("#twitter_icon").empty();
          $("#input_note_area").val("");
          $('#my-modal').modal(false);
          if ($('.' + name).length) {  
            $('.' + name).remove();
          }  
          $(".memo_area").prepend(
            "<div class='" + name +" article'>"+
              "<div style='float:left;'>"+
                "<a target='_blank' href='https://twitter.com/" + name +"'><img height='48px' width='48px' src='http://img.tweetimag.es/i/"+ name +"'></a>" +
              "</div>"+
              "<div style='float:left; margin-left:1em; margin-top:-10px;'>"+
              "<h4 id='screen_name'><a href='/user/" + name + "'>"+ name +"</a> "+ label +
              "</h4>"+
              "<p>"+note+"</p>"+
              "</div>"+
              "<div align='right' style='margin-top:-7px;'>"+
              "<p class='btn small default editmemo editarea' data-note='"+note+"' data-name='"+name+"' data-img='http://img.tweetimag.es/i/"+name+"' data-controls-modal='my-modal' data-backdrop='true' data-keyboard='true' style='visibility:hidden;'>Edit</p> <span class='editarea' style='visibility:hidden;'><a href='/memos/4' class='btn small danger' data-confirm='メモを削除しますか?' data-method='delete' data-remote='true' rel='nofollow'>Delete</a></span>" +
              "</div>"+
              "<div class='page-header underline' style='margin-bottom:20px; padding: 5px 0px 0px 0px; clear:both;'></div>"+"</div>");
              $(".article").hover(
                function () {
                  $(this).find(".editarea").css("visibility","visible");
                },
                function () {
                  $(this).find(".editarea").css("visibility","hidden");
                }
              );

        },
        error: function(){
          $.meow({
            message: "Failed!"
          });
        }
    	});
    });
  });

  /*
  * open modal and img show 
  */
  $('#my-modal').modal(true);
  $("#input_screen_name").bind("textchange", function(){
    var getimg = setTimeout(function() {
      var api_url = "https://api.twitter.com/1/users/show.json?screen_name="+$("#input_screen_name").val()+"&callback=?";
      $.getJSON(api_url, function(json,status){
      $("#twitter_icon").html($("<img/>",{ src: json.profile_image_url , class:"service-profile-icon", style: "width:4em;height:4em;" }));
      });
    },1500);

    var getmemo = setTimeout(function() {
      var memo_url = "api/memos/"+$("#input_screen_name").val();
      $.getJSON(memo_url, function(data){
        for(var i in data) {
          $("#input_note_area").val(data[i].note);
        }
      });
    },1000);
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
