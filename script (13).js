$(document).ready(function() {
    // Country select functionality
    const countryCodes = {
        "US": "+1",
        "GB": "+44",
        "BR": "+55"
    };

    // When a country is selected, update the country code
    $('#countrySelect').change(function() {
        const selectedCountry = $(this).val();
        const countryCode = $(this).find('option:selected').data('code') || '';
        $('#countryCode').text(countryCode);
    });

    // Email validation using jQuery
    function isValidEmail(email) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form validation
    $('#registrationForm').submit(function(event) {
        event.preventDefault();
        
        // Get the email input value
        const email = $('#email').val();
        
        // Validate the email
        if (!isValidEmail(email)) {
            $('#email').addClass('is-invalid');
            return false;
        } else {
            $('#email').removeClass('is-invalid').addClass('is-valid');
        }
        
        // Check if all required fields are filled
        let isValid = true;
        $('#registrationForm input[required], #registrationForm select[required]').each(function() {
            if ($(this).val() === '' || $(this).val() === null) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        // Check if privacy policy is checked
        if (!$('#privacyCheck').is(':checked')) {
            $('#privacyCheck').addClass('is-invalid');
            isValid = false;
        } else {
            $('#privacyCheck').removeClass('is-invalid');
        }
        
        // If form is valid, submit (or show success message)
        if (isValid) {
            // Here you would typically make an AJAX call to submit the form
            // For this example, we'll just show an alert
            alert('Registration successful! Form data would be submitted.');
            
            // Reset the form
            $('#registrationForm')[0].reset();
            $('#registrationForm .is-valid').removeClass('is-valid');
            $('#countryCode').text('+');
        }
    });

    // Real-time email validation
    $('#email').on('input', function() {
        const email = $(this).val();
        if (email !== '' && !isValidEmail(email)) {
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
        }
    });

    // Reset validation state when user starts typing
    $('#registrationForm input, #registrationForm select').on('focus', function() {
        $(this).removeClass('is-invalid');
    });

    // Make the navbar fixed on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('header').addClass('fixed-top');
            $('body').css('padding-top', $('header').outerHeight());
        } else {
            $('header').removeClass('fixed-top');
            $('body').css('padding-top', 0);
        }
    });

    // Mobile menu toggle
    $('.navbar-toggler').click(function() {
        $(this).toggleClass('active');
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 70
        }, 800);
    });
});
