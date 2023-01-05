import { dogArrayIndex, undoBtn, disableBtns } from "./index.js"

function renderScrollInstruction(){
    if (dogArrayIndex === 2){
        undoBtn.disabled = true
        disableBtns()
        document.querySelector('#down-arrow').classList.add('not-allowed')
        document.querySelector('#instruction').innerHTML = `
        <p class="instruction-text">Scroll down and tap <img class="share-icon" src="./images/share-btn.svg"> to share the dog's profile!</p>
        `
    }
}


function renderPressDownBtnInstruction(){
    if (dogArrayIndex === 2){
        document.querySelector('#down-arrow').classList.remove('not-allowed')
        document.querySelector('#instruction').innerHTML = `
        <p class="instruction-text">Tap <img src="/images/down-arrow.png" class="primary-icon"> to view the dog's full photo!</p>
        `
    }
}

function renderFinalInstruction(){
    if (dogArrayIndex === 2){
        document.querySelector('#info-icon').classList.add('not-allowed')
    }
         const instruction = document.querySelector('#instruction')
         instruction.style.height = "40%"
         instruction.style.top = "30%" 
         instruction.innerHTML = `
        <p class="instruction-text">Other icons do things to! Try them out as you go! Are you ready to mate today?</p>
        `

}
export {renderScrollInstruction, renderPressDownBtnInstruction, renderFinalInstruction}