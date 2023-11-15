# A7: Data Essay

### Your Glitch link

https://genmeth.dilanxd.com/a7

Hosted on GitHub, not Glitch.

---

## Essay reading #1

### Title, author and link

"Seeing Theory" by Daniel Kunin at Brown University

"Basic Probability" chapter

https://seeing-theory.brown.edu/basic-probability/index.html

### Main argument this essay is making

This essay aims to teach the reader about the basics of probability. It uses interactive visualizations to help the reader understand the concepts.

### Outline

- Chance Events
  - Randomness in everyday events and the mathematical framework of probability
  - Uses a coin toss to illustrate the concept of probability
- Expectation
  - The center of the distribution of random variables
  - Uses a dice roll to illustrate the concept of expectation
- Variance
  - The spread of the distribution of random variables
  - Uses drawing cards to illustrate the concept of variance

Built with D3.js

### What worked well in this?

The visuals were very easy to use and understand. They provided great examples of the concepts being taught.

---

## Essay reading #2

### Title, author and link

"Beat Basics" by Megan Vo

https://megan-vo.github.io/basic-beats/

### Main argument this essay is making

This essay explores the difference between the 3/4 and 6/8 time signatures using John Varney's rhythm wheel.

### Outline

- Introduction
  - Overview of two rhythms represented by grey circles
  - Visual and aural differences noted
- The Basics
  - Definition of rhythm as a regularly repeating event
  - Assigning stresses/accents to beats to form rhythms
- Breaking it Down
  - 3/4 time signature
    - Counts as "1 and 2 and 3 and"
    - Divides circle into three groups of two
  - 6/8 time signature
    - Counts as "1 and ah 2 and ah"
    - Divides circle into two groups of three
- Let's Listen!
  - Example of 3/4 time: Tchaikovsky's "Waltz of Flowers"
  - Example of 6/8 time: Mozart's Piano Concerto No. 23
- Why Stop Here?
  - Note on further topics to explore like time signature numbers

Built with Tone.js and Idyll

### What worked well in this?

Everything was tightly integrated and worked well together. The visuals and audio were very valuable along with its direct connection to certain example pieces of music. The rhythm wheel visuals playing alongside the music worked very well.

---

## Essay reading #3

### Title, author and link

"Parable of the Polygons" by Vi Hart and Nicky Case

https://ncase.me/polygons/

### Main argument this essay is making

The essay talks about how small individual biases can lead to large societal issues.

### Outline

- Introduction of simulation
  - Polygons can only move if less than 1/3 neighbors are same shape
  - Run simulation to see outcome
- Increasing individual bias leads to more segregation
  - Adjust slider to increase bias above 33% threshold
- Removing bias is not enough
  - Starting segregated, lowering bias does not integrate on its own
- Adding small preference for diversity integrates populations
  - Giving polygons preference for more than 10% unlike neighbors mixes all
- Larger scale implications of small biases
  - References academic research showing how subtle biases compound over time
- Real world applications
  - Creating equality requires active effort to overcome past biases
  - Individual actions like diversifying networks can have large impacts
- Inspiration, related research, translations
  - Cites academic works on segregation modeling and gender bias
  - Links to other explorations and translations of concept
- Conclusion
  - Subtle biases create large societal issues if unaddressed over many choices

### What worked well in this?

The visuals make it very easy to understand how small choices can lead to large societal problems or solutions.

---

## Your essay

### What is your essay about?

The essay explores the distribution and point system of Scrabble, a word game where players use letter tiles to form words on a game board.

### Where did you get your data? (link or source)

https://github.com/dariusk/corpora/blob/master/data/games/scrabble.json

### Where did this data come from originally? Who collected it?

The data on the Corpora repository by Darius Kazemi and contributors.

### What information is in your data? (relevant fields, metadata, etc)

Tile distribution and points for the English-language edition of Scrabble.

### How many sections do you have?

3

### What technologies and approaches (Vue, P5/canvas, d3, bar graphs, force directed diagrams, emoji, text-coloring, etc) did you use for your visualizations?

Vue.js, CSS, bar charts with icons, buttons and text inputs

### Main argument your essay is making

Scrabble is a game that combines skill and chance. It involves strategic elements of balancing tile choices, understanding word formations, and optimizing scores while also having a luck element when drawing tiles.

### Outline your essay like you did for the essays you read

- Introduction
  - Overview of Scrabble and its rules
  - Visual of Scrabble tiles with letters and points
- Point and Tile Distribution
  - Explanation of point and tile distribution and how it affects word possibilities and gameplay
  - Visuals of point and tile distribution for selected letter
- Score and Chance
  - Explanation of gameplay and its strategy and luck
  - Visual with points and chance of drawing tiles for a word

### Which two sections have controls, and what can the user explore with them?

The second section on point and tile distribution has a button for each letter. Selecting a letter will display the letter in the form of a Scrabble tile visualize the point and tile distribution for that letter using a bar chart with icons.

The third section on score and chance has a text input for a word. Entering a word will display it in the form of Scrabble tiles and show the score and chance of drawing tiles for that word.

### What is one interesting thing you discovered in your data?

I learned the distribution of letters in Scrabble. I did not know how many of each letter there were in the game.

---

### What is one new skill that you gained during this project?

I gained experience using Vue.js.

### Glitch handles of people in class you got help from, and their help, (or help you gave!)

Not applicable for this project

### Assets you got from online and why you have permission to include them

- [`scrabble.json` from Corpora](https://github.com/dariusk/corpora/blob/master/data/games/scrabble.json) ([LICENSE](https://github.com/dariusk/corpora/blob/master/README.md#license))

### Online help, including ChatGPT

- ChatGPT helped generate some parts of the text and build parts of some outlines
