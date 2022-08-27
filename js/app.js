
let employees = [];
let userSearch = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const overlayCard = document.querySelector(".overlay-card");
let closeCard = document.getElementById('close-card');
const searchbar = document.getElementById('search-input');
const directHeader = document.querySelector(".directory-header");

  

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

fetch(urlAPI)
    .then(response => response.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(err => console.error(err))


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function displayEmployees(employeeInfo) {
    employees = employeeInfo;
    let html = '';
    console.log(employees[1]);

    for(let i = 0; i < employees.length; i++) {
        let employeeHTML = `
        <div class="card" data-index="${i}">
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
    console.log('displayCard function working');
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
                    <div class="overlay-card-content">
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

//Search Function

function getUsers() {
    userSearch = employees.map(employee => {
        let first = employee.name.first;
        let last = employee.name.last;
        return `${first} ${last}`;
    }); return userSearch;
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------


gridContainer.addEventListener('click', (e) => {
    if (e.target.className !== 'grid-container') {
        const cardTarget = e.target.closest('.card');
        const index = cardTarget.getAttribute('data-index');
        console.log(index);
        displayCard(index);
    }
});

overlayCard.addEventListener('click', (e) => {
    e.target = closeCard;
        console.log('clicking X Button');
        overlay.classList.add('hidden');
});

directHeader.addEventListener('click', (e) => {
    e.target = searchbar;
    if(userSearch.length === 0) {
    getUsers(); 
    }
})
