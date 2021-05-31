console.log('[gustavofari] Flappy Rio');

const sprites = new Image();
sprites.src = './sprites/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d'); //contexto 2d


// Bird
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    desenha() {     
        contexto.drawImage(
            sprites,  //image 
            flappyBird.spriteX, flappyBird.spriteY,     //Sprite X, Sprite Y
            flappyBird.largura, flappyBird.altura,   //sWidth, sHeight  -> Tamanho do recorte na sprite
            flappyBird.x, flappyBird.y,   //dx, dy, 
            flappyBird.largura, flappyBird.altura,   //dWidth, dHeight  -> Tamanho do sprite
        );
    }
}


const 

function loop() {
    flappyBird.desenha();
    


    requestAnimationFrame(loop); 
}

loop();

