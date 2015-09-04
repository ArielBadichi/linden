lindenmayer({
   start: 'FX',
   rules: {
       X: 'F-{{X}+}+F{+FX}-X',
       F: 'FF'
   },
   angle: 25,
   size: 2,
   iterations: 5
});
