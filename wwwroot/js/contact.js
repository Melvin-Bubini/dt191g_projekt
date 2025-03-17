// Flotande animation på kontaktkort
const cards = document.querySelectorAll('.contact-card');
cards.forEach((card, index) => {
    card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const midCardWidth = rect.width / 2;
        const midCardHeight = rect.height / 2;

        const angleY = (x - midCardWidth) / 8;
        const angleX = (y - midCardHeight) / 8;

        card.style.transform = `rotateX(${-angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', function () {
        card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Floating formeffekt
const formInputs = document.querySelectorAll('.form-control');
formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });

    // Kolla om input har värde vid laddning
    if (input.value !== '') {
        input.parentElement.classList.add('focused');
    }
});

// Lägg till en event listener för knappen
document.getElementById('downloadCvBtn').addEventListener('click', function () {
    // Skapa en osynlig länk för nedladdningen
    var link = document.createElement('a');
    link.href = '/CV-2025.pdf'; // Länken till din PDF
    link.download = 'Melvin-Bubini-CV.pdf'; // Namnet på den nedladdade filen
    link.click(); // Simulera ett klick för att starta nedladdningen
});

(function () {
    emailjs.init('JaPpOsAcoRBuy5c0t');  // Ersätt med din EmailJS användar-ID
})();

// Lägg till en event listener för formuläret
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Förhindra standardformulärinlämning

    // Enkel validering
    let isValid = true;
    const formInputs = this.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
            
            // Skapa eller uppdatera feedback-element
            let feedback = input.nextElementSibling;
            if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                input.parentNode.insertBefore(feedback, input.nextSibling);
            }
            feedback.textContent = 'Detta fält är obligatoriskt';
        } else {
            input.classList.remove('is-invalid');
            // Ta bort eventuell feedback
            const feedback = input.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.remove();
            }
        }
    });
    
    // Validera e-post
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() && !emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('is-invalid');
        
        // Skapa eller uppdatera feedback-element
        let feedback = emailInput.nextElementSibling;
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            emailInput.parentNode.insertBefore(feedback, emailInput.nextSibling);
        }
        feedback.textContent = 'Ange en giltig e-postadress';
    }
    
    if (!isValid) {
        return; // Avbryt om validering misslyckas
    }

    // Skicka meddelandet med hjälp av EmailJS
    emailjs.sendForm('service_n4sy14j', 'template_vwrnklg', this)
        .then(function (response) {
            console.log('Success:', response);
            
            // Skapa ett meddelande i formuläret
            const messageContainer = document.createElement('div');
            messageContainer.className = 'alert alert-success mt-3';
            messageContainer.innerHTML = '<strong>Tack!</strong> Ditt meddelande har skickats.';
            
            // Infoga meddelandet i formuläret
            const form = document.getElementById('contact-form');
            form.appendChild(messageContainer);
            
            // Rensa formuläret
            form.reset();
            
            // Återställ floating labels
            const formControls = form.querySelectorAll('.form-control');
            formControls.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
            
            // Ta bort meddelandet efter 5 sekunder
            setTimeout(() => {
                messageContainer.remove();
            }, 5000);
            
        }, function (error) {
            console.log('Error:', error);
            
            // Skapa ett felmeddelande i formuläret
            const messageContainer = document.createElement('div');
            messageContainer.className = 'alert alert-danger mt-3';
            messageContainer.innerHTML = '<strong>Fel!</strong> Det gick inte att skicka meddelandet. Försök igen senare.';
            
            // Infoga felmeddelandet i formuläret
            const form = document.getElementById('contact-form');
            form.appendChild(messageContainer);
            
            // Ta bort meddelandet efter 5 sekunder
            setTimeout(() => {
                messageContainer.remove();
            }, 5000);
        });
});