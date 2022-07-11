# Master's thesis Information Studies, track: Information Systems

*Author: Layla Hoogeveen, University of Amsterdam, submitted in partial fulfillment for the degree of master of science*
*This study was completed in collaboration with [Q42](https://www.q42.nl/).*

[Link to working prototype](https://layla.nl/kruiswoord/)

## Demo

Watch the demo video on YouTube:

[<img src="https://i.ytimg.com/vi/oZrvZQ0NdCM/maxresdefault.jpg" width="50%">](https://www.youtube.com/watch?v=oZrvZQ0NdCM "Demo video using screen reader")

### App description

This repository contains the code for a crossword puzzle that can be solved alone, or in cooperation with others, regardless of their vision. Its auditory representation was designed to be independent of one's cognitive mapping abilities; those who are not able to discern letters and numbers in a grid can view the clues as a list. This puzzle presents a list of clues, along with the number of letters of which the solution consists. The puzzle uses an algorithm to add this number to the clues if it is not present in the clue itself.

Whenever users enter a letter into an input field, the letters appear in the grid. If a move causes to overwrite an existing letter on the board and the user undoes the move by pressing the backspace key, the original letter will appear again. After navigating away from the input field, new letters in intersecting words are announced. All letters that are filled in are read as separate letters by the screen reader, followed by a "beep sound" if a tile is empty (e.g. "P beep beep Z Z beep E"). Words without gaps are read as entire words. Visually the gaps look like dashes, but screen readers parse their aria-labels in which each dash is replaced by the word "beep". 

The puzzle parses JSON crosswords and cryptograms and employs a Python script to append extra information to these files, namely the grid coordinates of all letters. Client-side JavaScript functions read the puzzle's height and width from the JSON file and creates a grid to match these dimensions.

All clues are contained in a single list that does not differentiate between horizontal and vertical directions of words. When turning the two lists into one list, the Python script in this prototype made sure that there were no duplicate numbers (e.g. 5 horizontal *and* 5 vertical) and implemented continuous numbering. To still cater to sighted users, tiles light up when navigating to the input field, showing the direction of the word in question.

This puzzle was specially designed to fit the target group's needs: simple though challenging, familiar concepts, Dutch, a high replay value and, lastly, it is a word puzzle. The high replay value is supported by the parsability of existing crosswords, which could allow users to do a new crossword every day. The puzzle is more challenging than existing audio crosswords, as users do not immediately receive feedback on the correctness of their words. Treating clues as loose elements defeats the purpose of a crossword. To declutter the clue list, users are allowed to temporarily hide clues by moving them to another column, e.g. whenever they think their answer is correct. Clues can always be moved back to the main list and words in the hidden column are not "frozen"; their value can still change as a result of moves in intersecting words.

### Technical details
**Framework:** Node.js

**Programming languages used:** JavaScript, Python
