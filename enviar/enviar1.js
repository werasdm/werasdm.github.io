let otherCanvas;
let p5l;

let input;
let bg;
let img;
let comparabotao = true;
let mudancabotao = false;
let envio;
let button;
let tempo=0;
let tempo2=0;
let st=false;
let fechaaguia;
let acabou = false;


//redimencionar a imagem
let picV;
let picH;
let w, h;



function setup() {
  let myCanvas = createCanvas(500, 500);
  bg = loadImage("assets/BG.png");
  fechaaguia = loadImage("assets/Salvo.png");
  input = createFileInput(handleFile);
  input.position(150, 350);
  button = createButton('Enviar');
  button.position(150, 380);
  button.mousePressed(function() {
    mudancabotao = !mudancabotao;
    button.style('background-color', '#8EFFB7');
    acabou = true;
  }
  );
  p5l = new p5LiveMedia(this, "CANVAS", myCanvas, "agoravai");
  p5lm = new p5LiveMedia(this, "DATA", null, "amorinhabjork");
  //p5lm.on('data', gotData);
  //p5l.on('stream', gotStream);
  print(p5l.socket);
}

function draw() {
  image(bg, 0, 0, 500, 500);
  if (st == true) {
    tempo++;
  }
  if (tempo>45) {
    button.show();
  } else {
    button.hide();
  }
  if (img) {
    st=true;
    noStroke();
    rect(0, 0, 500);
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

    if (mudancabotao == comparabotao) {
      enviarImg();
      comparabotao = !comparabotao;
    }
  }
  if (acabou == true) {
    tempo2++;
  }
  if (tempo2 > 500) {
    image(fechaaguia, width/2, height/2, width, height);
    button.hide();
    input.hide();
  }
}



function enviarImg() {
  p5lm.send(JSON.stringify(p5l.socket.id));
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
