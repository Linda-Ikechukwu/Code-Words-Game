//Intiating the service
if ('serviceWorker' in navigator) {
    
    navigator.serviceWorker.register('/sw.js').then(registration => {
      // Registration was successful
     console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      //registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  
}

//Variables
let playBtn = document.querySelector('.play');
let resetBtn = document.querySelector('.reset');
let nextBtn = document.querySelector('.next');
let hint = document.querySelector('#hint>span')
let displayBoxes = document.querySelectorAll('.display-box');
let outputMessage = document.querySelector('.outputMessage');
let displayRow = document.querySelector('.display-row');
let alphabetsSection = document.getElementByClassName('alphabets-block');
let headerSection = document.getElementsByClassName('header');
let hintsSection = document.getElementById('hints');

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

//Function to append display boxes and hints to the DOM.
const writeToPage = () => {
    let i = 1; 
    nextBtn.addEventListener('click',function(){
        //Clear output display message
        outputMessage.innerHTML = " ";
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
            console.log('it is finished');
            hintsSection.style.display ='none';
            alphabetsSection.style.display ='none';
            headerSection.style.display ='none';
            
            nextBtn.style.visibility ='hidden';
            playBtn.style.visibility ='hidden';
        }
        i++;
    });
};


//Check if display boxes are filled or not then check answer
const evaluateBoxes = () => {
    let isEmpty = 0;
    displayBoxes.forEach(function(displayBox){
        if(displayBox.childNodes.length === 0){
            isEmpty = 1;  
        }
    });
    //If all boxes are filled check if answer is correct.
    if(isEmpty === 1){
        outputMessage.innerHTML = 'Fill Up all the boxes please'; 
    }
    else{
        checkAnswer();
    }
        
};

//Function to check if the boxes were filled correctly or not
function checkAnswer(){
    let isCorrect = false;
    //Find out index number of the item of the wordDetails curently being displayed
    let currentArrayIndex = parseInt(displayRow.id);
    // Assign the corresponding word array of the writeDetails Array index to a variable
    let currentWordArray = wordDetails[currentArrayIndex].word;
    console.log(currentArrayIndex, currentWordArray);
    for(let x = 0; x < displayBoxes.length; x++){
        if(displayBoxes[x].childNodes[0].alt == currentWordArray[x]){
           isCorrect = true;
        }
    }
    if(isCorrect === true){
        outputMessage.innerHTML = 'Correct !!!!';  
    }
    else{
        outputMessage.innerHTML = 'Uh Oh, Try Again !!!!';
    }
};
 
//Add event listeners for drop and dragover to the dynamically created display boxes.
document.addEventListener('drop', (e) => {
    if(e.target && e.target.className == 'display-box'){
        drop(event);
    }
});

document.addEventListener('dragover', (e) => {
    if(e.target && e.target.className == 'display-box'){
        allowDrop(event);
    }
});

resetBtn.addEventListener('click', () => location.reload());
playBtn.addEventListener('click',function(){
    evaluateBoxes();
})

writeToPage();

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
        word: ['o','b','j','e','c','t'],
        hint : 'a variable space with corresponding properties and values',
        noOfBoxes : 6
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
        word: ['a','p','i'],
        hint:'A set of routines, protocols and tools for building software appilications',
        noOfBoxes : 3
    },
    {
        word: ['s','y','n','t','a','x'],
        hint: 'The grammatical rules peculair to a programming language',
        noOfBoxes: 6 
    },
    {
        word: ['c','l','o','u','d',],
        hint: 'A vast network of remote servers operating as a single ecosystem',
        noOfBoxes: 5
    },
    {
        word: ['b','i','t'],
        hint: 'Smallest unit of data in a computer',
        noOfBoxes: 3 
    },
    {
        word: ['b','y','t','e'],
        hint: 'Eight bits',
        noOfBoxes: 4 
    },
    {
        word: ['d','e','b','u','g'],
        hint: 'To identify and rectify unexected behaviours in a program ',
        noOfBoxes: 5 
    },
    {
        word: ['i','n','d','e','x'],
        hint: 'The location of an item in an array',
        noOfBoxes: 5
    },
    {
        word: ['i','p'],
        hint: 'Numerical unique identifier for every machine using the internet',
        noOfBoxes: 2
    },
    {
        word: ['a','r','r','a','y'],
        hint: 'A data structure collection of ordered indexed items ',
        noOfBoxes: 5 
    },
    {
        word: ['q','u','e','u','e'],
        hint: 'Container of objects inserted and removed acording to first in first out principle',
        noOfBoxes: 5 
    },
    {
        word: ['p','i','x','e','l'],
        hint: 'A unit of measurement in CSS',
        noOfBoxes: 5 
    },
    {
        word: ['B','u','g'],
        hint: 'A feature which causes unexpected behaviours',
        noOfBoxes: 3
    }
]



