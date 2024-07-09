const services = document.querySelectorAll('input[name="special"]');
const cartItems = document.getElementById('cart-items');
const nextStepButton = document.getElementById('nextStepButton');
const pedicureCheckbox = document.getElementById('pedicure');
const manicureCheckbox = document.getElementById('manicure');
const nailEnhancementsCheckbox = document.getElementById('nail-enhancements');
const nailArtCheckbox = document.getElementById('nail-art');

services.forEach(service => {
    service.addEventListener('change', function() {
        updateCart();
        updateButtonState();
        updateServiceAvailability();
    });
});

function updateCart() {
    cartItems.innerHTML = '';
    services.forEach(service => {
        if (service.checked) {
            const label = service.nextElementSibling;
            const title = label.querySelector('.title').textContent;
            const price = label.querySelector('.price').textContent;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `<span>${title}</span><span>${price}</span>`;
            cartItems.appendChild(cartItem);
        }
    });
}

function updateButtonState() {
    const selectedServices = Array.from(services).filter(service => service.checked);

    // Enable/disable next step button based on any selection
    if (selectedServices.length > 0) {
        nextStepButton.classList.add('enabled');
        nextStepButton.classList.add('pink');
        nextStepButton.disabled = false;
    } else {
        nextStepButton.classList.remove('enabled');
        nextStepButton.classList.remove('pink');
        nextStepButton.disabled = true;
    }
}

function updateServiceAvailability() {
    const isPedicureChecked = pedicureCheckbox.checked;
    const isManicureChecked = manicureCheckbox.checked;
    const isNailArtChecked = nailArtCheckbox.checked;
    const isNailEnhancementsChecked = nailEnhancementsCheckbox.checked;

    if (isNailEnhancementsChecked) {
        pedicureCheckbox.disabled = true;
        manicureCheckbox.disabled = true;
        nailArtCheckbox.disabled = true;
    } else if (isPedicureChecked) {
        manicureCheckbox.disabled = isNailArtChecked;
        nailArtCheckbox.disabled = isManicureChecked;
        nailEnhancementsCheckbox.disabled = true;
    } else if (isManicureChecked || isNailArtChecked) {
        pedicureCheckbox.disabled = false;
        manicureCheckbox.disabled = isNailArtChecked ? !isPedicureChecked : false;
        nailArtCheckbox.disabled = isManicureChecked ? !isPedicureChecked : false;
        nailEnhancementsCheckbox.disabled = true;

        if (isPedicureChecked && isNailArtChecked) {
            manicureCheckbox.disabled = true;
        }

        if (isPedicureChecked && isManicureChecked) {
            nailArtCheckbox.disabled = true;
        }
    } else {
        pedicureCheckbox.disabled = false;
        manicureCheckbox.disabled = false;
        nailArtCheckbox.disabled = false;
        nailEnhancementsCheckbox.disabled = false;
    }

    // Update label styles
    services.forEach(service => {
        const label = service.nextElementSibling;
        if (service.disabled) {
            label.classList.add('disabled-label');
        } else {
            label.classList.remove('disabled-label');
        }
    });
}

// Initialize cart and button states based on initial checkbox state
updateCart();
updateServiceAvailability();

// Ensure Next Step button is initially gray and disabled
nextStepButton.classList.remove('enabled');
nextStepButton.disabled = true;

// Update button states initially
updateButtonState();

nextStepButton.addEventListener('click', function() {
    if (manicureCheckbox.checked) {
        window.location.href = 'step 2-manicure.html';
    } else if (nailArtCheckbox.checked) {
        window.location.href = 'step 2-nail art.html';
    } else {
        // Default action if none of the specific services are selected
        window.location.href = 'step 2-manicure.html';
    }
});

/* Compute for the price */

document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const price = parseInt(this.getAttribute('data-price'));

            if (this.checked) {
                totalPrice += price;
            } else {
                totalPrice -= price;
            }

            totalPriceElement.textContent = totalPrice;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const labels = document.querySelectorAll('.special label');
    labels.forEach(label => {
      label.addEventListener('click', function() {
        this.classList.toggle('pink');
      });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const labels = document.querySelectorAll('.special label');

    labels.forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                label.classList.add('pink-bold');
            } else {
                label.classList.remove('pink-bold');
            }
        });
    });
});
