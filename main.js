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

// Tela de início
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width - 174) / 2,
    y: (canvas.height - 240) / 2,

    desenha() {     
        contexto.drawImage(
            sprites,  //image 
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,  //Sprite X, Sprite Y
            mensagemGetReady.largura, mensagemGetReady.altura,   //sWidth, sHeight  -> Tamanho do recorte na sprite
            mensagemGetReady.x, mensagemGetReady.y,              //dx, dy, 
            mensagemGetReady.largura, mensagemGetReady.altura,   //dWidth, dHeight  -> Tamanho do sprite
        );
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

//
// Telas
//
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
}

const telas = {
    INICIO: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            mensagemGetReady.desenha();
    
        },
        click() {
            mudaParaTela(telas.JOGO);
        },
        atualiza() {

        }
    }
}

telas.JOGO = {                       // Quando inicia o jogo
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    atualiza() {
        flappyBird.atualiza();
    }
}

function loop() {
    
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);  
}

window.addEventListener('click', () => {
    if(telaAtiva.click){
        telaAtiva.click()   //caso for clicado, chama a função click que muda para tela JOGO.
       
    }

    
})

mudaParaTela(telas.INICIO);
loop();
 