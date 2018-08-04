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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player()  {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Setting the Enemy initial location (you need to implement)
    this.x = 225;
    this.y = 500;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
/*     // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
    } */
};

Player.prototype.handleInput = function(direction) {
    let scale = 10;
    if (direction == "left") {
        this.x -= scale;
    }
    if (direction == "up") {
        this.y -= scale;
    }
    if (direction == "right") {
        this.x += scale;
    }
    if (direction == "down") {
        this.y += scale;
    }
}

// Draw the enemy on the screen, required method for game
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
