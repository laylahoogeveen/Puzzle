function createInstructions() {
    
    // Get the modal
    var modal = document.getElementById("instructionModal");
    var modalWindow = document.querySelector("instruction-modal-div");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("instruction-close-modal")[0];
    var closeButton = document.getElementById("close-instructions");


    modal.style.visibility = "visible";
    $(modal).show();
    $(modalWindow).show(100);

    // If user clicks on <span> (x), close the modal
    span.onclick = function() {
        $(modalWindow).hide();
        $(modal).hide();
        modal.style.display = "none";
        modal.style.visibility = "hidden";
    }

    closeButton.onclick = function() {
        $(modalWindow).hide();
        $(modal).hide();
        modal.style.display = "none";
        modal.style.visibility = "hidden";

    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            $(modalWindow).hide();
            $(modal).hide();
            modal.style.display = "none";
            modal.style.visibility = "hidden";
        }
    }
}