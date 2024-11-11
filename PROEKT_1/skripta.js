// Funkcija za prifakanje kolacinja
function acceptCookies() {
    document.getElementById('cookie-popup').style.display = 'none';
    sessionStorage.setItem('cookiePopupDismissed', 'true'); // Zapis vo sessionStorage
}

// Funkcija za odbivanje kolacinja
function rejectCookies() {
    document.getElementById('cookie-popup').style.display = 'none';
    sessionStorage.setItem('cookiePopupDismissed', 'true');
}

// Funkcija za prilagoduvanje na kolacinjata
function customizeCookies() {
    alert('Customizing cookies!');
    document.getElementById('cookie-popup').style.display = 'none';
    sessionStorage.setItem('cookiePopupDismissed', 'true');
}

// Funkcija koja vcituva stranica
window.onload = function() {
    // Proveri dali korisnikot vekje kliknal nekoe od kopcinjata
    if (!sessionStorage.getItem('cookiePopupDismissed')) {
        document.getElementById('cookie-popup').style.display = 'flex';
    }

    // Povrzi go kopceto so sto e kliknato
    document.getElementById('accept-all').addEventListener('click', acceptCookies);
    document.getElementById('reject-all').addEventListener('click', rejectCookies);
    document.getElementById('customize').addEventListener('click', customizeCookies);
};

// posledna pozicija kade e skrolnato
let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let header = document.querySelector("header");

    if (currentScroll > lastScrollTop) {
        // nadolu
        header.classList.add("scrolled"); 
    } else {
        // nagore
        header.classList.remove("scrolled"); 
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
}, false);


// prikazuvanje pop-up
function showPopup(type) {
    const popup = document.getElementById(type + 'Popup');
    if (popup) {
        popup.style.display = 'block';
    }
}

// zatvaranje pop-up
function closePopup(type) {
    const popup = document.getElementById(type + 'Popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// uspesno logiranje
function loginSuccessful() {
    closePopup('login');
    document.getElementById('dashboard').style.display = 'block';
}

// registracija
function handleRegisterFormSubmit(e) {
    if (e) {
        e.preventDefault();
    }

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const nationality = document.getElementById('nationality').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // site polinja da se popolneti mora
    if (!firstName || !lastName || !phone || !nationality || !username || !password) {
        alert('Please fill in all fields!');
        return;
    }

    // zacuvuvanje na podatoci localStorage
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('phone', phone);
    localStorage.setItem('nationality', nationality);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert('You have successfully created an account!');
    closePopup('register');

    //cisti polinja
    document.getElementById('registerForm').reset();
}

//obrabotka na logiranje
function handleLoginFormSubmit(e) {
    if (e) {
        e.preventDefault();
    }

    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    const inputUsername = document.getElementById('loginUsername').value;
    const inputPassword = document.getElementById('loginPassword').value;

    // dali korisnikot postoi
    if (!savedUsername || !savedPassword) {
        alert('There is no registered user. Please register first.');
        return;
    }

    // dali se tocni podatocite
    if (inputUsername === savedUsername && inputPassword === savedPassword) {
        alert('You have successfully logged in!');
        loginSuccessful();
        document.getElementById('loginForm').reset();
    } else {
        alert('Wrong username or password!');
    }
}

// se e vcitano
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterFormSubmit);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginFormSubmit);
    }
});

// dopolnitelno
function performAction() {
    alert('You performed an action on the dashboard!');
}

function openCategoryPage(page) {
    window.location.href = page;
}

// ================ SURVEY FUNCTIONS ================

// Handling form submission and validation
document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Check if a radio button is selected
    const isFormValid = document.querySelector('input[name="satisfaction"]:checked');
    if (isFormValid) {
        document.getElementById('surveyContainer').classList.add('hidden'); // Hide survey
        document.getElementById('submittedMessage').style.display = 'block'; // Show thank you message
    } else {
        document.getElementById('error-message').style.display = 'block'; // Show error message
    }
});

function submitSurvey() {
    document.getElementById("surveyForm").style.display = "none";
    document.getElementById("submittedMessage").style.display = "block";

    setTimeout(function() {
        window.location.href = "about:blank"; // или друга URL адреса
    }, 2000);
}