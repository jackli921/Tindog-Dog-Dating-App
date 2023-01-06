import { dogArrayIndex, renderProfile, renderRealDogArr, currentDog, expandedProfile, profileCard, slideDirection} from "./index.js"
import { disableBtns, undoBtn, acceptBtn, superBtn, rejectBtn} from './index.js'

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
        instructionEl.innerHTML = `
        <p class="instruction-text slide-right">Press <img "instruction-icons" src="./images/icon-accept.png"> to like a dog!</p>
        `
        acceptBtn.disabled = false
    }

    if(dogArrayIndex === 1){
        instructionEl.innerHTML = `
        <p class="instruction-text slide-left">Fell in love? Press <img class = "instruction-icons" src='./images/icon-super.png'> to superlike a dog!</p>
    `
        superBtn.disabled = false
    }

    if(dogArrayIndex === 2 && currentDog.hasBeenSwiped == false){
        instructionEl.innerHTML = `
        <p class="instruction-text slide-right">Press <img "instruction-icons" src="./images/icon-reject.png"> to reject a dog!</p>
        `
        rejectBtn.disabled = false
    
    }
    if(dogArrayIndex === 3){
        instructionEl.innerHTML = `
        <p class="instruction-text slide-left">Regretting your decision? Press
         <img src="./images/icon-undo.png" class="instruction-icons"> to go back!</p>
    `
        undoBtn.disabled = false

    }
    if(dogArrayIndex === 2 && currentDog.hasBeenSwiped == true){
        instructionEl.innerHTML = `
        <p class="instruction-text slide-right"> Remember! It's not all about the looks! Click <img src="/images/info-icon.png" class="primary-icon"> to read the profile!</p>
        `
        undoBtn.disabled = true
        disableBtns()
    }

    let isSecondLookAtDemoDog = dogArrayIndex === 2 && currentDog.hasBeenSwiped == true
    
    if(isSecondLookAtDemoDog && expandedProfile.style.display === "block"){
        instructionEl.innerHTML = `
        <p class="instruction-text slide-right">Click <img src="/images/down-arrow.png" class="primary-icon"> to see the full profile again!</p>
        `
    }
}

function renderScrollInstruction(){
    if (dogArrayIndex === 2){
        undoBtn.disabled = true
        disableBtns()
        document.querySelector('#down-arrow').classList.add('not-allowed')
        document.querySelector('#instruction').innerHTML = `
        <p class="instruction-text">Scroll down, read the dog's profile, and tap <img class="share-icon" src="./images/share-btn.svg"> to their profile!</p>
        `
    }
}


function renderPressDownBtnInstruction(){
    if (dogArrayIndex === 2){
        document.querySelector('#share-btn').classList.add('not-allowed')
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
        <button id="ready-btn" class="rectangular-btn-primary cool-hover">Ready!</button>
        `

        document.querySelector('#ready-btn').addEventListener('click',()=>{

            renderRealDogArr()
    })
}
export {renderScrollInstruction, renderPressDownBtnInstruction, renderFinalInstruction, isInstructionNeeded}