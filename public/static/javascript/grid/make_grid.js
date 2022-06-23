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


var puz;
var data = {"solution": ["@", "T", "@", "@", "@", "E", "@", "@", "@", "D", "@", "@", "@", "B", "@", "@", "@", "K", "N", "A", "A", "R", "G", "E", "E", "S", "T", "I", "G", "@", "T", "A", "P", "T", "O", "E", "@", "N", "@", "E", "@", "N", "@", "P", "@", "E", "@", "P", "@", "N", "@", "O", "@", "N", "@", "K", "R", "U", "L", "S", "L", "A", "@", "V", "E", "R", "S", "I", "E", "R", "E", "N", "@", "@", "@", "Z", "@", "@", "@", "N", "@", "E", "@", "O", "@", "E", "@", "N", "@", "E", "@", "K", "O", "E", "@", "B", "A", "K", "E", "N", "@", "G", "A", "R", "N", "A", "A", "L", "@", "A", "@", "N", "@", "A", "@", "R", "@", "@", "@", "N", "@", "@", "@", "D", "@", "@", "@", "B", "A", "R", "I", "S", "T", "A", "@", "B", "R", "O", "D", "E", "L", "O", "O", "S", "@", "A", "@", "A", "@", "S", "@", "C", "@", "R", "@", "S", "@", "@", "IJ", "@", "@", "H", "A", "A", "N", "D", "E", "E", "L", "H", "O", "U", "D", "E", "R", "@", "S", "T", "R", "O", "@", "L", "@", "@", "@", "T", "@", "T", "@", "G", "@", "@", "@", "@", "T", "@", "@", "W"], "hwords": {"6": "naargeestig", "9": "taptoe", "12": "krulsla", "13": "versieren", "14": "koe", "15": "baken", "16": "garnaal", "17": "barista", "18": "brodeloos", "21": "aandeelhouder", "22": "stro"}, "values": ["@", 1, "@", "@", "@", 2, "@", "@", "@", 3, "@", "@", "@", 4, "@", "@", "@", 5, 6, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, "@", 9, 0, 0, 10, 0, 0, "@", 0, "@", 0, "@", 0, "@", 0, "@", 0, "@", 11, "@", 0, "@", 0, "@", 0, "@", 12, 0, 0, 0, 0, 0, 0, "@", 13, 0, 0, 0, 0, 0, 0, 0, 0, "@", "@", "@", 0, "@", "@", "@", 0, "@", 0, "@", 0, "@", 0, "@", 0, "@", 0, "@", 14, 0, 0, "@", 15, 0, 0, 0, 0, "@", 16, 0, 0, 0, 0, 0, 0, "@", 0, "@", 0, "@", 0, "@", 0, "@", "@", "@", 0, "@", "@", "@", 0, "@", "@", "@", 17, 0, 0, 0, 0, 0, 0, "@", 18, 0, 0, 0, 0, 19, 0, 0, 20, "@", 0, "@", 0, "@", 0, "@", 0, "@", 0, "@", 0, "@", "@", 0, "@", "@", 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "@", 22, 0, 0, 0, "@", 0, "@", "@", "@", 0, "@", 0, "@", 0, "@", "@", "@", "@", 0, "@", "@", 0], "width": 18, "vclues": {"1": "ik laad benzine in dat voertuig (4)", "2": "ze hebben ooit dezelfde mening (4)", "3": "zij stelen de loten van tomaten (6)", "4": "vaandel van een uitgesloten Europeaan (6)", "5": "en in de knel voor dieren (6)", "7": "gigantische kermisattractie (9)", "8": "elasticiteit is nodig om het koppel sterkte te geven (10)", "10": "de zeilboot wordt ook weleens twister genoemd (7)", "11": "maak van ons en de groep een voorspelling (8)", "14": "weer een bak met vis in leven (6)", "15": "van rondwervelende asbest gaat deze hond blaffen (6)", "18": "een verbinding in je mond (4)", "19": "rol om een schilderij (4)", "20": "ik laat de voorstelling zien (4)"}, "renderer": "crossword", "vwords": {"1": "tank", "2": "eens", "3": "dieven", "4": "banier", "5": "kennel", "7": "reuzenrad", "8": "spankracht", "10": "tornado", "11": "prognose", "14": "kabaal", "15": "basset", "18": "brug", "19": "l\u00c3\u00bfst", "20": "show"}, "height": 11, "hclues": {"6": "troosteloos en akelig grappig (11)", "9": "een uitvoering waarbij men de kraan dicht draait (6)", "12": "wordt deze groente gegeten in een kapsalon? (7)", "13": "een gedicht voor Europeanen ritselen (9)", "14": "melkproducent (3)", "15": "op het water kan het boeien (5)", "16": "diertje met een zwak geheugen (7)", "17": "Rita en Bas kunnen samen speciale koffie maken (7)", "18": "daardoor is hij waarschijnlijk geen bakker meer (9)", "21": "de participant geeft zijn bijdrage niet cadeau (13)", "22": "boeren hebben er de balen van (4)"}, "originId": 30018, "originFile": "Cryptogram11x18_30001_30020.json", "words_indices": [[], [1, 19, 37, 55], [5, 23, 41, 59], [9, 27, 45, 63, 81, 99], [13, 31, 49, 67, 85, 103], [17, 35, 53, 71, 89, 107], [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], [21, 39, 57, 75, 93, 111, 129, 147, 165], [25, 43, 61, 79, 97, 115, 133, 151, 169, 187], [30, 31, 32, 33, 34, 35], [33, 51, 69, 87, 105, 123, 141], [47, 65, 83, 101, 119, 137, 155, 173], [55, 56, 57, 58, 59, 60, 61], [63, 64, 65, 66, 67, 68, 69, 70, 71], [91, 109, 127, 145, 163, 181], [95, 113, 131, 149, 167, 185], [101, 102, 103, 104, 105, 106, 107], [127, 128, 129, 130, 131, 132, 133], [135, 153, 171, 189], [140, 158, 176, 194, 212], [143, 161, 179, 197], [162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174], [176, 177, 178, 179]]};
window.onload = (event) =>{
    document.documentElement.setAttribute("lang", "nl");
    $("html").attr("lang", "nl");

    // var data2 = fetch('/route').then(res => res.json()).then(data => {
    //     return data;
    // })
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
    var table_body = '<table class="grid" width="100%" aria-hidden="true">';
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