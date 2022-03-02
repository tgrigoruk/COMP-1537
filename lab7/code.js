function operate(op) {
    x = parseInt($('#x').val());
    y = parseInt($('#y').val());
    switch (op) {
        case 'add':
            expression = x + ' + ' + y + ' = ' + (x + y);
            break;
        case 'sub':
            expression = x + ' - ' + y + ' = ' + (x - y);
            break;
        case 'mul':
            expression = x + ' * ' + y + ' = ' + (x * y);
            break;
        case 'div':
            expression = x + ' / ' + y + ' = ' + (x / y);
            break;
        case 'exp':
            expression = x + ' ^ ' + y + ' = ' + (x ** y);
            break;
        case 'mod':
            expression = x + ' % ' + y + ' = ' + (x % y);
            break;
        default:
            expression = 'ERROR'
            console.log("Error in calculation")
    }
    $('#result').html("Result of " + expression);
    expression_div = `<div class=${op}-color>
        <span class="expresssion">${expression}</span>
        <input type="submit" class="hide-button" value="Hide this">
        </div>`;
    $('#history').prepend(expression_div);
}

function font_change(change) {
    let font_size = parseInt($('#history').css('font-size'));
    switch (change) {
        case 'inc':
            $('#history').css('font-size', font_size + 1);
            break;
        case 'dec':
            $('#history').css('font-size', font_size - 1);
            break;
    }
}

function setup() {
    
    $(".operator").click(function () {
        operate(this.id)
    })
    $(".font").click(function () {
        font_change(this.id)
    })
    $("#calc-title").hover(function(){
        $(this).css("font-style", "italic");
        }, function(){
        $(this).css("font-style", "normal");
      });
    $('body').on("click", ".hide-button", function() {
        $(this).parent().remove();
    });
}

$(document).ready(setup);