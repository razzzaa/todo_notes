/*..........................................................................................*/
/* MAIN ARRAY DECLARETION + NOTES COLOR ARRAY */
let stickyNotesArr = [];
const notesColor = ['#7afcff', '#feff9c', '#ff7eb9'];
/*..........................................................................................*/
/* JSON PULLING FROM ARRAY */
if (localStorage.getItem('notesLclArr')) {
    stickyNotesArr = JSON.parse(localStorage.getItem('notesLclArr'));
};
/*..........................................................................................*/
/* VARIABLES DECLARETION */
const cards = document.querySelector('#cards');
const sendBtn = document.querySelector('#sendBtn');
const resetBtn = document.querySelector('#resetBtn');
const date = document.querySelector('#date');
const time = document.querySelector('#time');
const txtInp = document.querySelector('#txtinp');
const alertMsgDiv = document.querySelector('#alertMsgDiv');
/*..........................................................................................*/
/*FUNCTIONS FOR ALERT MESSAGE (ACTIVATE/DEACTIVATE)*/
function alertMsgOpen() {
    alertMsgDiv.classList.add('active')
};
function alertMsgClose() {
    alertMsgDiv.classList.remove('active')
};
/*..........................................................................................*/
/*PUSHING VAL TO MAIN ARRAY + FIELD REQUIREMENT*/
sendBtn.addEventListener('click', () => {
    const randomColor = notesColor[Math.floor(Math.random() * notesColor.length)];
    if (txtInp.value === '' || date.value === '' || time.value === '') {
        return alertMsgOpen()
    } else {
        stickyNotesArr.push({
            txtinp: txtInp.value,
            date: date.value,
            time: time.value,
            color: randomColor,
        });
    };
    alertMsgClose()
    addStickyNts();
    resetBtn.click();
});
/*..........................................................................................*/
/*MAIN FUNCTION/RELOAD FUNCTION + ADDING CLASS TO STOP AANIMATION + JSON ADDING TO ARRAY*/
function addStickyNts() {
    cards.innerHTML = '';
    let count = 0;

    for (note of stickyNotesArr) {
        let isAnimated = '';
        if (note.isAnimated === true) {
            isAnimated = 'animated';
        }
        const ntsRows = `
        <div class="notesDiv ${isAnimated} mb-4" data-id=${count} style="background-color: ${note.color}";>
            <div class='d-flex justify-content-end'>
                <button type='button' class='btn myCustomBtn deleteBtn' ><i data-id=${count} class="deleteBtn fa-solid fa-xmark"></i></button>
            </div>
                <div class='txtArea d-flex scrollbar scrollbarNote'>${note.txtinp}</div>
                <div class='timeNdate'>${note.date}<br>${note.time}</div>
        </div>
        `
        count++
        cards.insertAdjacentHTML('beforeend', ntsRows);
    };
    localStorage.setItem('notesLclArr', JSON.stringify(stickyNotesArr));
};
/*..........................................................................................*/
/* ADDING isAnimated TRUE TO MAIN ARRAY AFTER ANIMEND*/
cards.addEventListener('animationend', (anmtEvent) => {
    let animId;
    if (anmtEvent.target.getAttribute('data-id')) {
        animId = anmtEvent.target.getAttribute('data-id');
        stickyNotesArr[animId].isAnimated = true;
    };
});
addStickyNts();
/*..........................................................................................*/
/*DELETE BTN + ID OF NOTE*/
cards.addEventListener('click', (event) => {
    let myId;
    if (event.target.getAttribute('data-id')) {
        myId = event.target.getAttribute('data-id');
    };
    if (event.target.classList.contains('deleteBtn')) {
        stickyNotesArr.splice(myId, 1);
    };
    addStickyNts();
});
/*..........................................................................................*/
/*CLEAN NOTE*/
resetBtn.addEventListener('click', () => {
    txtInp.value = '';
    date.value = '';
    time.value = '';
});
addStickyNts();


