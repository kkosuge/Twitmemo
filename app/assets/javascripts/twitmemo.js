$(document).ready(function(){
  editmemoclick();

  /* stickyscroll */
  $('.sidebar').containedStickyScroll({
    duration: 200,
    closeChar: 'x'
  });

  /* open modal */
  $("#open").click(function(){
    $('#my-modal').modal('show');
    setTimeout(function(){
      document.getElementById("input_screen_name").focus();
    }, 0);
  });

  /* hidden event */
  $('#my-modal').on('hidden',function(){
    reset();
  })

  /* count */
  $('#input_note_area').bind('textchange',function(event,previousText){
    $('#charactersLeft').html(200 - parseInt($(this).val().length));
    if(parseInt($(this).val().length) > 200){
      $('#charactersLeft').css('color', "red");
    }
  });

  /* textchange */
  $('#input_screen_name').bind('textchange',function(){
    setTimeout(function(){
      $("#twitter_icon").html($("<img/>",{ src:"http://img.tweetimag.es/i/"+$("#input_screen_name").val(), style:"width:4em;height:4em;" }));
    },1000);
    setTimeout(function() {
      var memo_url = "/api/memos/"+$("#input_screen_name").val();
      $.getJSON(memo_url, function(data){
        for(var i in data) {
          $("#input_note_area").val(data[i].note);
        }
      });
    },1000);
  });

  /* textchange */
  $('#input_note_area').bind('textchange', function () {
    if($(this).val().length > 0 && $(this).val().length <= 200){
      $('#send').removeClass('disabled').attr('disabled', false);
    }
    else{
      $('#send').addClass('disabled').attr('disabled', true);
    }
  });

  /* fav */
  $(".fav").click(function(){ 
    var memo_id = $(this).attr("data-id");
    var parents = $(this).children(".fav_img");
      $.ajax({
        type: "POST", 
        url: "/api/fav.json",
        data: "memo_id="+ memo_id,
        success: function(res){
          if(parents.attr("src").match(/unfav/i)){ parents.attr("src","/assets/fav.png"); }
          else{ parents.attr("src","/assets/unfav.png"); }
        },
        error: function(){
          $.meow({
            message: "Fav failed!"
          });
        }
    	});
  });

  /* post */
  $("#send").click(function(){ 
    $(this).button('loading');
    var name = $('#input_screen_name').val();
    var note = $('#input_note_area').val();
    var flag = 0;
    var post = 0;
    var label = "<span class='label label-info status'>Private</span>";
    if ($('#private').is(':checked') == false) {
      flag = 1;
      label = "<span class='label label-warning status'>Public</span>";
    }
     if ($('#twitter').is(':checked') == true){
      post = 1;
    }
    $.getJSON("https://api.twitter.com/1/users/show.json?screen_name="+ name +"&callback=?", function(json,status){
      $.ajax({
        type: "POST", 
        url: "/api/post.json",
        data: "name="+ name + "&twitter_id=" + json.id + "&note=" + note + "&flag=" + flag + "&post=" + post,
        success: function(res){
          reset();
          note = escapehtml(note).replace(/\r\n|\r|\n/g,'<br />');
          $.meow({
            message: "Success!"
          });
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
          $(".memo_area").prepend(
          "<div class='" + name + " article'>" +
            "<div style='float:left;'>" +
              "<a href='/user/"+ name +"'><img height='48px' width='48px' src='"+ json.profile_image_url + "'></a></div>" +
            "<div style='width:390px; float:left; margin-left:1em; margin-top:-5px;'>" +
              "<h4 id='screen_name'><a href='/user/"+ name +"'>"+ name +"</a><a href='http://twitter.com/"+name+"'><img src='/assets/logo.png' width='18px' height='18px' style='margin-left:1px;margin-bottom:-3px;'></a></h4>" +
              "<p style='margin-right:90px;margin-top:5px;word-break:break-all;'>"+ note +"</p></div>" +    
            "<div style='float:right;margin-top:-40px'>" +
              "<span class='editmemo editarea' data-flag='" + flag + "' data-note='" + note + "' data-name='" + name + "' data-img='" + json.profile_image_url + "' style='visibility:hidden;'><i class='icon-edit'></i><a href='#'>Edit</a></span>" +
              " <span class='editarea' style='visibility:hidden;'><i class='icon-trash'></i><a href='/memos/"+ res.id + "' data-confirm='メモを削除しますか?' data-method='delete' data-remote='true' rel='nofollow'>Delete</a></span></div>" +
            "<div style='float:right;padding-bottom:3px;'><strong style='color:#808080;font-size:xx-small'>Now!</strong> "+label+"</div>" +
            "<div class='page-header underline' style='margin-bottom:14px;padding:0px;clear:both;'></div></div></div>" ); 
          $(".article").hover(
            function () {
              $(this).find(".editarea").css("visibility","visible");
            },
            function () {
              $(this).find(".editarea").css("visibility","hidden");
            }
          );
          editmemoclick();
        },
        error: function(){
          $.meow({
            message: "Failed!"
          });
          reset();
        }
    	});
    });
  });

  /* close modal */
  $(".close").click(function(){
      $('#send').addClass('disabled').attr('disabled', true);
      reset();
      return false;
  });

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

/* caretPos */
(function($) {
  var caretPos = function(pos) {
    var item = this.get(0);
    if (pos == null) {
      return get(item);
    }
    if (pos == "first") pos = 0;
    if (pos == "last") pos = this.val().length;
    set(item, pos);
    return this;
  };
  var get = function(item) {
    var CaretPos = 0;
    if (document.selection) {
      item.focus ();
      var Sel = document.selection.createRange();
      Sel.moveStart ("character", -item.value.length);
      CaretPos = Sel.text.length;
    } else if (item.selectionStart || item.selectionStart == "0") {
      CaretPos = item.selectionStart;
    }
    return (CaretPos);
  };
  var set = function(item, pos) {
    if (item.setSelectionRange) {
      item.focus();
      item.setSelectionRange(pos, pos);
    } else if (item.createTextRange) {
      var range = item.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  };
  $.fn.extend({caretPos: caretPos});
})(jQuery);

  /* escape html */
  function escapehtml(val){
    return $("<div/>").text(val).html();
  };

  /* reset */
  function reset(){
    $('#my-modal').modal('hide');
    $("input#input_screen_name").val("");
    $("#twitter_icon").empty();
    $("#input_note_area").val("");
    $("#send").button('reset');
  }

  /* edit */
  function editmemoclick(){ 
    $(".editmemo").click(function(){
      $('#my-modal').modal(true);
      var note = $(this).attr("data-note");
      var name = $(this).attr("data-name");
      var img = $(this).attr("data-img");
      var flag = $(this).attr("data-flag");
      if (flag == 0){ document.getElementById("private").checked = true;}
      else{ document.getElementById("private").checked = false; }
      $("input#input_screen_name").val(name);
      $("#input_note_area").val(note);
      $("#input_note_area").caretPos("last"); 
      $("#twitter_icon").html($("<img/>",{ src: img , class:"service-profile-icon", style: "width:4em;height:4em;"}));
    });
  }
