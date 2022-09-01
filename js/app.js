
let employees = [];
let currentIndex = '';
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const overlayCard = document.querySelector(".overlay-card");
const closeCard = document.getElementById('close-card');
const Larrow = document.querySelector('.left-arrow');
const Rarrow = document.querySelector('.right-arrow');

  

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

fetch(urlAPI)
    .then(response => response.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(err => console.error(err));


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function displayEmployees(employeeInfo) {
    employees = employeeInfo;
    let html = '';
    console.log(employees[1]);

    for(let i = 0; i < employees.length; i++) {
        let employeeHTML = `
        <div class="card" id="employee-card-${i}" data-index="${i}">
            <img class="card-img" src="${employees[i].picture.large}" alt="employee photo placeholder">
            <div class="employee-info-box">
                <h2 class="name">${employees[i].name.first} ${employees[i].name.last}</h2>
                <p class="email">${employees[i].email}</p>
                <p class="address">${employees[i].location.city}</p>
            </div>
        </div>`;
    html = html + employeeHTML;
    } gridContainer.innerHTML = html;
}

function displayCard(index) {
    let name = employees[index].name;
    let email = employees[index].email;
    let picture = employees[index].picture;
    let phone = employees[index].phone;
    let city = employees[index].location.city;
    let streetNumber = employees[index].location.street.number;
    let street = employees[index].location.street.name;
    let state = employees[index].location.state;
    let postcode = employees[index].location.postcode;
    let dob = employees[index].dob.date;
    let newDOB = birthday(dob);
        
        let modalHTML = `
                    <button class="close-btn" id="close-card">X</button>
                    <div class="overlay-card-content" data-index="${index}">
                        <img class="card-img overlay-item" src="${picture.large}" alt="">
                        <div class="employee-info-box overlay-item">
                            <h2 class="name">${name.first} ${name.last}</h2>
                            <p class="email">${email}</p>
                            <p class="address">${city}</p>
                        </div>
                    </div>

                    <div class="employee-additional-info">
                        <p>${phone}</p>
                        <p class="address">${streetNumber} ${street}, ${state} ${postcode}</p>
                        <p>Birthday: ${newDOB} </p>
                    </div>`;
                    
            overlay.classList.remove("hidden");

            arrowUnhidden();
            
            if(searchedUserIndex.length !== 0) {
                    searchArrowUnhidden();
            }

            overlayCard.innerHTML = modalHTML;
}

//Takes birthday date from API and outputs a more 'comfy' looking date MM-DD-YYYY

function birthday(date) {
    let rearrangedDate = date.slice(0, 10);
    let outputDate = '';
    rearrangedDate = rearrangedDate.split('-');
    outputDate = `${rearrangedDate[1]}-${rearrangedDate[2]}-${rearrangedDate[0]}`;
    return outputDate;
}


// Search function -- filter employees by employee name

const userSelect = document.getElementById('search-input');

let searchedUserIndex = [];

function searchUser() {
    let search = userSelect.value.toLowerCase();
    let html = '';
    searchedUserIndex = [];
    for(let i = 0; i < employees.length; i++) {
        let nameCompare = `${employees[i].name.first} ${employees[i].name.last}`;
        if (nameCompare.toLowerCase().includes(search)) {
            searchedUserIndex.push(i);
            let employeeHTML = `
        <div class="card" id="employee-card-${i}" data-index="${i}">
            <img class="card-img" src="${employees[i].picture.large}" alt="employee photo placeholder">
            <div class="employee-info-box">
                <h2 class="name">${employees[i].name.first} ${employees[i].name.last}</h2>
                <p class="email">${employees[i].email}</p>
                <p class="address">${employees[i].location.city}</p>
            </div>
        </div>`;
        html = html + employeeHTML;
        }
    } gridContainer.innerHTML = html;
  }


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------


gridContainer.addEventListener('click', (e) => {
    if (e.target.className !== 'grid-container') {
        const cardTarget = e.target.closest('.card');
        const index = cardTarget.getAttribute('data-index');
        currentIndex = index;
        console.log(index);
        displayCard(index);
    }
});

overlayCard.addEventListener('click', (e) => {
            if(e.target.className === 'close-btn') {
                console.log('clicking X Button');
                overlay.classList.add('hidden');
                Larrow.classList.add('hidden');
                Rarrow.classList.add('hidden');
            }   
});

const buttonL = document.getElementById('buttonL');
const buttonR = document.getElementById('buttonR');

buttonL.addEventListener('click', () => {
    console.log('clicking L Button');
    previousCard();
});

buttonR.addEventListener('click', (e) => {
    console.log('clicking R Button');
    nextCard();
});


userSelect.addEventListener('keyup', searchUser);

// ------------------------------------------
//  HELPER FUNCTIONS CONTINUED
// ------------------------------------------

// Display Next/previous employee card in 'modal mode'

function nextCard() {
    if(searchedUserIndex.length === 0 || searchedUserIndex.length === employees.length) {
        let nextIndex = (parseInt(currentIndex) + 1);
        console.log(nextIndex);
        displayCard(nextIndex);
        currentIndex = nextIndex;
        arrowUnhidden();
        console.log(currentIndex);
    } else {
        let newIndex = searchedUserIndex.indexOf(parseInt(currentIndex));
        console.log(newIndex);
        let nextNewIndex = searchedUserIndex[newIndex + 1];
        displayCard(nextNewIndex);
        currentIndex = nextNewIndex;
        searchArrowUnhidden();
    }
}

function previousCard() {
    if(searchedUserIndex.length === 0 || searchedUserIndex.length === employees.length) {
        let previousIndex = (parseInt(currentIndex) - 1);
        console.log(previousIndex);
        displayCard(previousIndex);
        currentIndex = previousIndex;
        arrowUnhidden();
        console.log(currentIndex);
    } else {
        let newIndex = searchedUserIndex.indexOf(parseInt(currentIndex));
        console.log(newIndex);
        let previousNewIndex = searchedUserIndex[newIndex - 1];
        displayCard(previousNewIndex);
        currentIndex = previousNewIndex;
        searchArrowUnhidden();
    }
}

//Functions to Hide / Show arrow icons within 'modal mode'

function arrowUnhidden() {
    let indexValue = parseInt(currentIndex);
    if(indexValue === 0) {
        Rarrow.classList.remove("hidden");
        Larrow.classList.add("hidden");
    } else if (indexValue === (employees.length - 1)) {
        Larrow.classList.remove("hidden");
        Rarrow.classList.add("hidden");
    } else {
        Rarrow.classList.remove("hidden");
        Larrow.classList.remove("hidden");
    }
}

function searchArrowUnhidden() {
    let searchedIndexValue = searchedUserIndex.indexOf(parseInt(currentIndex));
    if (searchedUserIndex.length === 1) {
        Rarrow.classList.add("hidden");
        Larrow.classList.add("hidden");
    } else if (searchedIndexValue === 0) {
        Rarrow.classList.remove("hidden");
        Larrow.classList.add("hidden");
    } else if (searchedIndexValue === (searchedUserIndex.length - 1)) {
        Larrow.classList.remove("hidden");
        Rarrow.classList.add("hidden");
    } else {
        Rarrow.classList.remove("hidden");
        Larrow.classList.remove("hidden");
    } 
}

//Just for Fun // Bicycle Animaiton

userSelect.addEventListener('click', () => {
    let bike = document.getElementById('bicycle-svg');
    bike.classList.add('bicycle-wheelie');
    setTimeout(removeBicycle, 1250);
});

function removeBicycle() {
    let bike = document.getElementById('bicycle-svg');
    bike.classList.remove('bicycle-wheelie');
}






