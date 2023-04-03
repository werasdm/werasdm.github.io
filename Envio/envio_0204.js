// This is a test of the data sharing capabilities of p5LiveMedia webrtc library and associated service.
// Open this sketch up 2 times to send data back and forth
let input;
let img;
let comparabotao = true;
let mudancabotao = false;
let envio;
let button;


//redimencionar a imagem
let picV;
let picH;
let w, h;

let p5lm;

function setup() {
  let myCanvas = createCanvas(350, 350);
  input = createFileInput(handleFile);
  input.position(0, 0);
  button = createButton('enviar');
  button.position(0, 50);
  button.mousePressed(function(){
    mudancabotao = !mudancabotao;
  });
  p5lm = new p5LiveMedia(this, "DATA", null, "amorinhabjork");
  p5lm.on('data', gotData);
  p5lm.on('disconnect', gotDisconnect);
}

function draw() {
  background(220);
  if (img) {
    imageMode(CENTER);
    
    //Redimencionar a imagem  
    // Vertical
    if (img.height > img.width) {
      hRatio = height / img.height;
      h = img.height * hRatio;
      w = img.width * hRatio;
      image(img, width / 2, height / 2, w, h);
    // Horizontal
    } else if (img.width > img.height) {
    let wRatio = width / img.width;
    w = img.width * wRatio;
    h = img.height * wRatio;
    image(img, width / 2, height / 2, w, h);
    // 1:1
    } else {
    image(img, width/2, height/2, width, height);
    }
   }
    if(mudancabotao == comparabotao){
    enviarImg();
    comparabotao = !comparabotao;
  }
}

function gotDisconnect(id) {
  print(id + ": disconnected");
}

function gotData(data, id) {
  print(id + ":" + data);
  
  // If it is JSON, parse it
  let d = JSON.parse(data);

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
}

function enviarImg() {
  // Have to send string
  let dataToSend = { a: canvas.toDataURL('image/png')};
  print(dataToSend);
  print("enviou");
  p5lm.send(JSON.stringify(dataToSend));
  print("enviou2");
}
