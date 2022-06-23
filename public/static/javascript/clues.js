window.addEventListener('load', function() {
    showClues();
    findWordLength();
    eventHandler();
    initAriaLabels();
})


function eventHandler() {
var elements = document.getElementsByClassName("answer");
var hideWords = document.getElementsByClassName("hide-word");
// var submitButton = document.getElementById("submit_solution");
// submitButton.addEventListener('click', submitForm);

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('input', inputEvent);
        elements[i].addEventListener('keydown', inputEvent);
        elements[i].addEventListener('change', inputEvent);
        elements[i].addEventListener('keyup', focusInputEvent);
        elements[i].addEventListener('click', focusInputEvent);

    }

    for (var j = 0; j < hideWords.length; j++) {
        hideWords[j].addEventListener('click', hideWord);

    }

}

function showClues() {
    // Create list of clues along with input fields

    var items = '';
    for (var i=1; i <= puz.numClues; i++) {
        items += '<section id="clue-group-' + i + '">';
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
        items += 'Huidige oplossing: <span class="current_solution" role="clue">' + "-".repeat(word_length) + '</span></p>  ';
        items += 'Oplossing voor woord ' + i +  ':';
        items += '</label>';
        items += '<input id = "form-' + i + '"';
        items += ' class="form-control answer" type="text"';
        items += 'maxlength="' + word_length + '" ' ;
        items += 'aria-labelledby="label-' + i + '"';
        items += ' autocomplete="off">';
        
        items += '<div class="text-end">';
        items += '<button type="button" class="btn btn-dark btn-sm hide-word d-inline-block" id="hide-';
        items += i + '";>Verberg woord ' + i + '</button>';
        items += '</div>';
        items += '</section>';

    }

    $('#clue_list').html(items);
}


function hideWord(event) {
    var numberPattern = /\d+/g;
    var num = this.id.match(numberPattern);
    var divID = 'clue-group-' + num;
    var move_back = "Verplaats woord " + num + " weer naar hoofdlijst";
    num = this.id.match(numberPattern)
    if (this.innerHTML != move_back) {
        // $("#" + divID).appendTo("#last");
        findNearestClue(divID, num, "hidden_word_list");
        this.innerHTML = move_back;
    }
    else {
        findNearestClue(divID, num, "clue_list");
        this.innerHTML = 'Verberg woord ' + num;
    }
    
    // var divToMove = document.getElementById(divID);
    // var divLast = document.getElementById('last');
    // divToMove.before(divLast);
    


    // var divToMove = document.getElementById(divID);


    
}

function findNearestClue(divID, clueNum, location) {
    var clueNum = parseInt(clueNum);

    if (clueNum == 1) {
        $("#" + divID).prependTo("#"+ location);
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
            $("#" + divID).appendTo("#" + location);
        }
        alert(nearest_section.id);
        $("#" + divID).insertAfter(nearest_section);
    }

}

function focusInputEvent(event) {
    highlightGrid(this.id.replace(/\D/g, ''));
  }

function inputEvent(event) {
    showInGrid(this.id.replace(/\D/g, ''), this.value, this.maxLength);
  }

function findForm(id) {
    var form_id = "form-" + id;
    return document.getElementById(form_id);
}

function showCurrentVal(form, index, letter) {
    
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
    var new_value = current_value.replaceAt(index, letter);

    $(solution_div).html(new_value);

    // jQuery object to DOM element
    makeAriaLabel($(solution_div)[0]);

}

function initAriaLabels() {
    var current_solutions = document.getElementsByClassName('current_solution');
    for (var i=0; i < current_solutions.length; i++) {
        makeAriaLabel(current_solutions[i]);
    }
}

function makeAriaLabel (htmlElement) {
    // Make sure that it is read in an accessible way, as dashes are not pronounced by screen readers
    var string = " piep";
    var accessible_sound = htmlElement.innerHTML.replace(/-/g, string);
    $(htmlElement).attr("aria-label", accessible_sound);
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

function findWordLength() {
    var clues = document.querySelectorAll('.clue_sentence');
    $(clues).each(function () {
        let regex = /[0-9]\)/;
        var matchie = $(this).text().match(regex);
        var no_bracket = matchie[0].replace(/\)/i, "");
        var new_num = no_bracket + " letters)";
        $(this).html( $(this).html().replace(regex, new_num));

    });     
    
}

