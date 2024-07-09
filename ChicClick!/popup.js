document.addEventListener('DOMContentLoaded', function() {
    // Initialize Animation on Scroll
    AOS.init();

    // Show or hide the scroll-to-top button based on scroll position
    window.onscroll = function() { scrollFunction(); };

    function scrollFunction() {
        var scrollButton = document.getElementById("scroll-to-top");

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    }

    // Smooth scroll to top when the button is clicked
    document.getElementById("scroll-to-top").onclick = function() {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0;
    };

    // Design Popup
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('popup-modal');
    const modalImg = document.getElementById('popup-img');
    const modalTitle = document.getElementById('popup-title');
    const modalDescription = document.getElementById('popup-description');
    const modalPrice = document.getElementById('popup-price');
    const span = document.getElementsByClassName('close')[0];
    const skinToneButtonsContainer = document.getElementById('skin-tone-buttons');
    const bookNowButton = document.getElementById('book-now');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const imgSrc = card.querySelector('.card-img-top').src;
            const title = card.querySelector('.card-title').textContent;
            const description = card.querySelector('.card-text').textContent;
            const price = card.querySelector('.price').textContent;
            const imgId = card.querySelector('.card-img-top').id; // Get the ID of the clicked image

            modalImg.src = imgSrc;
            modalImg.dataset.id = imgId; // Set the ID of the image to a data attribute for reference
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalPrice.textContent = price;

            // Generate skin tone buttons dynamically based on the selected design
            generateSkinToneButtons(imgId);

            modal.style.display = 'block';
        });
    });

    span.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Function to generate skin tone buttons dynamically
    function generateSkinToneButtons(imgId) {
        skinToneButtonsContainer.innerHTML = ''; // Clear previous buttons

        const skinToneButtonImages = {
            'skyblue': ['skyblue.jpg', 'skyblue2.png', 'skyblue3.png'],
            'petalpink': ['petalpink.jpg', 'petalpink2.png', 'petalpink3.png'],
            'buttermilk': ['buttermilk.jpg', 'buttermilk2.png', 'buttermilk3.png'],
            'lavendermist': ['lavendermist.jpg', 'lavendermist2.png', 'lavendermist3.png'],
            'antiquerose': ['antiquerose.jpg', 'antiquerose2.png', 'antiquerose3.png'],
            'goldenolive': ['goldenolive.jpg', 'goldenolive2.png', 'goldenolive3.png'],
            'richmahogany': ['richmahogany.jpg', 'richmahogany2.png', 'richmahogany3.png'],
            'sapphire': ['sapphire.jpg', 'sapphire2.png', 'sapphire3.png'],
            'redchili': ['redchili.jpg', 'redchili2.png', 'redchili3.png']
        };

        if (skinToneButtonImages[imgId]) {
            const tones = ['', '', ''];
            const classes = ['light-skin-button', 'medium-skin-button', 'dark-skin-button'];
            tones.forEach((tone, index) => {
                const button = document.createElement('button');
                button.className = `skin-tone-button ${classes[index]}`;
                button.textContent = tone;
                button.setAttribute('data-src', `images/${skinToneButtonImages[imgId][index]}`); // Set data attribute with correct image path
                skinToneButtonsContainer.appendChild(button);

                // Add event listeners to each skin tone button
                button.addEventListener('click', function() {
                    const newImgSrc = button.getAttribute('data-src');
                    modalImg.src = newImgSrc;
                });
            });
        }
    }

    // Add event listener to "Book Now" button
    bookNowButton.addEventListener('click', function() {
        window.location.href = 'step 1.html';
    });   
    
    // Smooth scrolling when clicking on a nav-link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});
