

function addToGrid(index, value) {
    if (value == null) {
        value = "";
    }
    block = document.getElementById(index);
    var elem = $(block).find('.value');
    $(elem).html(value);
}

function findDoubleCells(clueNum, cells, input) {
    // Return cells that intersect with multiple words

    for (let i=0; i < cells.length; i++) {
        var classes = getCellFromID(cells[i]).classList;
        var classesArray = checkClass(classes);
        // console.log(classesArray);

        for (var j=0; j < classesArray.length; j++) {
            var clue_index = getIDAndLetterIndex(classesArray[j]);
            var form_clue = clue_index[0];
            var index = clue_index[1];

            var form = findForm(form_clue);
            // if (form_clue != clueNum) {
                if (input[i] != null) {
                    showCurrentVal(form, index, input[i]);
                }
            // }
            
        }
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

    for (let i=0; i < cells.length; i++){
        if (input[i].match(/[a-z]/i)) {
            addToGrid(cells[i], input[i]);
        }
        else {
            addToGrid(cells[i], ""); 
        }
    }

    doubles = findDoubleCells(clueNum, cells, input);

}



// function inputToGrid(event) {
//     var btn = document.getElementById("myBtn")
//     btn.addEventListener("click", btnClick, false)
//     if (event.type == 'oninput') {
//         showInGrid()
//       /* handle a full screen toggle */
//     } else /* fullscreenerror */ {
//       /* handle a full screen toggle error */
//     }
//   }