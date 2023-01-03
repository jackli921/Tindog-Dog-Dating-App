
import {renderProfile, profileContainer, profileCard} from './index.js'

function displayWelcomeScreen(){    
    profileContainer.classList.add('welcome-screen')
    profileContainer.style.backgroundImage = "url('./images/welcome-bg.jpg')"

    profileContainer.innerHTML = `

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
    profileContainer.classList.add('slow-zoom') 
    // gotta remove the opacity =1 property in slow-zoom class to make anything visible

    // renderProfile()
    profileContainer.classList.remove('slow-zoom') 
    profileContainer.classList.remove('welcome-screen')  
    profileContainer.style.background = "none"
    profileContainer.innerHTML =  `
        <div id="profile-card"></div>
        <div class="expanded-profile-container hidden" id="expanded-profile"></div>
         `
    renderProfile()
}

// function displayAuth(){
//     profileContainer.classList.remove('slow-zoom') 
//     profileContainer.classList.remove('welcome-screen')  
//     profileContainer.style.background = "none"
    
    // profileContainer.classList.add('sliding-background-animation')

    // profileContainer.innerHTML = `
    // <div class="welcome-text">We're authenticating you</div>
    
    // `


// }

export { displayWelcomeScreen, checkUserConsent, displayWelcomeAnimations}