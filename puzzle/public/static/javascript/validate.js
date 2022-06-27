function validate() {

    var blocks = document.getElementsByClassName('block');

    var points = 0;

    // Points for each letter than can be entered in grid
    var nonEmpty = document.getElementsByClassName('non-empty');
    var totalPoints = nonEmpty.length;

    // Iterate through all blocks, so solution list and block list have the same index
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].classList.contains('non-empty')) {
            if (getNonEmptyValue(blocks[i]) == getCorrectValue(i)) {
                points++;

            }
        }
    }
    showCorrection(points, totalPoints);
    
}

function getCorrectValue(index) {
// Return value that should be at given index in grid according to solution
    
    return puz.solution[index].toUpperCase();
}

function getNonEmptyValue(element) {
// Return value that was entered in the grid by user

    return element.querySelector('.value').innerHTML.toUpperCase();
}

// function highLightWrong() {

// }

function showCorrection(points, totalPoints) {
// Create message showing incorrect words
    
    var message = "<p>Je hebt " + points + " van de " + totalPoints + " punten behaald.</p>";
    var words = document.getElementsByClassName('answer');
    var words = Array.from(words).sort((a, b) => findFormIndex(a) - findFormIndex(b));
    
    var incorrectWords = [];

    for (var i = 0; i < words.length; i++) {   
        var word_index = findFormIndex(words[i]);
        if (words[i].value != null) {
          if (words[i].value.toUpperCase() != puz.allWords[word_index].toUpperCase()) {
                var user_value = words[i].value.toLowerCase();
                if (user_value == "") {
                    user_value = "geen";
                }
                incorrectWords.push([word_index + ". ", puz.allClues[word_index], user_value, puz.allWords[word_index].toLowerCase() ]);
            }
        }
    }
    message += "<p> Incorrecte woorden waren:";
    message += "<ul class='results_list'>";
    


    for (var i = 0; i < incorrectWords.length; i++) {   
        message += "<li class='results_list_item'><strong>";
        // Clue number
        message += incorrectWords[i][0];

        // Clue
        message += incorrectWords[i][1] + "</strong>" + ". Jouw antwoord: " ;

        // User's answer
        message += incorrectWords[i][2] + ". Juiste antwoord: ";

        // Solution
        message += incorrectWords[i][3];

        message += ".</li>";


    }
    message += "</ul>";
    message += "</p>";

    alertResult(message);


    // if ij
    
}


function alertResult(message) {
    
    // Get the modal
    var modal = document.getElementById("myModal");
    var modalText = document.getElementById("modal-text");
    var modalContent = document.querySelector("#modal-text");


    // Change message to show results
    modalText.innerHTML = (message);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-modal")[0];

    $(modalContent).hide();
    modal.style.visibility = "visible";
    $(modal).show();

    $(modalContent).show(100);

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        $(modalContent).hide();
        $(modal).hide();
        modal.style.display = "none";
        modal.style.visibility = "hidden";

    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        $(modalContent).hide();
        $(modal).hide();
        modal.style.display = "none";
        modal.style.visibility = "hidden";

        }
    }
}