const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".dropZone");

let droppedIn = false;

let originalX;
let originalY;
let activeEvent;
let dragItem;

draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
});

droppableElements.forEach(elem => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
});

draggableElements.forEach(elem => {
    elem.addEventListener("touchstart", handleTouchStart);
    elem.addEventListener("touchmove", handleTouchMove);
    elem.addEventListener("touchend", handleTouchEnd);
    elem.addEventListener("drop", drop);
});

/// Drag n Drop Functions

function dragStart(event) {
    dragItem = event.target;
}

function dragEnter(event) {
    event.target.classList.add("cursor-drop");
}

function dragOver(event) {
    event.preventDefault();
}

function dragLeave(event) {
    event.target.classList.remove("cursor-drop");
}

function drop(event) {
    event.preventDefault();
    let isNodeContainingParent = event.target.contains(dragItem);

    if (!isNodeContainingParent) {
        event.target.appendChild(dragItem);
    }

}

function handleTouchStart(e) {
    e.preventDefault();
    originalX = (e.target.offsetLeft) + "px";
    originalY = (e.target.offsetTop) + "px";
}

function handleTouchMove(e) {
    let touchLocation = e.targetTouches[0];
    let pageX = (touchLocation.pageX - 50) + "px";
    let pageY = (touchLocation.pageY - 50) + "px";
    e.target.style.position = "absolute";
    e.target.style.left = pageX;
    e.target.style.top = pageY;
    activeEvent = 'move';
}

function handleTouchEnd(e) {
    e.preventDefault();
    droppedIn = false;
    if (activeEvent === 'move') {

        droppableElements.forEach(currentDropZone => {

            if (!droppedIn) {
                if (detectTouchEnd(e, currentDropZone.offsetLeft, currentDropZone.offsetTop)) {

                    currentDropZone.appendChild(e.target);
                    e.target.style.position = "initial";
                    droppedIn = true;

                } else {
                    e.target.style.left = originalX;
                    e.target.style.top = originalY;
                    e.target.style.left = "unset";
                    e.target.style.top = "unset";

                }
            }
        });
    }
}


function detectTouchEnd(e, x1, y1) {
    //Very simple detection here

    let changedTouch = e.changedTouches[0];
    let elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
    if (elem) {
        if (elem.offsetLeft <= x1 + 40 && elem.offsetLeft >= x1 - 56 && elem.offsetTop <= y1 + 20 && elem.offsetTop >= y1 - 56) {
            return true;
        }
    }

}