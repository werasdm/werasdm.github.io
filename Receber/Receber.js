// This is the second test of the p5LiveMedia webrtc library and associated service.
// Open this sketch up 2 times to send canvas video back and forth
let myCanvas;
let otherCanvas = [];
let canvasToSave;
let canvasReceive;
let img;
let gatilho = false;
let verifica = true;
let fecha = false;
let x = 0;
let otherVideo;
let t = 0;

function setup() {
  myCanvas = createCanvas(400, 400);
  let p5l = new p5LiveMedia(this, "CANVAS", myCanvas, "agoravai");
  p5l.on('stream', gotStream);
  p5lm = new p5LiveMedia(this, "DATA", null, "amorinhabjork");
  p5lm.on('data', gotData);
}

function draw() {
  if (otherVideo != null) {
    image(otherVideo, 0, 0, 400, 400);
  }
  if (gatilho == verifica) {
    print('aaaaaaaaaaaaaaaaaaaaa');
    saveFrames('photo' + x, 'jpg', 1, 1);
    x++;
    fecha = true;
    gatilho = false;
  }
  if ( fecha == false) {
    print('a');
    t = 0;
  } else {
    print('b');
    t++;
  }
  if (t==50){
    p5lm.send(JSON.stringify('fecha'));
    fecha = false;
  }
  }

  function gotStream(stream, id) {
    fecha = false;
    otherVideo = stream;

    //otherCanvas.push(canvasReceive);
  }

function gotData(data, id) {
  gatilho = true;
}
