# A3: Drawing Tools

## What do you want the user to feel when using these tools? What mood is this for? What is the user trying to do?

The user should not feel stressed when using these tools since the functionality is very limited. The mood is chill and simple. If they need to jot something down real quick, they can do so.

## Describe your eraser. What does it do?

The **Eraser** erases content from the canvas. It works by drawing black over existing content.

## Describe your 1st tool. What does it do? How is it used?

The first tool is called **Wild Pencil**. It draws continuous line segments of varying color within a range of the set primary color. Draw by clicking and dragging. The primary color and thickness can be changed.

## Describe your 2nd tool. What does it do? How is it used?

The second tool is called **Emoji**. It draws random emojis discretely around a point. Draw by clicking and dragging. The primary color and thickness can be changed. The thickness changes both the size of the emojis and the radius of the area in which they are drawn.

## Describe your 3rd tool. What does it do? How is it used?

The third tool is called **Spline**. It draws a continuous spline curve. Draw by clicking and dragging. It is one continuous shape, with each vertex being stored in state. The primary color and thickness can be changed.

## Describe your 4th tool. What does it do? How is it used?

The fourth tool is called **Spline Fill**. It draws a continuous spline curve but fills in the area between the curve and the starting point with the secondary color. Draw by clicking and dragging. It is one continuous shape, with each vertex being stored in state. The primary color, secondary color, and thickness can be changed.

## Which of your tools is continuous? What makes that different?

The **Wild Pencil**, **Spline**, and **Spline Fill** tools are continuous, as they use previous positions when drawing the next segment.

## Which of your tools uses begin/endshape? What are you doing with that feature?

The **Spline** and **Spline Fill** tools uses `beginShape` and `endShape` to draw continuous spline curves.

### What is one new skill that you gained during this project?

I gained more experience using p5.js to draw continuous shapes.

### Glitch handles of people in class you got help from, and their help, (or help you gave!)

Not applicable for this project

### Assets you got from online and why you have permission to include them

- [Font Awesome Free](https://fontawesome.com) ([LICENSE](https://fontawesome.com/license/free))

### Online help, including ChatGPT

- [p5.js reference](https://p5js.org/reference/)
