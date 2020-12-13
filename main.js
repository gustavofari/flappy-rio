const sprites = new Image(); 
sprites.src = './sprites/sprites.png';

const canvas = document.querySelector("canvas")
const context = canvas.getContext('2d'); 

function fazColisao(flappyBird, floor){
    const flappyBirdY = flappyBird.y + flappyBird.height;
    const floorY = floor.y;

    if(flappyBirdY >= floorY){
        return true;
    }
    else{
        return false
    }
}



const floor = {
    sourceX: 0,
    sourceY: 600,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 110,

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


function createFlappyBird(){

    const flappyBird = {
        sourceX: 0,
        sourceY: 0,
        width: 33,
        height: 24,
        x: 10,
        y: 50,
        gravity: 0.25,
        velocity: 0,
        jumping: 5,
        
        jump(){
            flappyBird.velocity = -flappyBird.jumping;
        },
        
        update(){
            
            if(fazColisao(flappyBird, floor) == true){
                changeScreen(screen.INITIAL);
            };
    
            flappyBird.velocity = this.velocity + this.gravity;
            flappyBird.y += this.velocity;
    
        },
    
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

    return flappyBird;
};


const messageGetReady = {
    sourceX: 134,
    sourceY: 0,
    width: 174,
    height: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 100,

    draw(){
        context.drawImage(
            sprites, 
            messageGetReady.sourceX, messageGetReady.sourceY,     
            messageGetReady.width, messageGetReady.height,       
            messageGetReady.x, messageGetReady.y,               
            messageGetReady.width, messageGetReady.height         
        );    
    }

}
//
// [SCREEN]
//

const global = {};
let screenActive = {};
function changeScreen(newScreen){
    screenActive = newScreen;

    if (screenActive.inicialize){
        screenActive.inicialize();
    }
}



const screen = {
    INITIAL: {
        inicialize(){
            global.flappyBird = createFlappyBird();
           },

        draw(){
            background.draw();
            floor.draw();
            messageGetReady.draw();
            global.flappyBird.draw();
        },

        click(){
            changeScreen(screen.GAME);

        },

        update(){
            
        }
    }
};

screen.GAME = {
    
    draw(){
        background.draw();
        global.flappyBird.draw()
        floor.draw();
        
    },

    click(){
        global.flappyBird.jump();
       
    },

    update(){
        global.flappyBird.update();
    },

 };

function loop() {

    screenActive.draw();
    screenActive.update();

    requestAnimationFrame(loop); 

}

window.addEventListener('click', () => {

    if (screenActive.click){
        screenActive.click()
    };


});

changeScreen(screen.INITIAL);
loop();