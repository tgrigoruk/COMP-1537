let history = ''

function add() {
    x = parseInt(jQuery('#x').val());
    y = parseInt(jQuery('#y').val());
    expression = x + ' + ' + y + ' = ' + (x + y)
    jQuery('#result').html("Result of " + expression);
    history = '<div class="red">' + expression + '</div>' + history;
    $('#history').html(history);
}
function subtract() {
    x = parseInt(jQuery('#x').val());
    y = parseInt(jQuery('#y').val());
    expression = x + ' - ' + y + ' = ' + (x - y)
    jQuery('#result').html("Result of " + expression);
}
function multiply() {
    x = parseInt(jQuery('#x').val());
    y = parseInt(jQuery('#y').val());
    expression = x + ' * ' + y + ' = ' + (x * y)
    jQuery('#result').html("Result of " + expression);
}
function divide() {
    x = parseInt(jQuery('#x').val());
    y = parseInt(jQuery('#y').val());
    expression = x + ' / ' + y + ' = ' + (x / y)
    jQuery('#result').html("Result of " + expression);
}


// function operate(op) {
//     x = parseInt(jQuery('#x').val());
//     y = parseInt(jQuery('#y').val());
//     let expression = ''
//     switch(op) {
//         case 'add':
//             expression = x + ' + ' + y + ' = ' + (x + y);
//             break;
//         case 'sub':
//             expression = x + ' - ' + y + ' = ' + (x - y);
//             break;
//         case 'mul':
//             expression = x + ' * ' + y + ' = ' + (x * y);
//             break;
//         case 'div':
//             expression = x + ' / ' + y + ' = ' + (x / y);
//     }
//     jQuery('#result').html("Result of " + expression);
//     // history.unshift(expression + '\n');
//     // $('#history').html(history);
// }


function setup() {
    jQuery('#add').click(add);
    jQuery('#sub').click(subtract);
    jQuery('#mul').click(multiply);
    jQuery('#div').click(divide);
    
    // jQuery(".operator").click(
    //     function(){
    //         operate()
    //     }
    // )
}

jQuery(document).ready(setup);