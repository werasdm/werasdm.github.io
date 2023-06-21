// This is the second test of the p5LiveMedia webrtc library and associated service.
// Open this sketch up 2 times to send canvas video back and forth
let myCanvas;
let otherCanvas;
let img;
let gatilho = false;
let verifica = true;
let salvar;
let x = 0;

function setup() {
  myCanvas = createCanvas(400, 400);
  let p5l = new p5LiveMedia(this, "CANVAS", myCanvas, "agoravai");
  p5l.on('stream', gotStream);
  p5lm = new p5LiveMedia(this, "DATA", null, "amorinhabjork");
  p5lm.on('data', gotData);
}

function draw() {
  if(img){
  image(img, 0, 0, 400, 400);
  }
  if (gatilho == verifica) {
    //salvar = get();
    //print(salvar);
    img.save('photo' + x, 'jpg');
    verifica = !verifica;
    x++
    //print(salvar);
    myCanvas.clear();
  }

}

// We got a new stream!
// We got a new stream!
function gotStream(stream, id) {
  // This is just like a video/stream from createCapture(VIDEO)
  otherCanvas = stream;
  
  //otherCanvas.id is the unique identifier for this peer
  //otherCanvas.hide();
}

function gotData(data, id) {
  print(id + ":" + data);
  img = otherCanvas.get();
  gatilho = !gatilho;
}

function gotDisconnect(id) {
  print(id + ": disconnected");
  img.reset();
}
