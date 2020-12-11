const sprites = new Image(); // Criando uma imagem na memória
sprites.src = './sprites/sprites.png';

const canvas = document.querySelector("canvas")
const context = canvas.getContext('2d'); // dar o contexto de 2d para o canvas


const flappyBird = {
    sourceX: 0,
    sourceY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,

    desenha(){
        context.drawImage(
            sprites,  //image
            flappyBird.sourceX, flappyBird.sourceY,     //spriteX, spriteY
            flappyBird.width, flappyBird.height,        //sWidth, sHeight -> tamanho
            flappyBird.x, flappyBird.y,                 //dx, dy,
            flappyBird.width, flappyBird.height         //dWidth, dHeight  
        );    
    }
}

const floor = {
    sourceX: 0,
    sourceY: 600,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 112,

    desenha(){
        context.drawImage(
            sprites,  //image
            floor.sourceX, floor.sourceY,     //spriteX, spriteY
            floor.width, floor.height,        //sWidth, sHeight -> tamanho
            floor.x, floor.y,                 //dx, dy, 
            floor.width, floor.height         //dWidth, dHeight  
        );    

        context.drawImage(
            sprites,  //image
            floor.sourceX, floor.sourceY,     //spriteX, spriteY
            floor.width, floor.height,        //sWidth, sHeight -> tamanho
            (floor.x + floor.width), floor.y, //dx, dy,
            floor.width, floor.height         //dWidth, dHeight  
        );    
    }
}

const background = {
    sourceX: 390,
    sourceY: 0,
    width: 276,
    height: 202,
    x: 0,
    y: canvas.height - 205,

    desenha(){
        context.fillStyle = '#70c5ce'
        context.fillRect(0, 0, canvas.width, canvas.height)//o "0,0" é de onde vai começar e canvas width e heigth é de onde vai preencher

        context.drawImage(
            sprites,  //image
            background.sourceX, background.sourceY,     //spriteX, spriteY
            background.width, background.height,        //sWidth, sHeight -> tamanho
            background.x, background.y,                 //dx, dy, 
            background.width, background.height         //dWidth, dHeight  
        );  

        context.drawImage(
            sprites,  //image
            background.sourceX, background.sourceY,     //spriteX, spriteY
            background.width, background.height,        //sWidth, sHeight -> tamanho
            (background.x + background.width), background.y,                 //dx, dy, 
            background.width, background.height         //dWidth, dHeight  
        );    
    }
}


function loop() {

    background.desenha();
    flappyBird.desenha(); // Funciona como se fosse um fps, desenha o flappyBird toda vez que a função é chamada.
    floor.desenha();
    requestAnimationFrame(loop); //desenha de forma infinita
}

loop();