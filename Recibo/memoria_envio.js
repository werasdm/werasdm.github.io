// This is a test of the data sharing capabilities of p5LiveMedia webrtc library and associated service.
// Open this sketch up 2 times to send data back and forth
let gatilho = false;
let verifica = true;
let x = 0;
let y = 10;
let img;
let envio;

let p5lm;

function setup() {
  p5lm = new p5LiveMedia(this, "DATA", null, "amorinhabjork");
  p5lm.on('data', gotData);
  p5lm.on('disconnect', gotDisconnect);
}

function draw() {
  if(img){
   image(img, 0, 0, width, height); 
  }
  
  if (gatilho == verifica) {
    img.save('photo' + x, 'png');
    verifica = !verifica;
  }
}

function gotDisconnect(id) {
  print(id + ": disconnected");
}

function gotData(data, id) {
  print(id + ":" + "recebido");
  
  // If it is JSON, parse it
  let d = JSON.parse(data);
  print(d.a);
  print(x);
  img = loadImage(d.a, '');
  x++;
  gatilho = !gatilho;
}
