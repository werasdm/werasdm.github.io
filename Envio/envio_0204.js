// This is a test of the data sharing capabilities of p5LiveMedia webrtc library and associated service.
// Open this sketch up 2 times to send data back and forth
let input;
let img;
let x = 0;
let y = false;
let envio;
let button;
let dataToSend;

let p5lm;

function setup() {
  let myCanvas = createCanvas(500, 500);
  input = createFileInput(handleFile);
  input.position(0, 0);
  button = createButton('enviar');
  button.position(0, 50);
  button.mousePressed(function(){
    y = !y;
  });
  p5lm = new p5LiveMedia(this, "DATA", null, "uninhobananamovelvimiv");
  p5lm.on('data', gotData);
  p5lm.on('disconnect', gotDisconnect);
}

function draw() {
  background(220);
   if (img) {
    imageMode(CENTER);
    image(img, 250, 250);
  }
    if(y){
  desenharBola();
  }
}

function gotDisconnect(id) {
  print(id + ": disconnected");
}

function gotData(data, id) {
  print(id + ":" + data);
  
  // If it is JSON, parse it
  let d = JSON.parse(data);
  x = d.x;
  y = d.y;
}


function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    envio = file;
    img.hide();
  } else {
    img = null;
  }
  dataToSend = {a: file.data, b: file.name};
}

//function enviarImg() {
//  // Have to send string
//  p5lm.send(JSON.stringify(dataToSend));
  
//}

function desenharBola(){
 circle(250,250,250); 
}
