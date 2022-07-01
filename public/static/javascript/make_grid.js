alert('kms');

class Puzzle {
    constructor(json) {
        this.json = json;
        this.width = json['width'];
        this.height = json['height'];
        this.total = this.width * this.height;
        this.values = json['values'];
        this.vclues = json['vclues'];
        this.hclues = json['hclues'];
        this.hwords = json['hwords'];
        this.vwords = json['vwords'];
        this.wordIndices = json['words_indices'];
        let allClues = {
            ...this.vclues,
            ...this.hclues
        };
        this.numClues = (Object.keys(allClues).length);
    }
}


var puz = new Puzzle(json_puzzle);

window.onload = (event) =>{
    createTable();
    populateBoxes();
    cellSize();
    addCellClass();
};

function addCellClass() {
    for (var i=1; i < puz.wordIndices.length; i++) {
        for (var j=0; j < puz.wordIndices[i].length; j++) {
            $("#" + puz.wordIndices[i][j]).addClass('clue-' + i + '-' + j);
        }
    }
}

function createTable() {

    var number_of_rows = puz.height;
    var number_of_cols = puz.width;
    var table_body = '<table class="grid" width="100%">';
    var counter = 0;

    // Create table rows
    for (var i=1 ;i <= number_of_rows; i++){
        table_body+='<tr>';

        // Create table columns (= blocks)
        for (var j=1; j <= number_of_cols; j++){
            table_body +='<td class="block" id=' + counter + '>';

            if (puz.values[counter] > 0) {
            table_body += "<div class = 'clue_num'>"
            table_body += puz.values[counter];
            table_body += "</div>"
            }
            
            table_body +='<div class="value"></div></td>';
            counter++;
        }
        table_body+='</tr>';
    }
        table_body+='</table>';
        $('#table').html(table_body);

}

function cellSize () {

    // Make sure cells are as wide as possible and as tall as wide
    var tableWidth = document.getElementById('table').getBoundingClientRect().width;
    var cellWidth = tableWidth / (puz.width + 1);
    var cells = document.getElementsByClassName('block');
    for (var i=0; i < cells.length; i++){
        cells[i].style.width = cellWidth + "px";
        cells[i].style.height = cellWidth + "px";
    }
}

function populateBoxes() {

    // Add coloured background to all empty blocks
    for (var i=0; i<puz.values.length; i++) {
        if (puz.values[i] == "@") {
            $('#' + i).addClass("empty_block");
            $('#' + i).html("");

        }
    }

    // Remove cell borders if empty tiles are adjacent (horizontally)
    $(".empty_block").each(function() {

        // If this block is the first empty block in a sequence
        if ($(this).prev().hasClass("empty_block")) {
            $(this).addClass("no_left_border");

        }

        // If block is followed by another empty block, show no inner border
        if ($(this).next().hasClass("empty_block")) {
        $(this).addClass("no_right_border");
            if($(this).next().is(':last-child')) {
                $(this).next().removeClass("no_right_border");
            }
        }
    });

        // Remove cell borders if empty tiles are adjacent (vertically)
    $(".empty_block").each(function() {
        var row = $(this).parent('tr');
       
            var index = $(this).index();
            if ($(row).prev().children().eq(index).hasClass("empty_block")) {
                $(this).addClass("no_top_border");
                $(row).prev().children().eq(index).addClass("no_bottom_border");
            }
    
    });

}