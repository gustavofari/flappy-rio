const sprites = new Image(); 
sprites.src = './sprites/sprites.png';

const canvas = document.querySelector("canvas")
const context = canvas.getContext('2d'); 

const flappyBird = {
    sourceX: 0,
    sourceY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,

    draw(){
        context.drawImage(
            sprites, 
            flappyBird.sourceX, flappyBird.sourceY,     
            flappyBird.width, flappyBird.height,       
            flappyBird.x, flappyBird.y,               
            flappyBird.width, flappyBird.height         
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

    draw(){
        context.drawImage(
            sprites,  
            floor.sourceX, floor.sourceY,     
            floor.width, floor.height,        
            floor.x, floor.y,                  
            floor.width, floor.height         
        );    

        context.drawImage(
            sprites,  
            floor.sourceX, floor.sourceY,     
            floor.width, floor.height,       
            (floor.x + floor.width), floor.y, 
            floor.width, floor.height        
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

    draw(){
        context.fillStyle = '#70c5ce'
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.drawImage(
            sprites,  
            background.sourceX, background.sourceY,     
            background.width, background.height,        
            background.x, background.y,           
            background.width, background.height       
        );  

        context.drawImage(
            sprites,  //image
            background.sourceX, background.sourceY,  
            background.width, background.height,      
            (background.x + background.width), background.y,           
            background.width, background.height     
        );    
    }
}


function loop() {

    background.draw();
    flappyBird.draw(); 
    floor.draw();
    requestAnimationFrame(loop); 
}

loop();