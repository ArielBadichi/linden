lindenmayer({
    start: 'FA',
    rules: {
        FA: 'FB-FA-FB',
        FB: 'FA+FB+FA'
    },
    angle: 60,
    size: 2,
    iterations: 6
});
