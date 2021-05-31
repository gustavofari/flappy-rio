console.log('[gustavofari] Flappy Rio');

const sprites = new Image();
sprites.src = './sprites/sprites.png';

const canvas = document.querySelector('canvas'); // Pega o canvas no html
const contexto = canvas.getContext('2d'); //adiciona um contexto 2d

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
            chao.spriteX,chao.spriteY,       //Sprite X, Sprite Y
            chao.largura,chao.altura,        //sWidth, sHeight  -> Tamanho do recorte na sprite
            (chao.x + chao.largura), chao.y, //dx, dy, 
            chao.largura, chao.altura,       //dWidth, dHeight  -> Tamanho do sprite
        )
    }
}


// Fundo (Background)
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 276,
    altura: 150,
    x: 0,
    y: chao.y - 150,  
    desenha() {     
        contexto.fillStyle = '#50c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height) 

        contexto.drawImage(
            sprites,                                      //image 
            planoDeFundo.spriteX, planoDeFundo.spriteY,   //Sprite X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura,    //sWidth, sHeight  -> Tamanho do recorte na sprite
            planoDeFundo.x, planoDeFundo.y,               //dx, dy, 
            planoDeFundo.largura, planoDeFundo.altura,    //dWidth, dHeight  -> Tamanho do sprite
        );

        contexto.drawImage(
            sprites,                                                  //image 
            planoDeFundo.spriteX, planoDeFundo.spriteY,               //Sprite X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura,                //sWidth, sHeight  -> Tamanho do recorte na sprite
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,  //dx, dy, 
            planoDeFundo.largura, planoDeFundo.altura,                //dWidth, dHeight  -> Tamanho do sprite
        );
    }
};


// Bird
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,

    atualiza() {
        this.velocidade += this.gravidade;
        this.y += this.velocidade;
    },

    desenha() {     
        contexto.drawImage(
            sprites,  //image 
            flappyBird.spriteX, flappyBird.spriteY,  //Sprite X, Sprite Y
            flappyBird.largura, flappyBird.altura,   //sWidth, sHeight  -> Tamanho do recorte na sprite
            flappyBird.x, flappyBird.y,              //dx, dy, 
            flappyBird.largura, flappyBird.altura,   //dWidth, dHeight  -> Tamanho do sprite
        );
    }
}

function loop() {
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();
    flappyBird.atualiza();


    requestAnimationFrame(loop);  
}

loop();

