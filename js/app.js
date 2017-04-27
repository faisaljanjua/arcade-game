// Enemy
var allEnemies = [];
var emy = 3;
var emy_height = 50;

// canvas
var canRight = 400;
var canLeft = 0;
var canTop = 0;
var canBottom = 400;

//Player
var plyInitx = 200;
var plyInity = 400;

//Object
var objWidth = 50;
var objHeight = 50;



// Enemies our player must avoid
var Enemy = function (enemy_x, enemy_y, enemy_speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = enemy_x;
    this.y = enemy_y;
    this.speed = enemy_speed;
    this.width = objWidth;
    this.height = objHeight;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    this.checkCollissions();
    if (this.x > canRight) {
        this.x = Math.floor(Math.random() * ((-1500) - (-10) + 1) + (-100));
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollissions = function () {
    if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.y + player.height > this.y) {
        player.reset();
    }
};

var createEnemies = function () {
    for (var i = 0; i < emy; i++) {
        allEnemies.push(new Enemy(-40, 60 + 85 * i, Math.floor(Math.random() * 5 + 1) * 100));
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = "images/char-boy.png";
    this.x = plyInitx;
    this.y = plyInity;
    this.score = 0;
    this.width = objWidth;
    this.height = objHeight;
}

Player.prototype.update = function (dt) {
    if (this.y <= 0) {
        this.score += 1;
        this.reset();
    }
}

Player.prototype.reset = function () {
    this.x = plyInitx;
    this.y = plyInity;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(this.score, 450, 100);
}

Player.prototype.handleInput = function (key) {
    if (key === "left" && this.x > canLeft) {
        this.x = this.x - 100;
    } else if (key === "right" && this.x < canRight) {
        this.x = this.x + 100;
    } else if (key === "up" && this.y > canTop) {
        this.y = this.y - 85;
    } else if (key === "down" && this.y < canBottom) {
        this.y = this.y + 85;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

createEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
