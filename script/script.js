document.addEventListener('DOMContentLoaded', function () {
    const largeImage = document.getElementById('largeImage');
    const altText = document.getElementById('altText');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const imageFolder = 'images/';
    const images = [
        { name: 'image1.jpg', alt: 'Cute cat.' },
        { name: 'image10.jpg', alt: 'Hassan tower.' },
        { name: 'image3.jpg', alt: 'A candle.' },
        { name: 'image6.jpg', alt: 'A dog.' },
        { name: 'image8.jpg', alt: 'Cup of cafe.' },
        { name: 'image9.jpg', alt: 'St. Peter’s Cathedral.' }
    ];

    images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');
        thumbnail.style.backgroundImage = `url(${imageFolder + image.name})`;
        thumbnail.setAttribute('data-index', index);
        thumbnail.setAttribute('tabindex', index + 1);

        thumbnail.addEventListener('mouseover', updateLargeImage);
        thumbnail.addEventListener('mouseleave', restoreLargeImage);
        thumbnail.addEventListener('focus', updateLargeImage);
        thumbnail.addEventListener('blur', restoreLargeImage);

        thumbnailsContainer.appendChild(thumbnail);
    });

    function updateLargeImage() {
        const index = this.getAttribute('data-index');
        largeImage.style.backgroundImage = `url(${imageFolder + images[index].name})`;
        console.log('Image updated:', images[index].name);
        altText.textContent = images[index].alt;
        altText.style.backgroundColor = '#9FFFEE';
    }

    function restoreLargeImage() {
        largeImage.style.backgroundImage = '';
        console.log('Image restored');
        altText.textContent = '';
        altText.style.backgroundColor ='transparent';
    }

    window.addEventListener('load', () => {
        console.log('Page loaded');
    });

    thumbnailsContainer.addEventListener('focusout', function (event) {
        const focusedElement = event.relatedTarget || document.activeElement;
        if (!thumbnailsContainer.contains(focusedElement)) {
            console.log('Tabindex reset');
        }
    });

    document.addEventListener('focusin', function (event) {
        const focusedElement = event.target;
        if (!thumbnailsContainer.contains(focusedElement)) {
            event.preventDefault();
            thumbnailsContainer.firstChild.focus();
        }
    });
});