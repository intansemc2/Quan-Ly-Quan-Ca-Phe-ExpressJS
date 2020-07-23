function InitializeCustomToggleButton(buttonSelection) {
    let button = $(buttonSelection);

    //Initialize Attributions
    if (button.hasClass("btn") === false) {
        button.addClass("btn");
    }
    if (button.hasClass("btn-outline-info") === false) {
        button.addClass("btn-outline-info");
    }
    if (button.hasClass("checked")) {
        button.removeClass("checked");
    }

    //Initialize Events
    button.unset("click");
    button.click(function(){
        if (button.hasClass("checked") === false) {
            button.addClass("checked");
            button.addClass("btn-info");
            button.removeClass("btn-outline-info");
        }
        else {
            button.removeClass("checked");
            button.removeClass("btn-info");
            button.addClass("btn-outline-info");
        }
    });
}