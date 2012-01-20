$(document).ready(function(){

  function appendtext(num){
    $("#getjson").append("<div class='loading' align='center'><img src='http://www.benricho.org/loading_images/img-popular/loading-20.gif'></div>");
    $.getJSON("api/following/"+ num +".json", function(data){
	   for(var i in data) {
        $("#getjson").append(
          "<div class='well'>" +
            "<div style= 'float:left;'>" +
              "<a target='_blank' href='https://twitter.com/"+ data[i].screen_name +"'><img src='"+ data[i].profile_image_url + "'></a></div>" +
            "<div style= 'float:left; margin-left:1em;'>" +
              "<a target='_blank' href='https://twitter.com/"+ data[i].screen_name +"'>"+ "<strong class='screen_name'>@" + data[i].screen_name + "</a></strong><br/>" +
              "<strong>" + data[i].name + "</strong></div>" +
            "<div align='right'>" +
              "<span class='label'>Following</span><a target='_blank' href='https://twitter.com/"+ data[i].screen_name + "/following'><strong> "+ data[i].friends_count + "</strong></a>" +
              "<span class='label' style='margin-left :1em'>Followers</span><a target='_blank' href='https://twitter.com/"+ data[i].screen_name + "/followers'><strong> " + data[i].followers_count + "</strong></a></div>"+
            "<div style='clear:left;'>" +
              "<span class='label success'>Profile</span><br/><p style='margin-top: 5px;'>"+ data[i].description + "</p>"+
              "<span class='label success'>note</span><br/><p style='margin-top: 5px;'>"+ data[i].note + "</p>"+
            "<div class='page-header' style='margin-top: -30px;'></div>" +
            "<div align='right' style='margin: -10px -5px -15px -10px;'>" +
              "<p class='btn primary small newmemo' data-controls-modal='my-modal' data-backdrop='static'>Memo</p></div>" + "</div>");
	 	}
      loadingflag=0;
      $('#getjson .loading').remove();
	 });
  }

  appendtext(1);

  var num = 2;
  var loadingflag = 0;
  $(window).bottom({proximity: 0.01});
  $(window).bind("bottom", function(){
    if (loadingflag == 0){
      try{
        loadingflag=1;
        appendtext(num);
      } 
      catch(e){ alert(e); } 
      finally { num ++; }
    }
  });

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
});
