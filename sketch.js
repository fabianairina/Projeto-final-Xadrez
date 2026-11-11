let mic;
let colunas = 12;
let linhas = 12;
let tamanhoCasa = 35; 
let limiteSom = 0.01; 
let offsetOnda = 0;

function setup() {
  createCanvas(600, 600);


  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(10, 10, 15);
  let vol = mic.getLevel();


  if (vol > limiteSom) {
    offsetOnda += vol * 15; 
  } else {
    offsetOnda += 0.02;     
  }
  let largTabuleiro = colunas * tamanhoCasa;
  let altTabuleiro = linhas * tamanhoCasa;
  let inicioX = (width - largTabuleiro) / 2;
  let inicioY = (height - altTabuleiro) / 2;
  let meioX = width / 2;
  let meioY = height / 2;

  for (let i = 0; i < colunas; i++) {
    for (let j = 0; j < linhas; j++) {
      let x = inicioX + (i * tamanhoCasa);
      let y = inicioY + (j * tamanhoCasa);

      let d = dist(x + tamanhoCasa / 2, y + tamanhoCasa / 2, meioX, meioY);

  
      let onda = sin(d * 0.04 - offsetOnda);

      let brilho = map(onda, -1, 1, 10, 255);
    
    
      if (vol > limiteSom * 2) {
        brilho = constrain(brilho * 1.3, 0, 255);
      }

  
      let r = brilho;
      let g = brilho * 0.75; 
      let b = brilho * 0.25; 


      fill(r, g, b);
      noStroke();
      
      rect(x + 2, y + 2, tamanhoCasa - 4, tamanhoCasa - 4, 4);
    }
  }


  fill(255, 150, 0, 200);
  rect(width / 2 - 100, height - 20, map(vol, 0, 0.3, 0, 200), 6, 3);
}


function mousePressed() {
  userStartAudio();
}
