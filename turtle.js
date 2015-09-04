function Turtle(onscreen) {
    this._onscreen = onscreen;
    this._position = [0.0, 0.0];
    this._angle = 0.0;
    this._drawing = true;
    this._surface = this._newSurfaceLayer();
    this._indicator = this._newIndicatorLayer();
    this._queue = [];
    this._forResume = null;
    this._states = [];
    this._speed = 10;
    this._show = true;
}

Turtle.prototype._newLayer = function(strokeStyle, fillStyle) {
    var layer = document.createElement("canvas");
    layer.width = this._onscreen.width;
    layer.height = this._onscreen.height;

    var c = layer.getContext("2d");
    c.translate(layer.width / 2, layer.height / 2);
    c.scale(1, -1);
    c.lineWidth = 1;
    c.strokeStyle = strokeStyle;
    if (fillStyle) {
        c.fillStyle = fillStyle;
        fill(layer);
    }

    return layer;
};

Turtle.prototype._newSurfaceLayer = function() {
    var layer = this._newLayer("white", "#000040");
    var c = layer.getContext("2d");
    c.globalAlpha = 1;
    c.globalCompositionOperation = "source-over";
    return layer;
};

Turtle.prototype._newIndicatorLayer = function() {
    return this._newLayer("#ffff40");
};

Turtle.prototype._drawIndicator = function() {
    clear(this._indicator);
    var c = this._indicator.getContext("2d");
    c.save();
    c.translate(this._position[0], this._position[1]);
    c.rotate(rad(this._angle));
    c.beginPath();
    c.moveTo(0, 5);
    c.lineTo(-6, -7);
    c.lineTo(6, -7);
    c.closePath();
    c.stroke();
    c.restore();
};

Turtle.prototype.update = function() {
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
    if (this._show) {
        c.drawImage(this._indicator, 0, 0);
    }
};

Turtle.prototype.forward = enqueued(function(k) {
    if (this._speed > 0) {
        var s = k > 0 ? 1 : -1;
        this.repeat(k, function() {
            this._forward(s);
        });
    } else {
        this._forward(k);
    }
});

Turtle.prototype._forward = function(k) {
    if (this._drawing) {
        var c = this._surface.getContext("2d");
        c.save();
        c.translate(this._position[0], this._position[1]);
        c.rotate(rad(this._angle));
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(0, k);
        c.stroke();
        c.restore();
    }

    this._position[0] += k * Math.cos(rad(this._angle + 90));
    this._position[1] += k * Math.sin(rad(this._angle + 90));
};

Turtle.prototype.right = enqueued(function(k) {
    if (this._speed > 0) {
        var s = k > 0 ? 1 : -1;
        this.repeat(k, function() {
            this._angle -= s;
        });
    } else {
        this._angle -= k;
    }
});

Turtle.prototype.left = function(k) {
    return this.right(-k);
};

Turtle.prototype.backward = function(k) {
    return this.forward(-k);
};

Turtle.prototype.repeat = function(k, fn) {
    for (var i = 0; i < Math.floor(Math.abs(k)); i++) {
        this._enqueue(fn);
    }
};

Turtle.prototype.call = function(fn) {
    this._enqueue(fn);
};

Turtle.prototype.penup = enqueued(function() {
    this._drawing = false;
});

Turtle.prototype.pendown = enqueued(function() {
    this._drawing = true;
});

Turtle.prototype.pencolor = enqueued(function(c) {
    this._surface.getContext("2d").strokeStyle = c;
});

Turtle.prototype.clearscreen = enqueued(function() {
    fill(this._surface);
    this._setposition(0.0, 0.0);
    this._angle = 0.0;
    this._surface.getContext("2d").strokeStyle = "white";
});

Turtle.prototype.setposition = enqueued(function(x, y) {
    this._setposition(x, y);
});

Turtle.prototype._setposition = function(x, y) {
    this._position[0] = x;
    this._position[1] = y;
};

Turtle.prototype.pushstate = enqueued(function() {
    this._states.push({
        pos: [this._position[0], this._position[1]],
        angle: this._angle
    });
});

Turtle.prototype.popstate = enqueued(function() {
    var state = this._states.pop();
    if (!state) {
        return;
    }
    this._setposition(state.pos[0], state.pos[1]);
    this._angle = state.angle;
});

Turtle.prototype.setangle = enqueued(function(angle) {
    this._angle = angle;
});

Turtle.prototype.hide = enqueued(function() {
    this._show = false;
});

Turtle.prototype.show = enqueued(function() {
    this._show = true;
});

Turtle.prototype._enqueue = function(fn) {
    this._queue.push(function() {
        var next = this._queue;
        this._queue = [];
        fn.call(this);
        this._queue = this._queue.concat(next);
    }.bind(this));
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
    if (this._forResume) {
        return;
    }
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

// Minor utilities

function rad(deg) {
    return Math.PI / 180 * deg;
}

function fill(layer) {
    doLayer(layer, "fillRect");
}

function clear(layer) {
    doLayer(layer, "clearRect");
}

function doLayer(layer, op) {
    var c = layer.getContext("2d");
    c[op].call(c, layer.width / -2, layer.height / -2,
               layer.width, layer.height);
}

function enqueued(fn) {
    return function() {
        var args = arguments;
        this._enqueue(function() {
            fn.apply(this, args);
        });
    };
}
