
// take control of all input buttons
const acceptBtn = document.getElementById('accept-btn')
const rejectBtn = document.getElementById('reject-btn')
const undoBtn = document.getElementById('undo-btn')
const superBtn = document.getElementById('super-btn')


// disable input 
function disableBtns(){
    acceptBtn.disabled = true // disable both input button when valid button click is detected
    rejectBtn.disabled = true
    superBtn.disabled = true   
}

// enable input  
function enableBtns(){
    acceptBtn.disabled = false // disable both input button when valid button click is detected
    rejectBtn.disabled = false
    superBtn.disabled = false
    undoBtn.disabled = false   
}


export {disableBtns, enableBtns, acceptBtn, rejectBtn, undoBtn, superBtn}