console.log('[gustavofari] Flappy Rio');

const sprites = new Image();
sprites.src = './sprites/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d'); //contexto 2d

// Chão
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112, 

    desenha() {
        contexto.drawImage(
           sprites,  //image 
           chao.spriteX, chao.spriteY,   //Sprite X, Sprite Y
           chao.largura, chao.altura,    //sWidth, sHeight  -> Tamanho do recorte na sprite
           chao.x, chao.y,               //dx, dy, 
           chao.largura, chao.altura,    //dWidth, dHeight  -> Tamanho do sprite
        )

        contexto.drawImage(
            sprites,  //image 
            chao.spriteX,chao.spriteY,      //Sprite X, Sprite Y
            chao.largura,chao.altura,       //sWidth, sHeight  -> Tamanho do recorte na sprite
            (chao.x + chao.largura), chao.y, //dx, dy, 
            chao.largura, chao.altura,      //dWidth, dHeight  -> Tamanho do sprite
        )
    }
}

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
    chao.desenha();


    requestAnimationFrame(loop); 
}

loop();

