/* Inside the app.js file, you will need to implement the Player and the Enemy classes, using Object-Oriented JavaScript. Part of the code for the Enemy is provided to you, 
and you will need to complete the following:

The Enemy function, which initiates the Enemy by:
Loading the image by setting this.sprite to the appropriate image in the image folder (already provided)
Setting the Enemy initial location (you need to implement)
Setting the Enemy speed (you need to implement)
The update method for the Enemy
Updates the Enemy location (you need to implement)
Handles collision with the Player (you need to implement)
You can add your own Enemy methods as needed

You will also need to implement the Player class, and you can use the Enemy class as an example on how to get started. At minimum you should implement the following:

The Player function, which initiates the Player by:
Loading the image by setting this.sprite to the appropriate image in the image folder (use the code from the Enemy function as an example on how to do that)
Setting the Player initial location
The update method for the Player (can be similar to the one for the Enemy)
The render method for the Player (use the code from the render method for the Enemy)
The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular:
Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
You can add your own Player methods as needed.

Once you have completed implementing the Player and Enemy, you should instantiate them by:

Creating a new Player object
Creating several new Enemies objects and placing them in an array called allEnemies
 */


// Enemies our player must avoid
function Enemy(x,y,speed)  {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Setting the Enemy initial location (you need to implement)
    this.x = x;
    this.y = y;

    //Setting the Enemy speed (you need to implement)
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
    }

    let playerYMax = player.y + 142;
    let playerYMin = player.y + 61;
    let playerXMax = player.x + 84;
    let playerXMin = player.x + 18;

    let enemyYMax = this.y + 140;
    let enemyYMin = this.y + 80;
    let enemyXMax = this.x + 101;
    let enemyXMin = this.x + 5;
    
    let yCollision = (((playerYMax > enemyYMin) && (playerYMax < enemyYMax)) || ((playerYMin > enemyYMin) && (playerYMin < enemyYMax)) || (playerYMin < enemyYMin && playerYMax > enemyYMax));
    let xCollision = (((playerXMax > enemyXMin) && (playerXMax < enemyXMax)) || ((playerXMin > enemyXMin) && (playerXMin < enemyXMax)));

    if (yCollision && xCollision){
        player.sendHome();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function Player()  {
    this.sprite = 'images/char-boy.png'; //todo: why won't the other characters work?
    this.x = 205;
    this.y = 340;
};

Player.prototype.sendHome = function(dt) {
  //  let hit = 'images/hit.png'; //todo: why won't another image work? wanted to flash stars when hit.
  //  ctx.drawImage(Resources.get(hit), this.x, this.y);
    this.x = 205;
    this.y = 340;
   };

Player.prototype.update = function(dt) {
 //todo: not sure what supposed to do.
};

Player.prototype.handleInput = function(direction) {
    let scale = 10;
    if (direction == "left" && (this.x + 18 - scale > 10)) {
        this.x -= scale;
    }
    else if (direction == "up" && (this.y - scale > -20)) {
        this.y -= scale;
        console.log(this.y);
        if (this.y + 61 < 60) {
            console.log("you wonnnn");
            this.sendHome();
            document.querySelector(".win-container").classList.add('is-visible');
            setTimeout(function(){ document.querySelector(".win-container").classList.remove('is-visible'); }, 5000);
            allEnemies.push(new Enemy(Math.random()*300+1,Math.random()*200+1,Math.random()*80+1))
        }
    }
    else if (direction == "right" && (this.x + 84 + scale < (505 - scale)))  {
        this.x += scale;
    }
    else if (direction == "down" && (this.y + 142 + scale < (600 - scale))) {
        this.y += scale;
    }
}	

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(0,60,50),new Enemy(60,120,50),new Enemy(300,180,50)]; //
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
