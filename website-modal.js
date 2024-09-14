// script.js

// Get the modal
var modal = document.getElementById("svgModal");

// Get the images that open the modal
var containers = document.querySelectorAll(".red-hat-display-regular");

var loadingOverlay = document.getElementById("loading_overlay");

// When the user clicks on an image, open the modal
containers.forEach(function(container) {
    container.onclick = function() {
        loadingOverlay.style.display = "flex";

        setTimeout(() => {
            loadingOverlay.classList.add("separate"); // Add class to trigger separation animation
        }, 800);

        setTimeout(() => {

            loadingOverlay.style.display= "none";
            loadingOverlay.classList.remove("separate");
            modal.style.display = "block";

        }, 1400);
    };
});


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//Takes user to specific container
function closeandScroll(modalID,sectionID){
    
    var modal = document.getElementById("svgModal");

    if(modal){
        modal.style.display = 'none';
    }
    var element = document.getElementById(sectionID);
    if(element){
        element.scrollIntoView({behavior: "smooth"});
    }
}

//  Show the back-to-top icon when the user scrolls down if modal was interacted with
// window.addEventListener('scroll', function() {
//     var backToTopButton = document.getElementById("backtoTop");

//      Only show the back-to-top button if the modal has been interacted with
//     if (modalInteracted && (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)) {
//         backToTopButton.style.display = "block";
//     } else {
//         backToTopButton.style.display = "none";
//     }
// });

//  Smooth scroll to the top when the icon is clicked
// document.getElementById("backtoTop").addEventListener('click', function() {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// });
        
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    var container = document.getElementById("intro-page");
    if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


var svgcontainer = document.getElementById("svgModal")

function exitLoadingOverlay() {
    // Hide the loading overlay container

    svgcontainer.classList.add("fade");

    setTimeout(() => {
        document.getElementById('svgModal').style.display = 'none';
        svgcontainer.classList.remove("fade");
    }, 1000);

    // Scroll to the intro-page container
    document.getElementById('intro-page').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* <div id="backtoTop" class="back-to-top" onclick="scrolltoTop()">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
</svg> 
</div>     */




const leftEye = document.getElementById('left-eye');
const rightEye = document.getElementById('right-eye');

const eyeRadius = 15; // Radius of the eye
const maxMovementX = 8; // Maximum movement range horizontally
const maxMovementY = 1.2; // Maximum movement range vertically

// Minimum and maximum boundaries for eye movement
const leftEyeBounds = {
    minX: -79, // Minimum X position for the left eye
    maxX: -59, // Maximum X position for the left eye
    minY: 78,  // Minimum Y position for the left eye
    maxY: 95   // Maximum Y position for the left eye
};

const rightEyeBounds = {
    minX: 265, // Minimum X position for the right eye
    maxX: 285, // Maximum X position for the right eye
    minY: 78,  // Minimum Y position for the right eye
    maxY: 95   // Maximum Y position for the right eye
};

// Store previous eye positions
let leftEyePos = { x: -67, y: 80 };
let rightEyePos = { x: 276, y: 80 };

// Function to update eye positions
function updateEyePosition(x, y) {
    const faceRect = document.getElementById('face').getBoundingClientRect();
    const faceCenterX = faceRect.left + faceRect.width / 2;
    const faceCenterY = faceRect.top + faceRect.height / 2;

    // Calculate eye movement
    const moveX = ((x - faceCenterX) / faceRect.width) * maxMovementX;
    const moveY = ((y - faceCenterY) / faceRect.height) * maxMovementY;

    // New target positions (apply constraints for the left eye)
    const newLeftEyePos = {
        x: Math.min(leftEyeBounds.maxX, Math.max(leftEyeBounds.minX, -67 + moveX)),
        y: Math.min(leftEyeBounds.maxY, Math.max(leftEyeBounds.minY, 80 + moveY))
    };

    // New target positions (apply constraints for the right eye)
    const newRightEyePos = {
        x: Math.min(rightEyeBounds.maxX, Math.max(rightEyeBounds.minX, 276 + moveX)),
        y: Math.min(rightEyeBounds.maxY, Math.max(rightEyeBounds.minY, 80 + moveY))
    };

    // Smoothly interpolate to new positions
    leftEyePos.x += (newLeftEyePos.x - leftEyePos.x) * 0.1; // Adjust the factor for smoother movement
    leftEyePos.y += (newLeftEyePos.y - leftEyePos.y) * 0.1;

    rightEyePos.x += (newRightEyePos.x - rightEyePos.x) * 0.1;
    rightEyePos.y += (newRightEyePos.y - rightEyePos.y) * 0.1;

    leftEye.setAttribute('cx', leftEyePos.x);
    leftEye.setAttribute('cy', leftEyePos.y);

    rightEye.setAttribute('cx', rightEyePos.x);
    rightEye.setAttribute('cy', rightEyePos.y);
}

// Add mousemove event listener
document.addEventListener('mousemove', (event) => {
    updateEyePosition(event.clientX, event.clientY);
});


const leftEyebrow = document.getElementById('left-eyebrow'); // Select the left eyebrow

const leftEyebrowMaxLift = 4; // Maximum lift for the left eyebrow
const leftMinEyebrowY = -20; // Minimum Y value for the left eyebrow to prevent it from going too low
const maxLeftEyebrowAngle = -1; // Maximum angle when cursor is at the top (negative for leftward tilt)

let leftEyebrowPos = { y: -10, angle: 0 }; // Initial left eyebrow position with angle

// Function to update the left eyebrow position based on cursor movement
function updateLeftEyebrowPosition(y) {
    const faceRect = document.getElementById('left-eyebrow').getBoundingClientRect();
    const faceCenterY = faceRect.top + faceRect.height / 2;

    // Calculate eyebrow lift based on cursor Y position
    const leftEyebrowLift = ((y - faceCenterY) / faceRect.height) * leftEyebrowMaxLift;

    // New eyebrow position (ensure it doesn't go below leftMinEyebrowY)
    const newLeftEyebrowPosY = Math.max(leftMinEyebrowY - leftEyebrowLift, leftMinEyebrowY);

    // Smoothly interpolate to new position
    leftEyebrowPos.y += (newLeftEyebrowPosY - leftEyebrowPos.y) * 0.5;

    // Calculate rotation angle based on cursor Y position (cursor higher = more rotation)
    const leftEyebrowAngle = ((y - faceCenterY) / faceRect.height) * maxLeftEyebrowAngle;

    // Smoothly interpolate to the new angle
    leftEyebrowPos.angle += (leftEyebrowAngle - leftEyebrowPos.angle) * 0.5;

    // Apply the new position and rotation (adjust 'transform' for both translation and rotation)
    leftEyebrow.style.transform = `translateY(${leftEyebrowPos.y}px) rotate(${leftEyebrowPos.angle}deg)`;
}

// Add mousemove event listener for the left eyebrow
document.addEventListener('mousemove', (event) => {
    updateLeftEyebrowPosition(event.clientY);
});


const rightEyebrow = document.getElementById('right-eyebrow'); // Select the right eyebrow

const rightEyebrowMaxLift = 4; // Maximum lift for the right eyebrow
const rightMinEyebrowY = -20; // Minimum Y value for the right eyebrow to prevent it from going too low
const maxEyebrowAngle = 1; // Maximum angle when cursor is at the top

let rightEyebrowPos = { y: -10, angle: 0 }; // Initial right eyebrow position with angle

// Function to update the right eyebrow position based on cursor movement
function updateRightEyebrowPosition(y) {
    const faceRect = document.getElementById('right-eyebrow').getBoundingClientRect();
    const faceCenterY = faceRect.top + faceRect.height / 2;

    // Calculate eyebrow lift based on cursor Y position
    const rightEyebrowLift = ((y - faceCenterY) / faceRect.height) * rightEyebrowMaxLift;

    // New eyebrow position (ensure it doesn't go below rightMinEyebrowY)
    const newRightEyebrowPosY = Math.max(rightMinEyebrowY - rightEyebrowLift, rightMinEyebrowY);

    // Smoothly interpolate to new position
    rightEyebrowPos.y += (newRightEyebrowPosY - rightEyebrowPos.y) * 0.5;

    // Calculate rotation angle based on cursor Y position (cursor higher = more rotation)
    const eyebrowAngle = ((y - faceCenterY) / faceRect.height) * maxEyebrowAngle;

    // Smoothly interpolate to the new angle
    rightEyebrowPos.angle += (eyebrowAngle - rightEyebrowPos.angle) * 0.5;

    // Apply the new position and rotation (adjust 'transform' for both translation and rotation)
    rightEyebrow.style.transform = `translateY(${rightEyebrowPos.y}px) rotate(${rightEyebrowPos.angle}deg)`;


}

// Add mousemove event listener for the right eyebrow
document.addEventListener('mousemove', (event) => {
    updateRightEyebrowPosition(event.clientY);
});

const mouth = document.getElementById('mouth'); // Select the mouth element

const mouthMaxMovementX = 10; // Maximum horizontal movement range for the mouth
const mouthMaxMovementY = 5;  // Maximum vertical movement range for the mouth
const minMouthY = -2; // Minimum Y value for the mouth to prevent it from going too low
const maxMouthY = 2; // Maximum Y value for the mouth to prevent it from going too high
const minMouthX = -2; // Minimum X value for the mouth to prevent it from going too far left
const maxMouthX = 2; // Maximum X value for the mouth to prevent it from going too far right

let mouthPos = { x: 0, y: 0 }; // Initial mouth position

// Function to update mouth position based on cursor movement
function updateMouthPosition(x, y) {
    const faceRect = document.getElementById('face').getBoundingClientRect();
    const faceCenterX = faceRect.left + faceRect.width / 2;
    const faceCenterY = faceRect.top + faceRect.height / 2;

    // Calculate mouth movement based on cursor position
    const mouthMovementX = ((x - faceCenterX) / faceRect.width) * mouthMaxMovementX;
    const mouthMovementY = ((y - faceCenterY) / faceRect.height) * mouthMaxMovementY;

    // New mouth position (confine movement between min and max values)
    const newMouthPosX = Math.min(Math.max(mouthPos.x + mouthMovementX, minMouthX), maxMouthX);
    const newMouthPosY = Math.min(Math.max(mouthPos.y + mouthMovementY, minMouthY), maxMouthY);

    // Smoothly interpolate to new positions
    mouthPos.x += (newMouthPosX - mouthPos.x) * 0.1;
    mouthPos.y += (newMouthPosY - mouthPos.y) * 0.1;

    // Apply the new position (adjust 'transform' for translation)
    mouth.style.transform = `translate(${mouthPos.x}px, ${mouthPos.y}px)`;
}

// Add mousemove event listener for the mouth
document.addEventListener('mousemove', (event) => {
    updateMouthPosition(event.clientX, event.clientY);
});

const leftIris = document.getElementById('left-iris');
const rightIris = document.getElementById('right-iris');

const maxIrisMovementX = 1; // Max horizontal movement for the iris
const maxIrisMovementY = 1; // Max vertical movement for the iris

// Constrain the iris movement to a certain range
const maxIrisY = 75; // Max Y value (prevent the iris from moving too far down)
const minIrisY = 70; // Min Y value (prevent the iris from moving too far up)
const maxIrisX = 110; // Max X value (right boundary for iris movement)
const minIrisX = -35; // Min X value (left boundary for iris movement)

// Store previous iris positions
let leftIrisPos = { x: -32, y: 73 };
let rightIrisPos = { x: 105, y: 73 };

// Function to update iris positions based on cursor movement
function updateIrisPosition(x, y) {
    const faceRect = document.getElementById('face2').getBoundingClientRect();
    const faceCenterX = faceRect.left + faceRect.width / 2;
    const faceCenterY = faceRect.top + faceRect.height / 2;

    // Calculate iris movement
    const irisMoveX = ((x - faceCenterX) / faceRect.width) * maxIrisMovementX;
    const irisMoveY = ((y - faceCenterY) / faceRect.height) * maxIrisMovementY;

    // New iris positions with constraints applied
    const newLeftIrisPos = {
        x: Math.min(Math.max(-32 + irisMoveX, minIrisX), maxIrisX), // Constrain within min/max X
        y: Math.min(Math.max(73 + irisMoveY, minIrisY), maxIrisY)   // Constrain within min/max Y
    };

    const newRightIrisPos = {
        x: Math.min(Math.max(105 + irisMoveX, minIrisX), maxIrisX), // Constrain within min/max X
        y: Math.min(Math.max(73 + irisMoveY, minIrisY), maxIrisY)   // Constrain within min/max Y
    };

    // Smoothly interpolate to new positions
    leftIrisPos.x += (newLeftIrisPos.x - leftIrisPos.x) * 0.1;
    leftIrisPos.y += (newLeftIrisPos.y - leftIrisPos.y) * 0.1;

    rightIrisPos.x += (newRightIrisPos.x - rightIrisPos.x) * 0.1;
    rightIrisPos.y += (newRightIrisPos.y - rightIrisPos.y) * 0.1;

    // Update iris positions
    leftIris.setAttribute('cx', leftIrisPos.x);
    leftIris.setAttribute('cy', leftIrisPos.y);

    rightIris.setAttribute('cx', rightIrisPos.x);
    rightIris.setAttribute('cy', rightIrisPos.y);
}

// Add event listener for mouse movement
document.addEventListener('mousemove', (event) => {
    updateIrisPosition(event.clientX, event.clientY);
});

var i = 0;
var textArray = ['an Aspiring Software Engineer.', 'an Independent Creator.', 'a Tech Enthusiast.', 'a Creative Developer.']; // Array of texts to type
var currentIndex = 0;
var speed = 60;
var isDeleted = false;

function typeWriter() {
    const typewriterElement = document.getElementById("typewriter");
    const cursor = document.getElementById("cursor");
    var txt = textArray[currentIndex];

    if (!isDeleted) {
        if (i < txt.length) {
            typewriterElement.innerHTML = txt.substring(0, i + 1) + cursor.innerHTML;
            i++;
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(() => {
                isDeleted = true; // Start deleting
                typeWriter(); // Call typeWriter again for deleting
            }, 1000); // 1-second pause after finishing typing
        }
    } else {
        if (i > 0) {
            typewriterElement.innerHTML = txt.substring(0, i - 1) + cursor.innerHTML;
            i--;
            setTimeout(typeWriter, speed);
        } else {
            isDeleted = false;
            currentIndex = (currentIndex + 1) % textArray.length; // Move to the next text
            setTimeout(typeWriter, 500); // Wait before starting to type the next text
        }
    }
}

typeWriter();
