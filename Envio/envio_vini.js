let input;
let img;
let w = 800;

function setup() {
  createCanvas(w,w);
  input = createFileInput(handleFile);
  input.position(0, 0);
  
}

function draw() {
  background(0);
  if (img) {
    imageMode(CENTER);
    image(img, w/2, w/2);
  }
}

function keyTyped() {
  if (key === 's') {
    let img2 = loadImage(img);
    img2.loadPixels();
    var data = canvas.toDataURL('image/png').replace(/data:image\/png;base64,/, '');
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }

//  function canvasToBase64 () {
//    var img = c[0].toDataURL('image/png'); // produces a base64 image string
//}
}
