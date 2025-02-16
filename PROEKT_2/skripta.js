$(document).ready(function() {
    // Cookie Popup
    $('#accept-all').on('click', function() {
        $('#cookie-popup').hide();
        sessionStorage.setItem('cookiePopupDismissed', 'true');
    });

    $('#reject-all').on('click', function() {
        $('#cookie-popup').hide();
        sessionStorage.setItem('cookiePopupDismissed', 'true');
    });

    $('#customize').on('click', function() {
        alert('Customizing cookies!');
        $('#cookie-popup').hide();
        sessionStorage.setItem('cookiePopupDismissed', 'true');
    });

    if (!sessionStorage.getItem('cookiePopupDismissed')) {
        $('#cookie-popup').css('display', 'flex');
    }

    // Header Scroll Effect
    let lastScrollTop = 0;
    $(window).on('scroll', function() {
        let currentScroll = $(window).scrollTop();
        let header = $('header');

        if (currentScroll > lastScrollTop) {
            header.addClass("scrolled");
        } else {
            header.removeClass("scrolled");
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Login/Register Popup Functions
    $('#login-btn').on('click', function() {
        showPopup('login');
    });

    $('#signup-btn').on('click', function() {
        showPopup('register');
    });

    $('#close-login-popup').on('click', function() {
        closePopup('login');
    });

    $('#close-register-popup').on('click', function() {
        closePopup('register');
    });

    // Handle form submissions
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        console.log('Login submitted:', {
            username: $('#loginUsername').val(),
            password: $('#loginPassword').val()
        });
        closePopup('login');
    });

    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        console.log('Registration submitted:', {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            phone: $('#phone').val(),
            nationality: $('#nationality').val(),
            username: $('#username').val(),
            password: $('#password').val()
        });
        closePopup('register');
    });

    // Close popup if clicking outside
    $('.popup').on('click', function(e) {
        if (e.target === this) {
            $(this).hide();
        }
    });

    // Survey Functions
    $('#surveyForm').on('submit', function(event) {
        event.preventDefault();
        const isFormValid = $('input[name="satisfaction"]:checked').length > 0;
        if (isFormValid) {
            $('#surveyContainer').addClass('hidden');
            $('#submittedMessage').show();
        } else {
            $('#error-message').show();
        }
    });
});

// Popup Helper Functions
function showPopup(type) {
    $('#' + type + 'Popup').fadeIn(300);
}

function closePopup(type) {
    $('#' + type + 'Popup').fadeOut(300);
}

// Survey Submit Function
function submitSurvey() {
    $("#surveyForm").hide();
    $("#submittedMessage").show();
    setTimeout(function() {
        window.location.href = "about:blank";
    }, 2000);
}

// Additional Functions
function performAction() {
    alert('You performed an action on the dashboard!');
}

function openCategoryPage(page) {
    window.location.href = page;
}