
import { currentDog, renderProfile, profileContainer, profileCard, expandedProfile,  modifiableDogsData, dogArrayIndex, handleInfoBtnClick} from './app.js'
import { fakeDogsData } from './data.js'
import dogClass from './Dog Class.js'
import { enableBtns , disableBtns, undoBtn, acceptBtn, superBtn, rejectBtn } from "./utils.js";

function renderAgreementPage(){
    disableBtns()
    undoBtn.disabled = "true"    

    profileCard.classList.add('welcome-screen')
    profileCard.style.backgroundImage = "url('./images/landing-bg.jpg')"
    profileCard.innerHTML = `
        <img class="tindog-icon-welcome slide-right" id="tindog-icon-welcome" src="./images/tindog-icon.png">
         
        <i class="fa-solid fa-heart heart-icon hidden" id="heart-icon"></i>
        <div class="consent-modal slide-left" id="consent-modal">
            <p class="white-text terms">To continue using our service, please confirm that you are not a cat</p>

            <div class="consent-input-box">
                <p>I confirm that I am not a cat</p>
                <label class="switch">
                    <input type="checkbox" id="consent-checkbox">
                    <span class="slider round"></span>
                </label>
            </div>

            <button disabled class="rectangular-btn-primary not-allowed" id="continue-btn">Continue &nbsp <i class="fa-solid fa-right-long"></i> </button>
        </div>
    `
}

function checkUserConsent() {
    const consentCheckbox = document.querySelector('#consent-checkbox')
    const continueBtn = document.querySelector('#continue-btn')
    
    consentCheckbox.addEventListener('change',()=>{    
        if(consentCheckbox.checked){
             continueBtn.disabled = false
             continueBtn.classList.remove('not-allowed')
             continueBtn.classList.add('cool-gradient')
             continueBtn.addEventListener('click',renderWelcomeAnimations)
        }else{
            continueBtn.disabled = true
            continueBtn.classList.add('not-allowed')
            continueBtn.classList.remove('cool-gradient')
        }
    })
}

function renderWelcomeAnimations(){
    const heartIcon = document.querySelector('#heart-icon')

    heartIcon.classList.remove("hidden")
    heartIcon.classList.add("fade-in", "enlarge")
    document.querySelector("#tindog-icon-welcome").classList.add("move-left")
    document.querySelector("#consent-modal").classList.add("move-right")
    profileCard.classList.add('slow-zoom') 
    // remove the opacity = 1 property in slow-zoom animation to make anything visible

    setTimeout(() => {
        renderWelcomePage()
        profileCard.classList.remove('slow-zoom') 
    }, 2200);

}

function renderWelcomePage(){
    profileCard.style.backgroundImage = "url('./images/welcome2-bg.jpg')"
    profileCard.innerHTML = `
        <div class="text-primary slide-right welcome-text-modal">🎉 Welcome to Tindog: 🔥 World Edition - A fake dating app for canines everywhere! <br> Ready for a walkthrough?</div>
        <button class="rectangular-btn-primary cool-hover slide-left" id="continue-btn-2">Yes &nbsp <i class="fa-solid fa-right-long"></i> </button>
    `

    document.querySelector('#continue-btn-2').addEventListener('click',()=>{
        profileCard.classList.add('quick-zoom') 
        setTimeout(() => {
            renderTutorial()
            profileCard.classList.remove('quick-zoom') 
        }, 500);
        
    })
}

function renderTutorial(){
    profileCard.classList.remove('welcome-screen')  
    renderProfile()
    handleInfoBtnClick()
}


export { renderAgreementPage, checkUserConsent, renderWelcomeAnimations, renderWelcomePage }