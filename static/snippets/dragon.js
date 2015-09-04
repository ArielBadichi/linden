lindenmayer({
    start: 'FX',
    rules: {
        X: 'X+YF',
        Y: 'FX-Y'
    },
    angle: 90,
    size: 10,
    iterations: 10
});
