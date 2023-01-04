
import {renderProfile, profileContainer, profileCard, expandedProfile, disableBtns, undoBtn, modifiableDogsData, dogArrayIndex, handleInfoBtnClick} from './index.js'
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
        <div class="consent-modal fade" id="consent-modal">
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

    let currentDog = getNewFakeDog()
    let modifiableDogsData = fakeDogsData
    profileCard.innerHTML = currentDog.getDogHtml()
    expandedProfile.innerHTML = currentDog.getAdditionalHtml()

    handleInfoBtnClick()

}


function getNewFakeDog(){
    let nextFakeDogData = fakeDogsData[dogArrayIndex]
    return nextFakeDogData ? new Dog(nextFakeDogData):{}
}



export { renderIdlePage, checkUserConsent, renderWelcomeAnimations, renderWelcomePage }