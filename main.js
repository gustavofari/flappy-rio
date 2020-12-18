const sprites = new Image(); 
sprites.src = './sprites/sprites.png';

const sound_HIT = new Audio();
sound_HIT.src = './effects/hit.wav';

const canvas = document.querySelector("canvas")
const context = canvas.getContext('2d'); 

function fazColisao(flappyBird, floor){
    const flappyBirdY = flappyBird.y + flappyBird.height;
    const floorY = floor.y;

    if(flappyBirdY >= floorY  ){
        return true;
    }
    
    
    return false
    
}



function createFloor(){
        const floor = {
        sourceX: 0,
        sourceY: 608,
        width: 224,
        height: 112,
        x: 0,
        y: canvas.height - 112,

        update(){
            const movingFloor = 1.3;

            floor.x -= movingFloor;

            if(floor.x < -13){
                floor.x = -1
            }
        },

        draw(){
            context.drawImage(
                sprites,  
                floor.sourceX, floor.sourceY,     
                floor.width, floor.height,        
                floor.x, floor.y,                  
                floor.width, floor.height         
            ),

            context.drawImage(
                sprites,  
                floor.sourceX, floor.sourceY,     
                floor.width, floor.height,       
                (floor.x + floor.width), floor.y, 
                floor.width, floor.height        
            )    
        }
    };

    return floor;
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
    },

    update(){
        console.log("ola")
    }
};


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
            
            if(fazColisao(flappyBird, global.floor) == true){
                sound_HIT.play();

                global.floor.x = 0
               setTimeout(() => {
                changeScreen(screen.INITIAL);

               }, 500);

               return;
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
            global.floor = createFloor();
           },

        draw(){
            background.draw();
            global.floor.draw();
            global.flappyBird.draw();
            messageGetReady.draw();

        },

        click(){
            changeScreen(screen.GAME);

        },

        update(){
            global.floor.update();
        }
    }
};

screen.GAME = {
    
    draw(){
        background.draw();
        global.floor.draw();
        global.flappyBird.draw() 
        
        
    },

    click(){
        global.flappyBird.jump();
       
    },

    update(){
        global.flappyBird.update();
        global.floor.update();
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