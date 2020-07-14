(function($){
  $(function(){

    

    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.modal').modal();
    $('.tooltipped').tooltip();

    $('.userid').click(function(){
      userid = $(this).attr("id");
      console.log(userid);
      $.ajax({
        type: "POST",
        url: "/userselect",
        data: {"userid": userid },
        success: function(resp){
          
          var imgpaths = JSON.parse(resp).paths.split(" ");
          var tlist = JSON.parse(resp).toplist;
          $('#imgcont').empty();
          //$('#imgconthead').empty();
          //$('#imgconthead').append($('<h5>').text(`User ${userid} Past Preferences`));
          for(i=0;i<imgpaths.length-2;i+=2){
            
            if(tlist.includes(Number(imgpaths[0].split('/')[4].split('_')[0]))){
              img1 = imgpaths[i];
              img2 = imgpaths[i+1];
              console.log('sai');
            }
            else{
              img1 = imgpaths[i+1];
              img2 = imgpaths[i];
            }
            var divc = $("<div class='card' style='margin:1%;'>");

            
              image1 = new Image();
              image1.src = img1;
              divc.append(image1);

            
              image2 = new Image();
              image2.src = img2;
              divc.append(image2);
            


            $('#imgcont').append(divc);
          }
        }
      });


    });

    

  }); // end of document ready

})(jQuery); // end of jQuery name space

var topid = 'x';
var botids = [];
var userid = 'x';
var tupload = 0;

$('#go').click(function(){
      console.log(userid);
      console.log(topid);
      console.log(botids);

      $('#selectcont').empty();
      var pre = $("<div class='preloader-wrapper big active'><div class='spinner-layer spinner-yellow-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>");
      $('#selectcont').append(pre);

      $.ajax({
        type: "POST",
        url: "/rank",
        
        data: { "upload_token": tupload,
                "userid": userid,
                "topid": topid,
                "botid": botids.toString()
              },
        success: function(resp){
          
          var rankedout = JSON.parse(resp)
          console.log(rankedout);
          var t = rankedout.t;
          var rankedbot = rankedout.b;
          var uptok = rankedout.uptoken;
          var botattr = rankedout.botattr;
          var user = rankedout.user.split(" ");
          var tlist = rankedout.toplist;
          $('#selectcont').empty();

          $('#selectcont').append($('<h5>').text('Query Top'));

          
          if(uptok == '0'){
            image = new Image();
            image.src = `static/tops/${t}.jpg`;
          }
          else{
            image = new Image(150);
            image.src = 'static/uploads/uploadtop.png';
          }
          image.className = 'z-depth-2 art hoverable';
          $('#selectcont').append(image);
          $('#selectcont').append('<br><br>');
          $('#selectcont').append($('<h5>').text('Ranked Bottoms'));
          for(i=0;i<rankedbot.length;i++){
            img = rankedbot[i];
            image = new Image();
            image.className='z-depth-2 art hoverable';
            image.src = `static/bottoms/${img}.jpg`;
            var cont = $("<ul class='collection'>");
            for(j=0;j<botattr[i].length;j++){
              cont.append($("<li class='collection-item'>").append(botattr[i][j]));
            }
            var boxcont = $("<span class='art' style='display:inline-block;'>");
            boxcont.append(image);
            boxcont.append(cont);
            

            $('#selectcont').append(boxcont);
          }
          for(i=0;i<user.length-2;i+=2){
            if(tlist.includes(Number(user[0].split('/')[4].split('_')[0]))){
              img1 = user[i];
              img2 = user[i+1];
            }
            else{
              img1 = user[i+1];
              img2 = user[i];
            }
            var divc = $("<div class='card' style='margin:1%;'>");
            
              image1 = new Image();
              image1.src = img1;
              divc.append(image1);
                image2 = new Image();
                image2.src = img2;
                divc.append(image2);

           
            $('#userpref').append(divc);
          }
        

          // $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
        }
      });

    });

function topsubmit(){

    var toppath = $("input[name='grouptop']:checked").val();
    toppath = toppath.split('/')[3].split('.')[0]
    topid = toppath;
    console.log(toppath);
    $.ajax({
      type : "POST",
      url : '/modeselect',
      data : {
        upload_token : tupload
      },
      success : function(resp){
        console.log(resp);
      }
    });

  }

function botsubmit(){

    var favorite = [];
    $.each($("input[name='groupbot']:checked"), function(){
                favorite.push($(this).val().split('/')[3]);
    });
    botids = favorite;
    console.log(botids);

  }

$('#fileupload').click(function(){
  console.log('upload');
  console.log(document.getElementById('upimg').files[0]);
});


function uploadresponse(){
  tupload = 1;
  $.ajax({
    type : "POST",
    url : '/modeselect',
    data : {
      upload_token : tupload
    },
    success : function(resp){
      console.log(resp);
    }
  });
  console.log('Upload mode');

}


