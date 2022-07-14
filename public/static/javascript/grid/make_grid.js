window.addEventListener('resize', function(event) {
    cellSize();
}, true);

function redirecter(){
    var loc = window.location.href+'';
    if (loc.indexOf('http://www.')==0){
         window.location.href = loc.replace('http://www.','https://');
    }
    else if (loc.indexOf('http://')==0) {
        window.location.href = loc.replace('http://','https://');
    }
 }

class Puzzle {
    constructor(json) {
        this.json = json;
        this.width = json['width'];
        this.height = json['height'];
        this.total = this.width * this.height;
        this.values = json['values'];
        this.solution = json['solution'];
        this.vclues = json['vclues'];
        this.hclues = json['hclues'];
        this.hwords = json['hwords'];
        this.vwords = json['vwords'];
        this.wordIndices = json['words_indices'];
        this.allClues = {
            ...this.vclues,
            ...this.hclues
        };
        this.allWords = {...this.hwords,...this.vwords};
        this.numClues = (Object.keys(this.allClues).length);
    }
}


var puz;
window.onload = (event) =>{
    document.documentElement.setAttribute("lang", "nl");
    $("html").attr("lang", "nl");

    window.puz = new Puzzle(data);
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
    var table_body = '<table class="grid" width="100%" aria-hidden="true" id="table_table">';
    var counter = 0;

    // Create table rows
    for (var i=1 ;i <= number_of_rows; i++){
        table_body+='<tr>';

        // Create table columns (= blocks)
        for (var j=1; j <= number_of_cols; j++){
            table_body +='<td class="block ';
            if (puz.values[counter] >= 0 || Array.isArray(puz.values[counter])) {
                table_body += 'non-empty';
            }
            
            table_body += '" id=' + counter + '>';

            // if location in grid is starting point of word
            if (puz.values[counter] > 0 || Array.isArray(puz.values[counter])) {
                table_body += "<div class = 'clue_num'>"

                // if starting point of multiple words
                if (Array.isArray(puz.values[counter])) {
                    table_body += puz.values[counter][0] + ", " + puz.values[counter][1];
                    }
                else {
                    table_body += puz.values[counter];
                }
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
    var tableWidth = document.getElementById('table_table').getBoundingClientRect().width;
    var cellWidth = tableWidth / (puz.width + 1);
    var cells = document.getElementsByClassName('block');
    for (var i=0; i < cells.length; i++){
        cells[i].style.width = cellWidth + "px";
        cells[i].style.height = cellWidth + "px";
    }
    var tableHeight = document.getElementById('table_table').getBoundingClientRect().height;
    if (tableHeight > 0.8 * window.innerHeight) {
        var cellWidth = 0.8 * window.innerHeight / puz.height;
        for (var i=0; i < cells.length; i++) {
            cells[i].style.width = cellWidth + "px";
            cells[i].style.height = cellWidth + "px";
        }
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