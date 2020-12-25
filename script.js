let photosArray = [];
let imagesCount = 5;
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;
const Loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');

function showLoader() {
    Loader.hidden = false;
    setTimeout(() => {
        getPhotos();
    }, 1000)
}

function hideLoader() {
    Loader.hidden = true;
}

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        imagesCount = 30;
    }

}
// set the element's attributes
function setAttributes(element, attributes) {
    for (const attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
}

// display the returned photos from unsplash api into the dom
function displayPhotos() {
    totalImages = photosArray.length;
    //or i can resit the checkImagesLoadeded variable with 0;
    imagesLoaded = 0;
    photosArray.forEach((photo) => {
        const a = document.createElement('a');
        setAttributes(a, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });


        img.addEventListener('load', checkImagesLoaded);
        a.appendChild(img);
        imageContainer.appendChild(a);
    })

}

// get the photos from the unsplash api
async function getPhotos() {
    hideLoader();
    const api_key = 'N2OyBhxy-BmwBkjT7ZWqH6JeOmODJYkILL7g301gnes'
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${api_key}&count=${imagesCount}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        photosArray = data;
        displayPhotos();

    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready === true) {
        getPhotos();
        ready = false;
    }
})

showLoader();
