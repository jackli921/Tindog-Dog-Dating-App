
import {renderProfile, profileContainer, profileCard, expandedProfile, disableBtns, undoBtn} from './index.js'

function displayWelcomeScreen(){
    disableBtns()
    undoBtn.disabled = "true"    
    
    profileCard.classList.add('welcome-screen')
    profileCard.style.backgroundImage = "url('./images/welcome-bg.jpg')"
    profileCard.innerHTML = `
        <img class="tindog-icon-welcome fade" id="tindog-icon-welcome" src="./images/tindog-icon.png">
         
        <i class="fa-solid fa-heart heart-icon hidden" id="heart-icon"></i>
        <div class="consent-modal fade" id="consent-modal">
            <p class="welcome-text terms">To continue using our service, please confirm that you are a four-legged creature</p>

            <div class="consent-input-box">
                <p>I confirm that I am a four-legged creature</p>
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
             continueBtn.classList.add('cool-btn-gradient')
             continueBtn.addEventListener('click',displayWelcomeAnimations)
        }else{
            continueBtn.disabled = true
            continueBtn.classList.remove('cool-btn-gradient')
        }
    })
}

function displayWelcomeAnimations(){
    const heartIcon = document.querySelector('#heart-icon')

    heartIcon.classList.remove("hidden")
    heartIcon.classList.add("fade-in")
    document.querySelector("#tindog-icon-welcome").classList.add("move-left")
    document.querySelector("#consent-modal").classList.add("move-right")
    profileCard.classList.add('slow-zoom') 
    // gotta remove the opacity =1 property in slow-zoom class to make anything visible

    setTimeout(() => {
        displayAuth()
    }, 2200);

}

function displayAuth(){
    profileCard.classList.remove('slow-zoom') 
    profileCard.classList.remove('welcome-screen')  
    profileCard.style.background = "none"


    renderProfile()
    // profileContainer.classList.add('sliding-background-animation')

    // profileContainer.innerHTML = `
    // <div class="welcome-text">We're authenticating you</div>
    
    // `

}

export { displayWelcomeScreen, checkUserConsent, displayWelcomeAnimations, displayAuth }