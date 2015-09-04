lindenmayer({
    start: 'A',
    rules: {
        B: 'BB',
        A: 'B{+A}-A'
    },
    angle: 45,
    size: 5,
    iterations: 6
});
