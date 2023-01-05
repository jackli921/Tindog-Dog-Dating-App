
import {currentDog, renderProfile, profileContainer, profileCard, expandedProfile, disableBtns, undoBtn, acceptBtn, superBtn, modifiableDogsData, dogArrayIndex, handleInfoBtnClick, rejectBtn} from './index.js'
import { fakeDogsData } from './data.js'
import Dog from './Dog.js'

function renderIdlePage(){
    disableBtns()
    undoBtn.disabled = "true"    

    profileCard.classList.add('welcome-screen')
    profileCard.style.backgroundImage = "url('./images/landing-bg.jpg')"
    profileCard.innerHTML = `
        <img class="tindog-icon-welcome fade" id="tindog-icon-welcome" src="./images/tindog-icon.png">
         
        <i class="fa-solid fa-heart heart-icon hidden" id="heart-icon"></i>
        <div class="primary-modal fade" id="consent-modal">
            <p class="welcome-text terms">To continue using our service, please confirm that you are not a cat</p>

            <div class="consent-input-box">
                <p>I confirm that I am not a cat</p>
                <label class="switch">
                    <input type="checkbox" id="consent-checkbox">
                    <span class="slider round"></span>
                </label>
            </div>

            <button disabled class="continue-btn" id="continue-btn">Continue &nbsp <i class="fa-solid fa-right-long"></i> </button>
        </div>
    `
}



function checkUserConsent() {
    const consentCheckbox = document.querySelector('#consent-checkbox')
    const continueBtn = document.querySelector('#continue-btn')
    
    consentCheckbox.addEventListener('change',()=>{    
        if(consentCheckbox.checked){
             continueBtn.disabled = false
             continueBtn.classList.add('cool-gradient')
             continueBtn.addEventListener('click',renderWelcomeAnimations)
        }else{
            continueBtn.disabled = true
            continueBtn.classList.remove('cool-gradient')
        }
    })
}

function renderWelcomeAnimations(){
    // const heartIcon = document.querySelector('#heart-icon')

    // heartIcon.classList.remove("hidden")
    // heartIcon.classList.add("fade-in")
    // document.querySelector("#tindog-icon-welcome").classList.add("move-left")
    // document.querySelector("#consent-modal").classList.add("move-right")
    // profileCard.classList.add('slow-zoom') 
    // // remove the opacity = 1 property in slow-zoom animation to make anything visible

    // setTimeout(() => {
    //     renderWelcomePage()
    // }, 2200);
     renderWelcomePage()
}

function renderWelcomePage(){
    profileCard.classList.remove('slow-zoom') 
    
    profileCard.style.backgroundImage = "url('./images/welcome2-bg.jpg')"
    profileContainer.classList.add('sliding-background-animation')

    profileCard.innerHTML = `
        <div class="text-primary">🎉 Welcome to Tindog: 🔥 World Edition - A fake dating app for canines everywhere</div>
        <button class="continue-btn" id="continue-btn-2">Continue &nbsp <i class="fa-solid fa-right-long"></i> </button>
    `

    document.querySelector('#continue-btn-2').addEventListener('click',()=>{
        renderTutorial()
    })
}

function renderTutorial(){
    profileCard.classList.remove('welcome-screen')  
    renderProfile()
    handleInfoBtnClick()
}

function renderInstruction(){
    const instructionEl = document.querySelector('#instruction')
    console.log(currentDog)

    if(dogArrayIndex === 0){
        instructionEl.innerHTML = `
        <p class="instruction-text">Press <img "instruction-icons" src="./images/icon-accept.png"> to like a dog!</p>
        `
        acceptBtn.disabled = false
    }
    if(dogArrayIndex === 1){
        instructionEl.innerHTML = `
        <p class="instruction-text">Fell in love? Press <img class = "instruction-icons" src='./images/icon-super.png'> to superlike a dog!</p>
    `
        superBtn.disabled = false
    }

    if(dogArrayIndex === 2 && currentDog.hasBeenSwiped == false){
        instructionEl.innerHTML = `
        <p class="instruction-text">Press <img "instruction-icons" src="./images/icon-reject.png"> to reject a dog!</p>
        `
        rejectBtn.disabled = false
    
    }
    if(dogArrayIndex === 3){
        instructionEl.innerHTML = `
        <p class="instruction-text">Regretting your decision? Press
         <img src="./images/icon-undo.png" class="instruction-icons"> to go back!</p>
    `
        undoBtn.disabled = false

    }
    if(dogArrayIndex === 2 && currentDog.hasBeenSwiped == true){
        instructionEl.innerHTML = `
        <p class="instruction-text">It's not all about the looks! Click <img src="/images/info-icon.png" class="primary-icon"> to read the profile!</p>
        `
    }

    if(dogArrayIndex === 2 && currentDog.hasBeenSwiped == true && expandedProfile.style.display === "block"){
        instructionEl.innerHTML = `
        <p class="instruction-text">Click <img src="/images/down-arrow.png" class="primary-icon"> to see the full profile again!</p>
        `
    }

}




export { renderIdlePage, checkUserConsent, renderWelcomeAnimations, renderWelcomePage, renderInstruction}