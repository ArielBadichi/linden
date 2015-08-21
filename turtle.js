var isEmpty = require("lodash/lang/isEmpty");

function Turtle(onscreen) {
    this._onscreen = onscreen;
    this._position = [0.0, 0.0];
    this._angle = 0.0;
    this._drawing = true;
    this._surface = this.newSurfaceLayer();
    this._indicator = this.newIndicatorLayer();
    this._queue = [];
    this._forResume = null;
    this._states = [];
    this._speed = 10;
}

Turtle.prototype.newSurfaceLayer = function() {
    var layer = document.createElement("canvas");
    layer.width = this._onscreen.width;
    layer.height = this._onscreen.height;

    var c = layer.getContext("2d");
    c.lineWidth = 1;
    c.globalAlpha = 1;
    c.globalCompositionOperation = "source-over";
    c.fillStyle = "#000040";
    c.fillRect(0, 0, layer.width, layer.height);

    c.strokeStyle = "white";

    c.translate(layer.width / 2, layer.height / 2);
    c.scale(1, -1);

    return layer;
};

Turtle.prototype.newIndicatorLayer = function() {
    var layer = document.createElement("canvas");
    layer.width = this._onscreen.width;
    layer.height = this._onscreen.height;

    var c = layer.getContext("2d");
    c.lineWidth = 1;

    c.strokeStyle = "#ffff40";

    c.translate(layer.width / 2, layer.height / 2);
    c.scale(1, -1);

    return layer;
};

Turtle.prototype._drawIndicator = function() {
    var c = this._indicator.getContext("2d");
    c.clearRect(this._indicator.width / -2,
                this._indicator.height / -2,
                this._indicator.width,
                this._indicator.height);

    c.save();
    c.translate(this._position[0], this._position[1]);
    c.rotate(Math.PI / 180 * this._angle);
    c.beginPath();
    c.moveTo(0, 5);
    c.lineTo(-6, -7);
    c.lineTo(6, -7);
    c.closePath();
    c.stroke();
    c.restore();
};

Turtle.prototype.update = function() {
    if (isEmpty(this._queue)) {
        return;
    }
    for (var i = 0; i < Math.max(this._speed, 1); i++) {
        var task = this._queue.shift();
        if (!task) {
            return;
        }
        task();
    }
};

Turtle.prototype.draw = function() {
    this._drawIndicator();

    var c = this._onscreen.getContext("2d");
    c.drawImage(this._surface, 0, 0);
    c.drawImage(this._indicator, 0, 0);
};

Turtle.prototype.forward = function(k) {
    var move = function(s) {
        if (this._drawing) {
            var c = this._surface.getContext("2d");
            c.save();
            c.translate(this._position[0], this._position[1]);
            c.rotate(Math.PI / 180 * this._angle);
            c.beginPath();
            c.moveTo(0, 0);
            c.lineTo(0, s);
            c.stroke();
            c.restore();
        }

        this._position[0] += s * Math.cos(Math.PI / 180 * (this._angle + 90));
        this._position[1] += s * Math.sin(Math.PI / 180 * (this._angle + 90));
    }.bind(this);

    this.repeat(1, function() {
        if (this._speed > 0) {
            var s = k > 0 ? 1 : -1;
            this.repeat(Math.floor(Math.abs(k)), function() {
                move(s);
            });
        } else {
            move(k);
        }
    });

};

Turtle.prototype.right = function(k) {
    this.repeat(1, function() {
        if (this._speed > 0) {
            var s = k > 0 ? 1 : -1;
            this.repeat(Math.floor(Math.abs(k)), function() {
                this._angle -= s;
            });
        } else {
            this._angle -= k;
        }
    });
};

Turtle.prototype.left = function(k) {
    return this.right(-k);
};

Turtle.prototype.backward = function(k) {
    return this.forward(-k);
};

Turtle.prototype.repeat = function(k, fn) {
    for (var i = 0; i < k; i++) {
        this._enqueue(function() {
            var next = this._queue;
            this._queue = [];
            fn.call(this);
            this._queue = this._queue.concat(next);
        });
    }
};

Turtle.prototype.penup = function() {
    this._enqueue(function() {
        this._drawing = false;
    });
};

Turtle.prototype.pendown = function() {
    this._enqueue(function() {
        this._drawing = true;
    });
};

Turtle.prototype.pencolor = function(c) {
    this._enqueue(function() {
        this._surface.getContext("2d").strokeStyle = c;
    });
};

Turtle.prototype.clearscreen = function() {
    this._enqueue(function() {
        var c = this._surface.getContext("2d");
        c.fillRect(this._surface.width / -2,
                   this._surface.height / -2,
                   this._surface.width,
                   this._surface.height);
        this._position[0] = 0.0;
        this._position[1] = 0.0;
        this._angle = 0.0;
        this._surface.getContext("2d").strokeStyle = "white";
    });
};

Turtle.prototype.setposition = function(x, y) {
    this._enqueue(function() {
        this._position[0] = x;
        this._position[1] = y;
    });
};

Turtle.prototype.pushstate = function() {
    this._enqueue(function() {
        this._states.push({
            pos: [this._position[0], this._position[1]],
            angle: this._angle
        });
    });
};

Turtle.prototype.popstate = function() {
    this._enqueue(function() {
        if (isEmpty(this._states)) {
            return;
        }
        var state = this._states.pop();
        this._position[0] = state.pos[0];
        this._position[1] = state.pos[1];
        this._angle = state.angle;
    });
};

Turtle.prototype.setangle = function(angle) {
    this._enqueue(function() {
        this._angle = angle;
    });
};

Turtle.prototype._enqueue = function(fn) {
    this._queue.push(fn.bind(this));
};

Turtle.prototype.setspeed = function(s) {
    this._speed = s;
};

Turtle.prototype.stop = function() {
    this._queue = [];
    this._forResume = null;
    this._states = [];
};

Turtle.prototype.pause = function() {
    this._forResume = {
        queue: this._queue,
        states: this._states
    };
    this._queue = [];
};

Turtle.prototype.resume = function() {
    if (!this._forResume) {
        return;
    }

    this._queue = this._forResume.queue;
    this._states = this._forResume.states;
    this._forResume = null;
};

module.exports = Turtle;
