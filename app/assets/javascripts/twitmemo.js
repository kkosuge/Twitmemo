$(document).ready(function(){
  /* open */
  $("#open").click(function(){
    $('#my-modal').modal('show');
    setTimeout(function(){
      document.getElementById("input_screen_name").focus();
    }, 0);
  });

  /* hidden event */
  $('#my-modal').on('hidden', function () {
    reset();
  })

  /* count */
  $('#input_note_area').bind('textchange', function (event, previousText) {
    $('#charactersLeft').html( 200 - parseInt($(this).val().length));
  });

  /* textchange */
  $('#input_screen_name').bind('textchange', function () {
    var getimg = setTimeout(function() {
      $("#twitter_icon").html($("<img/>",{ src: "http://img.tweetimag.es/i/"+$("#input_screen_name").val() , class:"service-profile-icon", style: "width:4em;height:4em;" }));
    },1000);

    var getmemo = setTimeout(function() {
      var memo_url = "/api/memos/"+$("#input_screen_name").val();
      $.getJSON(memo_url, function(data){
        for(var i in data) {
          $("#input_note_area").val(data[i].note);
        }
      });
    },1000);

    if ($(this).val().length > 0 && ('#input_note_area').val().length > 0){
      $('#send').removeClass('disabled').attr('disabled', false);
    }
    else{
      $('#send').addClass('disabled').attr('disabled', true);
    }
  });

  $('#input_note_area').bind('textchange', function () {
    if ($(this).val().length > 0){
      $('#send').removeClass('disabled').attr('disabled', false);
    }
    else{
      $('#send').addClass('disabled').attr('disabled', true);
    }
  });

  /* stickyscroll */
  $('.sidebar').containedStickyScroll({
    duration: 200,
    closeChar: 'x',
    closeRight: 0
  });

  function escapehtml (val) {
    return $("<div/>").text(val).html();
  };

  /* post */
  $("#send").click(function(){
    $(this).button('loading');
    var name = $('#input_screen_name').val();
    var note = $('#input_note_area').val();
    console.log(note);
    var flag = 0; if ($('#private').is(':checked') == false) { flag = 1; }
    var post = 0; if ($('#twitter').is(':checked') == true) { post = 1; }
    if (flag==1){
      label = "<span class='label label-warning status'>Public</span>"
    } else {
      label = "<span class='label label-notice status'>Private</span>"
    }
    $.getJSON("https://api.twitter.com/1/users/show.json?screen_name="+ name +"&callback=?", function(json,status){
      $.ajax({
        type: "POST",
        url: "/api/post.json",
        data: "name="+ name + "&twitter_id=" + json.id + "&note=" + note + "&flag=" + flag + "&post=" + post,
        success: function(res){
          $.meow({
            message: "Success!"
          });
          reset();
          if ($(".no_memo").length) {  
            $(".no_memo").remove();
          }  
          if ($('.' + name).length) {  
            $('.' + name).remove();
          }  
          if ($('.'+ name +'memoarea').length) {  
            $('.'+ name +'memoarea').html("");
            $('.'+ name +'memoarea').html(note);
          } 
          note = escapehtml(note);
          $(".memo_area").prepend(
          "<div class='" + name + " article'>" +
            "<div style='float:left;'>"+
              "<a href='/user/"+ name +"'><img height='48px' width='48px' src='"+json.profile_image_url+ "'></a>"+
            "</div>" +
            "<div style='width:390px; float:left; margin-left:1em; margin-top:-5px;'>" +
              "<h4 id='screen_name'><a href='/user/"+ name +"'>"+name +"</a> "+ label +"</h4>"+
              "<p style='margin-top:5px; word-break: break-all;'>"+ note +"</p>"+
            "</div>"+    
            "<div style='float:right;margin-top:-45px'>" +
              "<span class='editmemo editarea' data-id='"+res.id+"' data-note='"+note+"' data-name='"+name+"' data-img='"+json.profile_img_url+"' style='visibility:hidden;'><i class='icon-edit'></i><a href='#'>Edit</a></span>"+
              "<span class='editarea' style='visibility:hidden;'><i class='icon-trash'></i><a href='/memos/"+ res.id +"' data-confirm='メモを削除しますか?' data-method='delete' data-remote='true' rel='nofollow'>Delete</a></span></div>"+
            "<div class='page-header underline' style='margin-right:5px;margin-top:-20px;margin-bottom:10px; padding: 0px 0px 0px 0px; clear:both;'></div>"+
            "</div></div>"); 
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
          $("#send").button('reset');
        }
    	});
    });
  });

  /* edit */
  $(".editmemo").click(function(){
    $('#my-modal').modal(true);
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

  /* close modal */
  $(".close").click(function(){
      $('#send').addClass('disabled').attr('disabled', true);
      reset();
      return false;
  });

  /* reset */
  function reset(){
    $('#my-modal').modal('hide');
    $("input#input_screen_name").val("");
    $("#twitter_icon").empty();
    $("#input_note_area").val("");
    $("#send").button('reset');
  }

  /* to top */
  $("a[href^=#]").click(function(){
    var Hash = $(this.hash);
	 var HashOffset = $(Hash).offset().top;
	 $("html,body").animate({
	   scrollTop: HashOffset
		}, 500);
	 return false;
	});
});
