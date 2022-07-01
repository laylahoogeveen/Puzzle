window.addEventListener('load', function() {
    showClues();
    findWordLength();
    eventHandler();
    initAriaLabels();
    noHiddenWords();
})


function eventHandler() {
var elements = document.getElementsByClassName("answer");
var hideWords = document.getElementsByClassName("hide-word");
var submitButton = document.getElementById("submit_solution");
submitButton.addEventListener('click', submitForm);

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('input', inputEvent);
        elements[i].addEventListener('keydown', inputEvent);
        elements[i].addEventListener('change', newValue);
        elements[i].addEventListener('keyup', focusInputEvent);
        elements[i].addEventListener('click', focusInputEvent);

    }

    for (var j = 0; j < hideWords.length; j++) {
        hideWords[j].addEventListener('click', hideWord);

    }

}

function noHiddenWords() {
    var hiddenWords = document.getElementById("hidden_word_list");
    var noHidden = document.getElementById("no_hidden");
    var num_elements = hiddenWords.getElementsByClassName("clue_section").length;

    if (num_elements  == 0) {
        noHidden.classList.remove("hideDiv");
    }
    else {
        noHidden.classList.add("hideDiv");
    }
}

function showClues() {
    // Create list of clues along with input fields

    var items = '';
    for (var i=1; i <= puz.numClues; i++) {
        items += '<section class="clue_section" id="clue-group-' + i + '">';
        items += '<label id="label-' + i + '" for="';
        items += 'form-' + [i] + '" lang="nl">';
        items += '<strong class="clue_sentence">' + i + '. ';

        if (i in puz.hclues) {
            items += puz.hclues[i];
            var word_length = puz.hwords[i].length;
        }
        else {
            items += puz.vclues[i];
            var word_length = puz.vwords[i].length;
        }

        items += '</strong><p id="curr-' + i + '">';
        items += 'Huidige letters: <span class="current_solution" role="clue">' + "-".repeat(word_length) + '</span></p>  ';
        items += 'Oplossing voor woord ' + i +  ':';
        items += '</label>';
        items += '<input id = "form-' + i + '"';
        items += ' class="form-control answer" type="text" onfocus="this.oldvalue = this.value;"';
        items += 'maxlength="' + word_length + '" ' ;
        items += 'aria-labelledby="label-' + i + '"';
        items += ' autocomplete="off">';
        
        items += '<div class="text-end">';
        items += '<button type="button" class="btn btn-dark btn-sm hide-word d-inline-block" id="hide-';
        items += i + '"; aria-label="Verberg woord ' + i + '">Verberg woord ' + i + '</button>';
        items += '</div>';
        items += '</section>';

    }

    $('#clue_list').html(items);
}


function hideWord(event) {
    var numberPattern = /\d+/g;
    var num = this.id.match(numberPattern);
    var divID = 'clue-group-' + num;
    var move_back = "Verplaats woord " + num + "weer naar hoofdlijst";
    num = this.id.match(numberPattern);
    if (this.innerHTML != "Naar hoofdlijst") {
        findNearestClue(divID, num, "hidden_word_list");
        this.innerHTML = "Naar hoofdlijst";
        this.setAttribute("aria-label", move_back);
    }
    else {
        findNearestClue(divID, num, "clue_list");
        var new_text = 'Verberg woord ' + num;
        this.innerHTML = new_text;
        this.setAttribute("aria-label", new_text);
    }
    noHiddenWords()

    
}

function findNearestClue(divID, clueNum, location) {
    var clueNum = parseInt(clueNum);
    var divID = "#" + divID;
    
    hideDiv();
    findLocation();
    showDiv();

    function hideDiv() {
        $(divID).hide();
    }

    function findLocation() {
        if (clueNum == 1) {
            $(divID).prependTo("#"+ location);
        }
        else {
            var numberPattern = /\d+/g;
            var correct_div = document.getElementById(location);
            var sections = correct_div.querySelectorAll(`[id^="clue-group-"]`);
            var nearest_section = sections[0];
            if (sections.length > 0 ) {
                for (var i=0; i < sections.length; i++) {
                    var num = sections[i].id.match(numberPattern);
                    if (clueNum > num) {
                        nearest_section = sections[i];
                    }
                }
            }

            else {
                $(divID).appendTo("#" + location);
            }

            $(divID).insertAfter(nearest_section);
        }
    }


    function showDiv() {
        $(divID).show(100);
    }

}

function focusInputEvent(event) {
    highlightGrid(this.id.replace(/\D/g, ''));
  }



function submitForm(event) {
    validate();
  }

function inputEvent(event) {
    showInGrid(this.id.replace(/\D/g, ''), this.value, this.maxLength);
  }

function findForm(id) {
// Find form DOM element given clue/word id

    var form_id = "form-" + id;
    return document.getElementById(form_id);
}

function findFormIndex(form) {
// Find form index given form DOM element

    return parseInt(form.id.replace(/\D/g, ''));
}

function findBlock(form, index) {
// Find matching block given index of a word and corresponding form

    var id = findFormIndex(form);
    var className = "clue-" + id + "-" + index;
    return document.getElementsByClassName(className)[0];
}

function showCurrentVal(form, index, letter) {
// Show current value in list of clues and words after changing a form value
    
    var solution_div = $(form).prev().children('p').children(".current_solution").first();
    var current_value = $(solution_div).html();


    if (current_value == "" || current_value == null) {
        current_value = "-".repeat(form.maxLength);
    }

    if (current_value.length < form.maxLength) {
        var padding_length = form.maxLength - current_value.length;
        var padding = "-".repeat(padding_length);
        var current_value = current_value.concat(padding);

    }


    // if user deletes letter, show intersecting words' original letter    
    if (letter == "-" && form.value[index] != null) {
        letter = form.value[index];
        var block = findBlock(form, index);
        var elem = $(block).find('.value');
        $(elem).html(letter);
    }

    var new_value = current_value.replaceAt(index, letter);

    $(solution_div).html(new_value);

    // jQuery object to DOM element
    makeAriaLabel($(solution_div)[0]);

    return [new_value, current_value];

}

function newValue(event) {
    // Alert new values when user leaves input field
    
    var changes = [];
    var clueNum = findFormIndex(this);
    var cells = puz.wordIndices[clueNum];
    var input = this.value;
    var padding_length = this.maxLength - input.length;
    var padding = "-".repeat(padding_length);
    var input = input.concat(padding);

    for (var j = 0; j < cells.length; j++) {
            doubles = findDoubleCells(clueNum, cells[j], input[j]);
            changes.push(doubles);
        }
    var changes = changes.sort((a, b) => a[1] - b[1]); 
    for (var i = 0; i < changes.length; i++) {
        if (changes[i] == "") {

        }
    }

    var changes = changes.filter(function(e) { return e !== '' });
    if (changes.length > 0) {
        makeChangesList(changes);
    }
}

function makeChangesList(changes) {
// Make list of all values that have changed after user input

    var content = '<h2>Veranderingen</h2>';

    content += '<p>De volgende woorden bevatten nieuwe letters: ';
    content += '<ul class="changes_list" role="list">';
    for (var i = 0; i < changes.length; i++) {
        if (changes[i] != "") {
            content += '<li role="listitem">';
            var clueNum = changes[i][1];
            var newValue = changes[i][0];
            var clue = puz.allClues[clueNum];
            content += clueNum + ". " + clue + ": ";
            var accessibleSound = makeAriaString(newValue);
            // content += '<label>';
            content += '<span role="contentinfo" class="change_announcement" aria-hidden="true">';
            // aria-labelledby="announcement-' + clueNum + '">';
            content += newValue + '</span>';
            content += '<span class="no-display" aria-hidden="false" id=' + '"announcement-' + clueNum + '">';
            content += accessibleSound + '</span>';
            // content += '</label>';
            content += '</li>';
        }
    }

    content += '</ul></p>';

    var alertWindow = document.getElementById("new-values");
    alertWindow.innerHTML = content;
    var current_solutions = document.getElementsByClassName('change_announcement');
    for (var i=0; i < current_solutions.length; i++) {
        makeAriaLabel(current_solutions[i]);
    }
    alertWindow.style.visibility = "visible";
    alertWindow.display = "block";
    $(alertWindow).show(100);
}

function initAriaLabels() {
    var current_solutions = document.getElementsByClassName('current_solution');
    for (var i=0; i < current_solutions.length; i++) {
        makeAriaLabel(current_solutions[i]);
    }
}

function makeAriaLabel (htmlElement) {
    // Make sure that it is read in an accessible way, as dashes are not pronounced by screen readers
    var accessible_sound = makeAriaString(htmlElement.innerHTML);
    $(htmlElement).attr("aria-label", accessible_sound);
}

function makeAriaString (value) {
    var string = "piep";
    var accessible_sound = value;
    if (value.includes("-")) {
        accessible_sound = value.split("").join(" ").replace(/-/g, string).toUpperCase();
    }
    return accessible_sound;
}

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement + this.substring(parseInt(index) + 1);
}

function compareNumbers(a, b) {
    return a - b;
  }

// function findWordLength() {
//     var clues = document.querySelectorAll('.clue_sentence');
//     $(clues).each(function () {
//         let regex = /[0-9]\)/;
//         var matchie = $(this).text().match(regex);
//         var no_bracket = matchie[0].replace(/\)/i, "");
//         var new_num = no_bracket + " letters)";
//         $(this).html( $(this).html().replace(regex, new_num));

//     });     
    
// }



function findWordLength() {
// E.g. change (5) to (5 letters) or append (5 letters) to clue if word length info unavailable

    var clues = document.querySelectorAll('.clue_sentence');
    $(clues).each(function () {
        let regex = /[0-9]\)/;
        var wordLength = $(this).text().match(regex);

        // Not all crosswords provide their solver with info about word length
        // If info not available, create string
        if (wordLength == null) {
            var wordLength = $(this).parents().children('input').attr('maxLength');
            var text = $(this).html();
            text += " (" + wordLength + " letters)";
            $(this).html(text);
        }
        else {
            var no_bracket = wordLength[0].replace(/\)/i, "");
            var new_num = no_bracket + " letters)";
            $(this).html( $(this).html().replace(regex, new_num));
        }
        

    });     
    
}