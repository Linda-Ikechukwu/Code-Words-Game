//Variables
let playBtn = document.querySelector('.play');
let resetBtn = document.querySelector('.reset');
let nextBtn = document.querySelector('.next');
let hint = document.querySelector('#hint>span')
let displayBoxes = document.querySelectorAll('.display-box');
let outputMessage = document.querySelector('.outputMessage');
let displayRow = document.querySelector('.display-row');


//Functions that facilitate drag and drop
const allowDrop = (e) => {
    e.preventDefault();
}

const drag = (e) => {
    let item = document.getElementById('drag1');
    e.target = item.cloneNode(true);
    e.dataTransfer.setData("text", event.target.id);
}

const drop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
}

//Array containing the code words and their details
const wordDetails = [
    {
        word: ['c','o','d','e'],
        hint : 'Sets of Instructions forming a program which is executed by a computer',
        noOfBoxes : 4
    },
    {
       word: ['h','a','c','k'],
       hint : 'To breach a system or infastructure',
       noOfBoxes : 4
    },
    {
        word: ['l','o','o','p'],
        hint:'A repetitive process',
        noOfBoxes : 4
    },
    {
        word: ['m','e','t','h','o','d'],
        hint: 'A function attached to an object',
        noOfBoxes: 6
    },
    {
        word: ['s','y','n','t','a','x'],
        hint: 'The grammatical rules peculair to a programming language',
        noOfBoxes: 6 
    },
    {
        word: ['B','u','g'],
        hint: 'A feature which causes unexpected behaviours',
        noOfBoxes: 3
    }
]

//Function to append display boxes and hints to the DOM.
const writeToPage = () => {
    let i = 1; 
    nextBtn.addEventListener('click',function(){
        //Remove displayBoxes already on the page
        while(displayRow.firstChild){
            displayRow.removeChild(displayRow.firstChild);
        }
        if(i < wordDetails.length){
            //write hint from the wordDetails array to document.
            hint.innerHTML = wordDetails[i].hint;
            
            let num = wordDetails[i].noOfBoxes;
           //Create display Boxes and write them to the document.
            for(let x = 0; x < num; x++){
                let divBox = document.createElement("div");
                divBox.id = 'div1';
                divBox.className = 'display-box';
                displayRow.appendChild(divBox);
            }
            displayRow.id = i;
        }
        else{
            let hintsSection = document.getElementById('hints');
            hintsSection.style.display = 'none';
            displayRow.innerHTML = '<h2>The End<h2>';
            nextBtn.style.visibility = 'hidden';
            playBtn.style.visibility = 'hidden';
        }
        i++;
    })
}

//Check for empty boxes on play
const checkEmptyBoxes =()=>{
    playBtn.addEventListener('click', function(){
        let isEmpty = 0;
        displayBoxes.forEach(function(displayBox){
            if(displayBox.childNodes.length === 0){
              isEmpty = 1;  
            }
        });
        //If all boxes are filled check if answer is correct.
        if(isEmpty !== 1){
            outputMessage.innerHTML = 'Just a moment please'; 
        }
        else{
            outputMessage.innerHTML = 'Fill Up all the boxes please';   
        }
    })
}

//Function to check if the boxes were filled correctly or not
function checkAnswer(){
    //Find out which writeDetails Array index is currently displayed
    let currentArrayIndex = parseInt(displayRow.id);
    console.dir(currentArrayIndex);
}
checkAnswer(); 

//Add event listeners for drop and dragover to the dynamically created display boxes.
document.addEventListener('drop', (e) => {
    if(e.target && e.target.className == 'display-box'){
        drop(event);
    }
})
document.addEventListener('dragover', (e) => {
    if(e.target && e.target.className == 'display-box'){
        allowDrop(event);
    }
})

resetBtn.addEventListener('click', () => location.reload());
checkEmptyBoxes();
writeToPage();