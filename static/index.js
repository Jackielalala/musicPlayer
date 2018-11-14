var musicList=[
    {
        src:'http://m10.music.126.net/20181114112455/f5c0e978d9bdbc18465ebc09e40e514a/ymusic/3c9e/439c/d816/0f5c0962d2c3067a35bf7163bea08424.mp3',
        title:'这一切没有想象的那么糟',
        singer:'万晓利'
    },
    {
        src:'http://m10.music.126.net/20181114112358/81c4b33deace967a81340629acb49c10/ymusic/bb41/8df8/9d39/987b16b9a704922fa4439d31b4fdd044.mp3',
        title:'陀螺',
        singer:'万晓利'
    },
    {
        src:'http://m10.music.126.net/20181113182551/ff34c5730505bb045b42e682eb684415/ymusic/a030/a63c/a49b/623b30a1f3c73a24baac9ae2938aa875.mp3',
        title:'土豆',
        singer:'万晓利'
    }
];
var $=function(selector){
    return document.querySelector(selector);
};


var music=new Audio();
var musicIndex=0;
music.autoplay=true;
music.shouldUpdate=true;
music.volume=0.5;
music.onended=loadnextMusic;


$('.musicplay').addEventListener('click',function(){
    if($('.musicplay .fas').classList.contains('fa-play')){
        music.play();
    }else{
        music.pause();
    }
    $('.musicplay .fas').classList.toggle('fa-pause');
      $('.musicplay .fas').classList.toggle('fa-play');
});


function loadMusic(obj){
  if($('.musicplay .fas').classList.contains('fa-play')){
     $('.musicplay .fas').classList.add('fa-pause');
     $('.musicplay .fas').classList.remove('fa-play');
     }
  music.src=obj.src;
  $('.title').innerText=obj.title;
  $('.singer').innerText=obj.singer;
}


$('.musicplay').addEventListener('click',loadMusic(musicList[musicIndex]));

$('.back').addEventListener('click',loadlastMusic);
$('.forward').addEventListener('click',loadnextMusic);



function loadlastMusic(){
  musicIndex--;
  musicIndex=(musicIndex+musicList.length)%musicList.length;
  loadMusic(musicList[musicIndex]);
}
function loadnextMusic(){
  musicIndex++;
  musicIndex=musicIndex%musicList.length;
  loadMusic(musicList[musicIndex]);
}


var timer;
music.onplaying = function(){
   timer = setInterval(function(){
    updateProgress();
  }, 1000);
};
music.onpause = function(){
  clearInterval(timer);/*这两个onplaying和onpause很重要*/
};


function updateProgress(){
  var min=Math.floor(music.currentTime/60);
  var sec=Math.floor(music.currentTime%60)+'';
  sec=sec.length===2?sec:'0'+sec;
  $('.time').innerText=min+':'+sec;
  var percent=Math.floor((music.currentTime/music.duration)*100)+'%';
  $('.progressnow').style.width=percent;
}

$('.bar').addEventListener('click',function(e){
  var percent=Math.floor((e.offsetX/($('.bar').style.width))*100)+'%';
  music.currentTime=percent*music.duration;
  $('.progressnow').style.width=percent;
});

$('.bar').onclick = function(e){
  var percent = e.offsetX/parseInt(getComputedStyle($('.bar')).width);/*parseInt()将字符串解析成一个整数*/
  music.currentTime = percent * music.duration;
  $('.progressnow').style.width = percent*100+"%";
};

