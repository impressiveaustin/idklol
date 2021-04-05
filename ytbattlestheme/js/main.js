var c = 1;

for (var l = 1; l <= 5; l++) {
  var htmlrow = `<div class="row_${l} row"></div>`;
  $('.counters').append(htmlrow);
    for (var t = 1; t <= 10; t++) {
      var htmlcard = `<div class="channel_${c} card">
      <div class="cnb">${c}</div>
      <img src="https://yt3.ggpht.com/ytc/AAUvwnjDaXbHDKFm-Fdl_AxSan3i_2BRKpWLY961G0LvaA" alt="" class="cimg">
      <div class="chnam">Loading</div>
      <div class="subscriberCount odometer">0</div>
      </div>`;
      $('.row_'+l).append(htmlcard);
      c += 1;
    }
}

function random(min, max){
  return Math.floor(Math.random()* (max-min) + min);
}

function updateData(q, data) {
  setTimeout(function () { 
    var cnb = q+1;
    //var subscriberCount = parseInt(data[q].subscriberCountRealEst);
    $(".channel_"+cnb+" .cimg").attr("src",data.resulte[q].image);
    $(".channel_"+cnb+" .chnam").html(data.resulte[q].name);
    $(".channel_"+cnb+" .subscriberCount").html(Math.floor(data.resulte[q].SubscriberCount));
    }, random(1 , 10)*1000);
}

function update(){
    $.getJSON("https://mixerno.space/api/youtube/estimated/all",(data)=>{

        data.resulte.sort(function(a,b){return b.SubscriberCount - a.SubscriberCount});

        for (var q = 0; q < 50; q++) {
          updateData(q, data)
        }
    });
}


update();
setInterval(update,10000);
setTimeout(function(){$('.loader').fadeOut(); $('.counters').fadeIn(1000);},1000)
