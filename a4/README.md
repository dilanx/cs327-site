# A4: Swarms

## Your Glitch link

https://genmeth.dilanxd.com/a4

Hosted on GitHub, not Glitch.

## Which systems behaved like you expected? Which ones surprised you? In which ones did your initial idea evolve into something different?

The **Kiwi** and **Sun** systems behaved like I expected, since their art was the most simple. The **Salt and Pepper** and **Bouncy Balls** systems surprised me, since the way the salt and pepper subparticles were rendered and the way the bouncy balls interacted with each other was not perfect on the first try. Most ideas remained similar to my initial ideas.

## Describe your 1st system. What forces does it use? What is its emergent behavior? What debug draw info and controls did you add?

The first system is called **Salt and Pepper**. It uses wandering forces similar to that of the "ghost" starter system. However, it also keeps track of each individual salt and pepper subparticle to ensure that they do not flicker over time. A trail of salt and pepper is left behind as the particles move.

**Debug View**

- Force vector (blue arrow)
- Velocity vector (red arrow)
- Particle ID number (text)
- Particle current trail length (text)

**Controls**

- Trail Length: `0` to `128` by `1`
- Salt to Pepper Ratio: `0` to `1` by `0.1`
- Radius: `0` to `128` by `1`

## Describe your 2nd system. What forces does it use? What is its emergent behavior? What debug draw info and controls did you add?

The second system is called **Kiwi**. It uses forces similar to that of the "basic" starter system. The kiwi particles are attracted to the cursor. The kiwi particles look like kiwis and have emotion which is displayed by their facial expression.

**Debug View**

- Force vector (blue arrow)
- Velocity vector (red arrow)
- Emotion (happy emoji, neutral emoji, sad emoji)

**Controls**

- Emotion: `-1` to `1` by `1`

## Describe your 3rd system. What forces does it use? What is its emergent behavior? What debug draw info and controls did you add?

The third system is called **Bouncy Balls**. It does not use any forces. The balls bounce off of each other and the walls.

**Debug View**

- Velocity vector (red arrow)
- Collision with other balls (orange outline for 10 frames)
- Collision with walls (yellow outline for 10 frames)

**Controls**

- Number of Balls: `1` to `64` by `1`
- Ball Radius: `1` to `32` by `1`

## Describe your 4th system. What forces does it use? What is its emergent behavior? What debug draw info and controls did you add?

The fourth system is called **Sun**. It does not use any forces. The sun particles are a collection of translucent circles drawn on top of each other to give a glowing effect. Clicking on the canvas creates a new sun particle.

**Debug View**

- Detail (teal outline on each translucent circle)

**Controls**

- Radius: `1` to `128` by `1`
- Detail: `1` to `64` by `1`
- Translucency: `0.05` to `1` by `0.05`

## Which system has one particle uses particle-to-particle interaction? Explain how.

**Bouncy Balls**: balls can bounce off of each other

## Which system has particles that leave a trail or creates new particles

**Salt and Pepper**: particles leave a trail of more salt and pepper

## Which system interacts with user behavior, and how?

**Kiwi**: particles are attracted to the cursor

**Sun**: particles can be spawned by clicking

## What is one new skill that you gained during this project?

I gained experience using p5.js to draw moving shapes.

## Glitch handles of people in class you got help from, and their help, (or help you gave!)

Not applicable for this project

## Assets you got from online and why you have permission to include them

Not applicable for this project

## Online help, including ChatGPT

- [p5.js reference](https://p5js.org/reference/)
