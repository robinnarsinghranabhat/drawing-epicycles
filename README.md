# drawing-epicycles

Using with epicycles (aka Combination of basic sin waves) to create complex function in p5 js as part of learning javascript. Thinking about this in my head was difficult. 


**How to use ?** <br/>
Just clone the repo and open index.html


**Experimentation** <br/>
To add new-waves, create a new `cycle` object and add it 
to the `draw` function. 

```js
function setup() {
  createCanvas(1500, windowHeight);
  frameRate(fps);
  // We add our cycles here 
  cycle1 = new Cycle(200, 300, 120 , 3);
  cycle2 = new Cycle(200, 450, 40 , 0.6);
  cycle3 = new Cycle(150, 100 , 20 , 0.3);
}
```
![Alt Text](epicycles_p5_gif.gif)


**Extra** <br/>
To ponder, imagine given that you are allowed to see only that complicated wave on the right side of gif, you were asked to decipher what sine functions generated those. 

Before you start to google fourier transform, try deeply thinking about your own approach to solution for a while. 