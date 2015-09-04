for (var i = 0; i < 360; i++) {
    turtle.pencolor([0, 45, 135].map(function(d) {
        return Math.floor(127 * Math.sin((i + d) * Math.PI / 180.0)) + 128;
    }));
    turtle.forward(1);
    turtle.left(1);
}
