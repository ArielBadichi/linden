function Turtle(onscreen) {
    this._onscreen = onscreen;
    this._position = [0.0, 0.0];
    this._angle = 0.0;
    this._drawing = true;
    this._surface = this.newSurfaceLayer();
    this._indicator = this.newIndicatorLayer();
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

    c.strokeStyle = "#ffff40";

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
    c.lineTo(-10, -5);
    c.lineTo(10, -5);
    c.closePath();
    c.stroke();
    c.restore();
};

Turtle.prototype.update = function() {
};

Turtle.prototype.draw = function() {
    this._drawIndicator();

    var c = this._onscreen.getContext("2d");
    c.drawImage(this._surface, 0, 0);
    c.drawImage(this._indicator, 0, 0);
};

Turtle.prototype.forward = function(k) {
    if (this._drawing) {
        var c = this._surface.getContext("2d");
        c.save();
        c.translate(this._position[0], this._position[1]);
        c.rotate(Math.PI / 180 * this._angle);
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(0, k);
        c.stroke();
        c.restore();
    }

    this._position[0] += k * Math.cos(Math.PI / 180 * (this._angle + 90));
    this._position[1] += k * Math.sin(Math.PI / 180 * (this._angle + 90));
};

Turtle.prototype.right = function(k) {
    this._angle -= k;
};

Turtle.prototype.left = function(k) {
    this._angle += k;
};

Turtle.prototype.backward = function(k) {
    return this.forward(-k);
};

Turtle.prototype.repeat = function(k, fn) {
    for (var i = 0; i < k; i++) {
        fn.call(this);
    }
};

Turtle.prototype.penup = function() {
    this._drawing = false;
};

Turtle.prototype.pendown = function() {
    this._drawing = true;
};

Turtle.prototype.pencolor = function(c) {
    this._surface.getContext("2d").strokeStyle = c;
};

Turtle.prototype.clearscreen = function() {
    var c = this._surface.getContext("2d");
    c.fillRect(this._surface.width / -2,
               this._surface.height / -2,
               this._surface.width,
               this._surface.height);
    this._position = [0.0, 0.0];
    this._angle = 0.0;
};

Turtle.prototype.setposition = function(x, y) {
    this._position = [x, y];
};

Turtle.prototype.setangle = function(angle) {
    this._angle = angle;
};

module.exports = Turtle;
