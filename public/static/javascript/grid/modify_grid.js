

function addToGrid(index, value) {
    if (value == null) {
        value = "";
    }
    block = document.getElementById(index);
    var elem = $(block).find('.value');
    $(elem).html(value);
}

function findDoubleCells(clueNum, cell, input) {
    // Return cells that intersect with multiple words

    var classes = getCellFromID(cell).classList;
    var classesArray = checkClass(classes);
    var vals = [];

    for (var j=0; j < classesArray.length; j++) {
        var clue_index = getIDAndLetterIndex(classesArray[j]);
        var form_clue = clue_index[0];

        var index = clue_index[1];
        var form = findForm(form_clue);
            if (input != null) {
                var val = showCurrentVal(form, index, input);
                val.push(form_clue);
                if (form_clue != clueNum) {
                    var vals = val;
                }
            }
    }

    console.log(vals);
    if (vals[2] != clueNum && vals[0] != vals[1]) {
        return [vals[0], vals[2]];
    }
    else {
        return "";
        
    }
}

function getIDAndLetterIndex(className) {
    var result = className.split('-');
    var clue = result[1];
    var index = result[2];
    return [clue, index];

}

function checkClass(classes) {

    var classesArray = [];
    classes.forEach(item=>{
        if(item.startsWith('clue-')) {
            classesArray.push(item);
        }
    })
    return classesArray;
}

function getCellFromID(id) {
    return document.getElementById(id);
}

function getCells(clueNum) {
    var className = '[class*="clue-' + parseInt(clueNum) + '-"]'

    return document.querySelectorAll(className);
}

function highlightGrid(clueNum) {
    var blocks = document.getElementsByTagName('td');
    for (var i=0; i < blocks.length; i++) {
        blocks[i].classList.remove('focused');
    }
    var cells = getCells(clueNum);
    for (var j=0; j < cells.length; j++) {
        cells[j].classList.add('focused');
    }
    
}

function showInGrid(clueNum, input, wordLength) {
    // Show input in grid 
    var cells = puz.wordIndices[clueNum];

    var padding_length = wordLength - input.length;
    var padding = "-".repeat(padding_length);
    var input = input.concat(padding);

    for (var i=0; i < cells.length; i++) {

        if (input[i].match(/[a-z]/i)) {
            addToGrid(cells[i], input[i]);
        }
        else {
                var classes = getCellFromID(cells[i]).classList;
                var classesArray = checkClass(classes);
                if (classesArray.length > 1 ) {
                    for (var j = 0; j < classesArray.length; j++) {
                        
                        var clue_index = getIDAndLetterIndex(classesArray[j]);
                        var form_clue = clue_index[0];
                        var indexje = clue_index[1];
                        if (form_clue != clueNum) {
                            var form = findForm(form_clue);
    
                            if (form.value[indexje] == null) {
                                addToGrid(cells[i], ""); 
                            }

                            // if backspace or not finished, do not change if intersecting word has value
                            if (form.value[indexje] != null) {
                                addToGrid(cells[i], form.value[indexje]); 
                            }
                        }
                    }
                }
                // else {
                //     addToGrid(cells[i], ""); 
                // }
        }
    }

    // for (var j = 0; j < cells.length; j++) {
    //     doubles = findDoubleCells(clueNum, cells[j], input[j]);
    // }

}
