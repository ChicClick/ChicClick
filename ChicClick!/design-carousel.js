let currentIndex = 0; // Index for the mainImage
let currentThumbnailIndex = 0; // Index for the active thumbnail
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainImage');
const designTitle = document.getElementById('designTitle');
const designDescription = document.getElementById('designDescription');
const designPrice = document.getElementById('designPrice');

function updateActiveThumbnail() {
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.remove('active');
        if (index === currentThumbnailIndex) {
            thumbnail.classList.add('active');
        }
    });
}

function showImage(index) {
    if (index < 0) {
        currentIndex = thumbnails.length - 1;
    } else if (index >= thumbnails.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    
    // Update main image based on thumbnail index
    mainImage.src = thumbnails[currentIndex].src;
    mainImage.alt = thumbnails[currentIndex].alt;
    
    // Update design details based on current main image
    updateDesign(thumbnails[currentIndex]);

    updateActiveThumbnail();
}

function updateDesign(thumbnail) {
    // Update design details
    designTitle.textContent = thumbnail.alt;
    designDescription.textContent = thumbnail.getAttribute('data-description');
    designPrice.textContent = thumbnail.getAttribute('data-price');

    // Remove active class from all thumbnails and add to the clicked one
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');

    // Update current thumbnail index
    currentThumbnailIndex = Array.from(thumbnails).findIndex(thumb => thumb === thumbnail);
}

document.querySelector('.prev').addEventListener('click', () => {
    showImage(currentIndex - 1);
});

document.querySelector('.next').addEventListener('click', () => {
    showImage(currentIndex + 1);
});

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        showImage(index);
    });
});

// Initial setup based on the first thumbnail (or default setup)
showImage(currentIndex);


document.getElementById('previous-step-button').addEventListener('click', function() {
        window.location.href = 'step 1.html';
});

document.getElementById('nextStepButton').addEventListener('click', function() {
    window.location.href = 'booking.html';
});

// Event listener for file upload to update the main image and design details
document.getElementById('upload-button').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            mainImage.src = e.target.result;
            mainImage.alt = "Uploaded Design";
            designTitle.textContent = "Uploaded Design";
            designDescription.textContent = "Your Custom Design";
            designPrice.textContent = "₱300.00 (Price may still vary)";
            // Add active class to main image
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            // Disable further clicks on thumbnails when a custom design is uploaded
            thumbnails.forEach(thumb => thumb.classList.add('inactive'));
        };
        reader.readAsDataURL(file);
    }
});


