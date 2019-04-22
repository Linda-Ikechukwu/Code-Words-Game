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
    let i = 0; 
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
        }
        i++
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
        if(isEmpty !== 1){
          displayBoxes.forEach(function(displayBox){
              //determine current array index
              //check if each display box contains the corresponding value at the worddetails.word array
              //output correct
              //else output try again
          })   
        }
        else{
            outputMessage.innerHTML = 'Fill Up all the boxes please';   
        }
    })
}

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