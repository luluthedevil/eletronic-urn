let yourVoteFor = document.querySelector('.d--1--1 span');
let roles = document.querySelector('.d--1--2 span');
let numbers = document.querySelector('.d--1--3');
let description = document.querySelector('.d--1--4');
let sideImages = document.querySelector('.division--1--right');
let warning = document.querySelector('.division--2');

let currentStage = 0;
let number = '';
let whiteVote = false;
let votes = [];

function startStage(){
    let stage = stages[currentStage];
    let numberHTML = '';
    number = '';
    whiteVote = false;

    for(let i=0; i<stage.number; i++){
        if(i === 0){
            numberHTML += '<div class="number blink"></div>';
        } else{
        numberHTML += '<div class="number"></div>';
        }
    }

    yourVoteFor.style.display = 'none';
    roles.innerHTML = stage.title;
    description.innerHTML = '';
    warning.style.display = 'none';
    sideImages.innerHTML = '';
    numbers.innerHTML = numberHTML;
}

function updateInterface(){
    let stage = stages[currentStage];
    let candidate = stage.candidates.filter((iten) =>{
        if(iten.number === number){
            return true;
        } else{
            return false;
        }
    });
    if(candidate.length > 0){
        candidate = candidate[0];
        yourVoteFor.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = `Nome: ${candidate.name} <br/> Political party: ${candidate.party}`;

        let photosHTML = '';
        for(let i in candidate.photo){
            if(candidate.photo[i].small){
                photosHTML += `<div class="d--1--image small"> <img src="imgs/${candidate.photo[i].url}"/> ${candidate.photo[i].subtitle} </div>`;
            } else {
                photosHTML += `<div class="d--1--image"> <img src="imgs/${candidate.photo[i].url}"/> ${candidate.photo[i].subtitle} </div>`;
            }
        }
        sideImages.innerHTML = photosHTML;
    } else {
        yourVoteFor.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = `<div class ='big--warning blink'> NULL VOTE </div>`;
    }
}

function clicked(n){
    let elementNumber = document.querySelector('.number.blink');
    if (elementNumber !== null){
        elementNumber.innerHTML = n;
        number = `${number}${n}`;

        elementNumber.classList.remove('blink');
        if (elementNumber.nextElementSibling !== null){
            elementNumber.nextElementSibling.classList.add('blink');
        } else{
            updateInterface();
        }
    }
}

function white(){
    number = '';
    whiteVote = true;

    yourVoteFor.style.display = 'block';
    warning.style.display = 'block';
    numbers.innerHTML = '';
    sideImages.innerHTML = '';
    description.innerHTML = `<div class ='big--warning blink'> WHITE VOTE </div>`;
}

function correct(){
    startStage();
}

function confirm(){
    let stage = stages[currentStage];
    let confirmedVote = false;

    if(whiteVote === true){
        confirmedVote = true;
        votes.push({
            stage: stages[currentStage].title,
            vote: 'white'
        });
    } else if(number.length === stage.number){
        confirmedVote = true;
        votes.push({
            stage: stages[currentStage].title,
            vote: number
        });
    }

    if(confirmedVote === true){
        currentStage++;
        if(stages[currentStage] !== undefined){
            startStage();
        } else{
            document.querySelector('.screen').innerHTML = `<div class ='large--warning blink'> THE END! </div>`;
        }
    }
}

startStage();