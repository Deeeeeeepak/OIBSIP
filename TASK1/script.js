let output = document.getElementById("output-screen");
let previousOutput = ""; // Variable to store previous output

function show(value){
    if (value === 'sqrt') {
        output.value += '√';
    } else if (value === 'ans') {
        output.value += previousOutput; // Append previous output when Ans button is pressed
    } else if (value === '%') {
        // Calculate percentage
        output.value = parseFloat(output.value) / 100;
    } else if (value === '±') {
        // Toggle plus/minus sign
        let currentValue = parseFloat(output.value);
        output.value = currentValue * -1;
    } else {
        output.value += value;
    }
}

function cal(){
    try{
        let expression = output.value.replace(/√/g, 'Math.sqrt');
        previousOutput = eval(expression); // Store current output as previous
        output.value = previousOutput; // Display current output
    }
    catch(err){
        alert("Invalid expression");
    }
}

function clr(){
    output.value = ""; // Clear the output screen
}

function del(){
    output.value = output.value.slice(0,-1);
}
