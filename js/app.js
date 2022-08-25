
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const overlayCard = document.querySelector(".overlay-card");
const closeCard = document.getElementById("close-card");
  

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

//Wright Brothers

// let wrightBrothersHTML = `<div class="card">
// <img class="card-img" src="images/wilbur.jpg" alt="employee photo placeholder">
// <div class="employee-info-box">
//     <h2 class="name">Wilbur Wright</h2>
//     <p class="email">OutHereFlying@email.com</p>
//     <p class="address">Kitty Hawk</p>
// </div>
// </div>

// <div class="card">
// <img class="card-img" src="images/orville.jpg" alt="employee photo placeholder">
// <div class="employee-info-box">
//     <h2 class="name">Orville Wright</h2>
//     <p class="email">JustWingingIt@email.com</p>
//     <p class="address">Kitty Hawk</p>
// </div>
// </div>`

function displayEmployees(employeeInfo) {
    employees = employeeInfo;
    let html = '';
    console.log(employees[1]);

    for(let i = 0; i < employees.length; i++) {
        let employeeHTML = `
        <div class="card" id="card-${i}">
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
    let street = employees[index].location.street;
    let state = employees[index].location.state;
    let postcode = employees[index].location.postcode;
        
        
        let modalHTML = `
                    <button class="close-btn" id="close-card">X</button>
                    <div class="overlay-card-content">
                        <img class="card-img overlay-item" src="${picture.large}" alt="">
                        <div class="employee-info-box overlay-item">
                            <h2 class="name">${name.first} ${name.last}</h2>
                            <p class="email">>${email}</p>
                            <p class="address">>${city}</p>
                        </div>
                    </div>

                    <div class="employee-additional-info">
                        <p>${phone}</p>
                        <p class="address">${street}, ${state} ${postcode}</p>
                        <p>Birthday: ${dob}</p>
                    </div>`;
            overlayCard.innerHTML = modalHTML;
}





// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------






// ------------------------------------------
//  POST DATA
// ------------------------------------------