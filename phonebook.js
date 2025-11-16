let adminPassword = "Admin";

if (!localStorage.contacts) {
    localStorage.contacts = JSON.stringify([]);
}

function getContacts() {
    return JSON.parse(localStorage.contacts);
}

function saveContacts(list) {
    localStorage.contacts = JSON.stringify(list);
}

function show(id) {
    document.querySelectorAll(".container").forEach(x => x.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

// LOGIN HANDLING
function openAdminLogin() { show("admin-login"); }
function openUserPanel() { show("user-panel"); }
function goBack() { show("login-page"); }

function verifyAdmin() {
    let pass = document.getElementById("admin-pass").value;
    if (pass === adminPassword) show("admin-panel");
    else alert("Invalid Password");
}

// DISPLAY CONTACTS
function displayContacts(mode) {
    let list = getContacts();
    let out = `<h2>Contacts List</h2>`;

    if (list.length === 0) {
        out += "<p>No contacts found.</p>";
    } else {
        out += `
        <table>
        <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Number</th>
            <th>City</th>
        </tr>
        `;
        list.forEach(c => {
            out += `
            <tr>
                <td>${c.first} ${c.last}</td>
                <td>${c.gender}</td>
                <td>${c.number}</td>
                <td>${c.city}</td>
            </tr>`;
        });
        out += "</table>";
    }

    out += `<button onclick="${mode === 'admin' ? "show('admin-panel')" : "show('user-panel')"}">Back</button>`;
    
    let page = document.getElementById("output");
    page.innerHTML = out;
    show("output");
}

// ADD CONTACT
function addContact() {
    let first = prompt("Enter first name:");
    let last = prompt("Enter last name:");
    let city = prompt("Enter city name:");
    let gender = prompt("Enter gender (M/F):");
    let number = prompt("Enter phone number (10 digits):");

    if (number.length !== 10 || isNaN(number)) return alert("Invalid Number");

    let list = getContacts();
    
    if (list.some(p => p.number === number)) {
        alert("Number already exists!");
        return;
    }

    list.push({ first, last, city, gender, number });
    saveContacts(list);
    alert("Contact Added Successfully!");
}

// SEARCH BY NAME
function searchName(mode) {
    let name = prompt("Enter first name:").toLowerCase();
    let list = getContacts().filter(c => c.first.toLowerCase() === name);

    if (list.length === 0) return alert("No contact found");

    showSearchResult(list, mode);
}

// SEARCH BY NUMBER
function searchNumber(mode) {
    let number = prompt("Enter phone number:");
    let list = getContacts().filter(c => c.number === number);

    if (list.length === 0) return alert("No contact found");

    showSearchResult(list, mode);
}

// SEARCH BY CITY
function searchCity(mode) {
    let city = prompt("Enter city:").toLowerCase();
    let list = getContacts().filter(c => c.city.toLowerCase() === city);

    if (list.length === 0) return alert("No contact found");

    showSearchResult(list, mode);
}

// DISPLAY SEARCH RESULT
function showSearchResult(list, mode) {
    let out = `<h2>Search Result</h2>
    <table>
        <tr><th>Name</th><th>Gender</th><th>Number</th><th>City</th></tr>`;

    list.forEach(c => {
        out += `<tr>
            <td>${c.first} ${c.last}</td>
            <td>${c.gender}</td>
            <td>${c.number}</td>
            <td>${c.city}</td>
        </tr>`;
    });

    out += `</table>
    <button onclick="${mode === 'admin' ? "show('admin-panel')" : "show('user-panel')"}">Back</button>`;

    let page = document.getElementById("output");
    page.innerHTML = out;
    show("output");
}

// DELETE CONTACT
function deleteContact() {
    let number = prompt("Enter phone number to delete:");
    let list = getContacts();
    let filtered = list.filter(c => c.number !== number);

    if (list.length === filtered.length) return alert("Contact not found!");

    saveContacts(filtered);
    alert("Contact Deleted Successfully!");
}

// DELETE ALL
function deleteAll() {
    if (confirm("Delete all contacts?")) {
        saveContacts([]);
        alert("All contacts deleted!");
    }
}
