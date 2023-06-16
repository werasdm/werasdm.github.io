let otherCanvas;

let input;
let bg;
let img;
let comparabotao = true;
let mudancabotao = false;
let envio;
let button;
let t


//redimencionar a imagem
let picV;
let picH;
let w, h;



function setup() {
  let myCanvas = createCanvas(500, 500);
  bg = loadImage("assets/BG.png");
  input = createFileInput(handleFile);
  input.position(150, 350);
  button = createButton('enviar');
  button.position(0, 50);
  button.mousePressed(function(){
    mudancabotao = !mudancabotao;
  });
  let p5l = new p5LiveMedia(this, "CANVAS", myCanvas, "e4LTqKI8Q");
  p5lm = new p5LiveMedia(this, "DATA", null, "amorinhabjork");
  //p5lm.on('data', gotData);
  //p5l.on('stream', gotStream);
}

function draw() {
 image(bg,0,0,500,500);
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
    
    if(mudancabotao == comparabotao){
      enviarImg();
      comparabotao = !comparabotao;
    }
   }
}


function enviarImg() {
  p5lm.send(JSON.stringify('a'));
  print("enviou2");
}


function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}
