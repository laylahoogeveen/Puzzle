window.addEventListener('load', function() {
    showClues();
    eventHandler();
  
})


function eventHandler() {
var elements = document.getElementsByClassName("answer");

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('input', inputEvent);
    elements[i].addEventListener('keydown', inputEvent);
    elements[i].addEventListener('change', inputEvent);
    elements[i].addEventListener('keyup', focusInputEvent);
    elements[i].addEventListener('click', focusInputEvent);
}
}

function showClues() {
    // Create list of clues along with input fields

    var items = '';
    for (var i=1; i <= puz.numClues; i++) {
        
        if (i in puz.hclues) {
            items += '<li class="hor_li">';
            items += puz.hclues[i];
            var word_length = puz.hwords[i].length;
        }
        else {
            items += '<li class="ver_li">';
            items += puz.vclues[i];
            var word_length = puz.vwords[i].length;
        }

        items += '</li>';
        items += ' Huidige oplossing: <span class="current_solution">' + "-".repeat(word_length) + '</span>';
        items += '<input id = "form-' + [i] + '" value=""';
        items += ' class="form-control answer" type="text" placeholder="Oplossing voor woord ' + [i] + '"';
        items += 'maxlength="' + word_length + '" ';
        // items += 'onchange="updateInput(this.value)"';
        items += '>';

    }

    $('#clue_list').html(items);
    
}

// function updateInput(ish){
//     document.getElementById("fieldname").value = ish;
// }

function focusInputEvent(event) {

    highlightGrid(this.id.replace(/\D/g, ''));

  }

function inputEvent(event) {

    showInGrid(this.id.replace(/\D/g, ''), this.value, this.maxLength);

    // if (event.keyCode == 13) {
    //   alert("Success!"); 
    // }
  }

function findForm(id) {
    var form_id = "form-" + id;
    return document.getElementById(form_id);
}

function showCurrentVal(form, index, letter) {
    
    var solution_div = $(form).prev(".current_solution");
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

// function changeFormValue(form, index, letter) {
//     // console.log(form);
    
//     var current_value = form.value;
//     if (current_value == "" || current_value == null) {
//         current_value = "-".repeat(form.maxLength);
//     }

//     if (current_value.length < form.maxLength) {
//         var padding_length = form.maxLength - current_value.length;
//         var padding = "-".repeat(padding_length);
//         var current_value = current_value.concat(padding);

//     }
//     console.log(form.id, current_value);
//     var new_value = current_value.replaceAt(index, letter);
//     form.value = new_value;
//     console.log(form.id, new_value);

// }