import { dogArrayIndex, renderProfile, renderRealDogArr, currentDog, expandedProfile, profileCard, slideDirection} from "./app.js"
import { undoBtn, acceptBtn, superBtn, rejectBtn} from './app.js'
import { enableBtns , disableBtns } from "./utils.js";
import{instructions} from './data.js'

function isInstructionNeeded(){
    const instructionEl = document.querySelector('#instruction')
    dogArrayIndex < 4 ? renderBtnInstructions() : instructionEl.style.display = "none"
    dogArrayIndex === 4 ? undoBtn.disabled = true : undefined
}

function getInstructionModal(){
    return document.querySelector('#instruction') ? document.querySelector('#instruction'):undefined
}

function renderBtnInstructions(){
    const instructionEl = getInstructionModal()

    if(dogArrayIndex === 0){
        instructionEl.innerHTML = `${instructions.acceptBtn}`
        acceptBtn.disabled = false
    }

    if(dogArrayIndex === 1){
       instructionEl.innerHTML = `${instructions.superBtn}`
        superBtn.disabled = false
    }

    if(dogArrayIndex === 2 && currentDog.hasBeenSwiped == false){
       instructionEl.innerHTML = `${instructions.rejectBtn}`
        rejectBtn.disabled = false
    
    }
    if(dogArrayIndex === 3){
        instructionEl.innerHTML = `${instructions.undoBtn}`
        undoBtn.disabled = false

    }
    if(dogArrayIndex === 2 && currentDog.hasBeenSwiped == true){
       instructionEl.innerHTML = `${instructions.infoBtn}`
        undoBtn.disabled = true
        disableBtns()
    }
    let isSecondLookAtDemoDog = dogArrayIndex === 2 && currentDog.hasBeenSwiped == true

    if(isSecondLookAtDemoDog && expandedProfile.style.display === "block"){
        instructionEl.innerHTML = `${instructions.readyText}`
    }

}

function renderScrollInstruction(){
    if (dogArrayIndex === 2){
        undoBtn.disabled = true
        disableBtns()
        document.querySelector('#down-arrow').classList.add('not-allowed')
        const instructionEl = getInstructionModal()
        instructionEl.innerHTML = `${instructions.scrollDownText}`
    }
}


function renderPressDownBtnInstruction(){
    if (dogArrayIndex === 2){
        document.querySelector('#share-btn').classList.add('not-allowed')
        document.querySelector('#down-arrow').classList.remove('not-allowed')
        const instructionEl = getInstructionModal()
        instructionEl.innerHTML = `${instructions.downArrow}`
    }
}

function renderFinalInstruction(){
    const instructionEl = getInstructionModal()
    if(dogArrayIndex === 2){
        document.querySelector('#info-icon').classList.add('not-allowed')
    
        instructionEl.style.height = "40%"
        instructionEl.style.top = "30%" 
        instructionEl.innerHTML = `${instructions.readyText}`

        document.querySelector('#ready-btn').addEventListener('click',()=>{
            renderRealDogArr()
        })

    }


}
export {renderScrollInstruction, renderPressDownBtnInstruction, renderFinalInstruction, isInstructionNeeded}