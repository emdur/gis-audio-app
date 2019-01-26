//stretch canvas across inner window
function resize_canvas(){
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var can_ = document.getElementById("canvas");
can_.width = window.innerWidth;
can_.height = window.innerHeight;
}
resize_canvas();

window.addEventListener("resize", resize_canvas, false);
window.addEventListener("orientationchange", resize_canvas, false);

//varibles
var elemLeft = canvas.offsetLeft,
    elemTop = canvas.offsetTop,
    brush = canvas.getContext('2d'),
    rectangles = [];

// event listeners
canvas.addEventListener('mousedown', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    // collision detection between clicked offset and element
    rectangles.forEach(function(element) {
        if (y > element.top && y < element.top + element.height
            && x > element.left && x < element.left + element.width) {
            soundstart(element);
        }
    });
}, false);
canvas.addEventListener('mouseup', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    // collision detection between clicked offset and element
    rectangles.forEach(function(element) {
        if (y > element.top && y < element.top + element.height
            && x > element.left && x < element.left + element.width) {
            soundstop(element);
        }
    });
}, false);
canvas.addEventListener('mousemove', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    // collision detection between clicked offset and element
    rectangles.forEach(function(element) {
        if (y > element.top && y < element.top + element.height
            && x > element.left && x < element.left + element.width) {
            soundedit(element);
        }
    });
}, false);
canvas.addEventListener('dblclick', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    // collision detection between clicked offset and element
    rectangles.forEach(function(element) {
        if (y > element.top && y < element.top + element.height
            && x > element.left && x < element.left + element.width) {
            soundclick(element);
        }
    });
}, false);

// add elements to canvas
rectangles.push({
  colour: '#000080',
  width: canvas.width/4,
  height: canvas.height/3,
  top: 0,
  left: 0,
  name: 1,
  sound: 'LoboLoco1.mp3',
  image: 'LoboLoco1.jpg',
});
rectangles.push({
  colour: '#00008B',
  width: canvas.width/4,
  height: canvas.height/3,
  top: 0,
  left: canvas.width/4,
  name: 2,
  sound: 'Despacito.mp3',
  image: 'Despacito.jpg',
});
rectangles.push({
  colour: '#0000CD',
  width: canvas.width/4,
  height: canvas.height/3,
  top: 0,
  left: canvas.width/2,
  name: 3,
  sound: 'LoboLoco2.mp3',
  image: 'LoboLoco2.jpg',
});
rectangles.push({
  colour: '#0000FF',
  width: canvas.width/4,
  height: canvas.height/3,
  top: 0,
  left: canvas.width/4*3,
  name: 4,
  sound: 'Monplaisir.mp3',
  image: 'Monplaisir.jpg',
});
rectangles.push({
  colour: '#00008B',
  width: canvas.width/4,
  height: canvas.height/3,
  top: canvas.height/3,
  left: 0,
  name: 5,
  sound: '303.mp3',
  image: '303.jpg',
});
rectangles.push({
  colour: '#0000CD',
  width: canvas.width/4,
  height: canvas.height/3,
  top: canvas.height/3,
  left: canvas.width/4,
  name: 6,
  sound: 'Horror2.mp3',
  image: 'Horror2.jpg',
});
rectangles.push({
  colour: '#0000FF',
  width: canvas.width/4,
  height: canvas.height/3,
  top: canvas.height/3,
  left: canvas.width/2,
  name: 7,
  sound: 'Monplaisir2.mp3',
  image: 'Monplaisir2.jpg',
});
rectangles.push({
  colour: '#00BFFF',
  width: canvas.width/4,
  height: canvas.height/3,
  top: canvas.height/3,
  left: canvas.width/4*3,
  name: 8,
  sound: 'Gabe.mp3',
  image: 'Gabe.jpg',
});
rectangles.push({
  colour: '#0000CD',
  width: canvas.width/4,
  height: canvas.height/3,
  top: canvas.height/3*2,
  left: 0,
  name: 9,
  sound: 'FilmyGhost.mp3',
  image: 'FilmyGhost.jpg',
});
rectangles.push({
  colour: '#0000FF',
  width: canvas.width/4,
  height: canvas.height/3,
  top: canvas.height/3*2,
  left: canvas.width/4,
  name: 10,
  sound: ' LoboLoco3.mp3',
  image: 'LoboLoco3.jpg',
});
rectangles.push({
  colour: '#00BFFF',
  width: canvas.width/4,
  height: canvas.height/3,
  top: canvas.height/3*2,
  left: canvas.width/2,
  name: 11,
  sound: 'Butterfly.mp3',
  image: 'Butterfly.jpg',
});
rectangles.push({
  colour: '#00FFFF',
  width: canvas.width/4,
  height: canvas.height/3,
  top: canvas.height/3*2,
  left: canvas.width/4*3,
  name: 12,
  sound: 'Horror.mp3',
  image: 'Horror.jpg',
});
// render elements
function render () {
rectangles.forEach(function(element) {
    brush.fillStyle = element.colour;
    brush.fillRect(element.left, element.top, element.width, element.height);});
};
render();

//MOUSEDOWN
var audio; //save current audiofile in this variable
var playinginteractively = false; //true if music is currently playing
var startelement;
function soundstart(element){
  startelement = element.name;
  if (playing){
    audio.pause();
    brush.clearRect(0, 0, canvas.width, canvas.height);
    render();
  }
//img and audio load
  audio = new Audio (element.sound);
  audio.play();
  playinginteractively = true;
}
//MOUSEUP
function soundstop(element){
  playinginteractively = false;
  audio.pause();
  brush.clearRect(0, 0, canvas.width, canvas.height);
  render();
}
//method for animation of current element (during MOUSEMOVE)
var rainbow = 0;
var h = 0.005;
var c;
function anim(element){
  window.requestAnimationFrame(anim);
  c = "hsl("+rainbow+", 100%, 50%)"
  brush.fillStyle = c;
  brush.fillRect(element.left, element.top, element.width, element.height);
  rainbow += h;
  if (rainbow > 360 || rainbow < 0){
      h *= -1;
  }
}
//MOUSEMOVE
function soundedit(element){
  if(playinginteractively){
    brush.clearRect(0, 0, canvas.width, canvas.height);
    render();
    if(element.name == 5 || element.name == 6 || element.name == 9 || element.name == 10){
      if (audio.playbackRate >= 4.9){
        audio.playbackRate = 4.9;
      }
      audio.playbackRate += 0.01;
    }
    if(element.name == 4 || element.name == 4 || element.name == 7 || element.name == 8){
      audio.playbackRate -= 0.01;
      if (audio.playbackRate <= 0.26){
        audio.playbackRate = 0.26;
      }
    }
    if(element.name == 1 || element.name == 2 || element.name == 5 || element.name == 6){
      if (audio.volume >= 0.9){
        audio.volume = 0.9;
      }
      audio.volume += 0.1;
    }
    if(element.name == 7 || element.name == 8 || element.name == 11 || element.name == 12){
      if(audio.volume <= 0.2){ //don't mute completely
        audio.volume = 0.2;
      }
      audio.volume -= 0.1;
    }
    if(element.name == startelement){ //reset audio to normal values when mouse over original element
      audio.volume = 1;
      audio.playbackRate = 1;
    }
      anim(element);
  }
}
// play on DOUBLEKLICK (static music player)
var playing = false; //true if music is currently playing
var nameoflastelement = 0;
var replayindicator = false; //if same element is clicked multiple times, play & pause in turns

function soundclick(element){
  if (playing && element.name != nameoflastelement){ //if there is an audio playing already, this stops it and resets its colour
    audio.pause();
    brush.clearRect(0, 0, canvas.width, canvas.height);
    render();
  }
  //stop when clicked again
  if(element.name == nameoflastelement){
    replayindicator = true;
  }
  if (playing && replayindicator){
      audio.pause();
      playing = false;
      brush.clearRect(0, 0, canvas.width, canvas.height);
      render();
  }
//audio load
  if(element.name != nameoflastelement){ //this if stops audio if same element is clicked two times in a row
  audio = new Audio (element.sound);
  audio.play();
  playing = true;
  }
  //image load
  if(playing||nameoflastelement==0 && animpicture){
    var picture = new Image();
    picture.src = element.image;
    picture.onload = function(){
    var scale = Math.min(canvas.width / picture.width, canvas.height / picture.height);
    var w = picture.width * scale;
    var h = picture.height * scale;
    brush.drawImage(picture, canvas.width/2 - w/2, canvas.height/2 - h/2, w, h);
    }
  }
  if(replayindicator){
    nameoflastelement = 0;
  } else {
    nameoflastelement = element.name;
  }
  replayindicator = false;
}
