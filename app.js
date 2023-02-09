
import {realDogsData, fakeDogsData} from "./data.js";
import dogClass from "./Dog Class.js";
import { enableBtns , disableBtns, undoBtn, acceptBtn, superBtn, rejectBtn } from "./utils.js";
import { renderAgreementPage, checkUserConsent, renderWelcomeAnimations, renderWelcomePage } from "./welcomeScreen.js";
import {isInstructionNeeded, renderScrollInstruction, renderPressDownBtnInstruction, renderFinalInstruction } from "./instructions.js"

let RandomizedRealDogData = realDogsData.sort(() => Math.random() - 0.5)
let modifiableDogsData = [...fakeDogsData, ...RandomizedRealDogData];


// take control of HTML elements and modals for future rendering
const tindogLogo = document.getElementById('tindog-logo')
const homepageModal = document.getElementById('homepage-modal')

const profileContainer = document.getElementById('profile-container')
const profileCard = document.getElementById('profile-card')
const expandedProfile = document.getElementById('expanded-profile')

const profileIcon = document.getElementById('profile-icon')
const chatIcon = document.getElementById('chat-icon')
const userProfileModal = document.getElementById('user-profile-modal')

// share to social media modal & buttons
const closeShareModalBtn = document.querySelector('#close-share-modal-btn')
const shareModal = document.querySelector('#share-modal')
let slideDirection = undefined;

let dogArrayIndex = 0 // dogArrayIndex is initialized to 0 to store the first object
let currentDog = getNewDog() // call on getNewDog function to get the object data



renderAgreementPage()
checkUserConsent()

function getNewDog(){    
    let nextDogData = modifiableDogsData[dogArrayIndex] 
    return nextDogData ? new dogClass (nextDogData): {}     
    // if "return nextDogData" returns a trucy value to the parent function of getNewDog(), then return the new constructed object instead
}

// renders dog data to DOM then checks index to determine if the tutorial instruction function should be called  
function renderProfile(){
    profileCard.innerHTML = currentDog.getDogHtml()
    expandedProfile.innerHTML = currentDog.getAdditionalHtml()
    isInstructionNeeded()
    handleInfoBtnClick()
    handleShareBtnClick()
    profileCard.style.height = "100%"
    expandedProfile.classList.add('hidden')
    
}

function renderRealDogArr(){
    enableBtns()
    dogArrayIndex += 2
    currentDog = getNewDog()
    renderProfile()
}

window.addEventListener('click', function(e){
    const audio = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`)
    const key = document.querySelector(`.key[data-key="${e.target.dataset.key}"]`)
    if (!audio) return 
    audio.play()
    key.classList.add('pressed')

})

function handleInfoBtnClick(){
    const dogAvatar = document.getElementById('dog-avatar')
    const textOverlay = document.getElementById('text-overlay-container')
    const infoBtn = document.getElementById('info-icon')
    const downArrow = document.getElementById('down-arrow')

    const isFakeDogs = dogArrayIndex < 2 || dogArrayIndex === 3
    const isFirstTimeLookAtDemoDog = currentDog.name === "Yet another fake dog" && currentDog.hasBeenSwiped === false

    if(isFakeDogs || isFirstTimeLookAtDemoDog){
        infoBtn.classList.add('not-allowed')
    }

    else{
        infoBtn.addEventListener('click', ()=>{
            profileCard.classList.remove("zoom-out") 
            profileCard.classList.add("zoom-in")
            
            setTimeout(()=>{
                textOverlay.style.display = "none"
                profileCard.style.height = "60%"
                expandedProfile.classList.remove('hidden')
            },300)
            
            infoBtn.classList.toggle('hidden')
            downArrow.classList.toggle('hidden') 
            renderScrollInstruction()
        })

        downArrow.addEventListener('click', ()=>{
            profileCard.classList.remove("zoom-in")
            profileCard.classList.add("zoom-out")
            
            setTimeout(()=>{
                textOverlay.style.display = "block"
                profileCard.style.height = "100%"

            },300)
            
            infoBtn.classList.toggle('hidden')
            downArrow.classList.toggle('hidden')
            expandedProfile.classList.add('hidden')
            renderFinalInstruction()
        })  
    }
}

function handleShareBtnClick(){
    const shareBtn = document.querySelector('#share-btn')
    const isDemoDog = currentDog.hasBeenSwiped === false && dogArrayIndex === 2
    const isFakeDogs = dogArrayIndex === 0 || dogArrayIndex === 1 || dogArrayIndex === 3

    if (isDemoDog || isFakeDogs){
        return
    }

    const title = document.title;
    const url = document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : document.location.href;
    
    shareBtn.addEventListener('click',()=>{

        
        if(navigator.share){
            navigator.share({
                title:title, 
                url:url
            }).then(()=>{
                console.log("Thanks for sharing!")
                 shareModal.style.display = "none"
                dogArrayIndex === 2 ? renderPressDownBtnInstruction() : dogArrayIndex 
            })
            .catch(console.error)
        }else{
            shareModal.style.display = "flex"
            const shareModalText = document.querySelector('#share-modal-text-container')
            shareModalText.innerHTML = `<p class="share-modal-text">
            Share a direct link to <strong>${currentDog.name}'s profile </strong> on social media! </p>
            `
        }
    })
    
}


closeShareModalBtn.addEventListener('click',()=>{
    shareModal.style.display = "none"
       dogArrayIndex === 2 ? renderPressDownBtnInstruction() : dogArrayIndex 
})

undoBtn.addEventListener('click', ()=>{
    if(dogArrayIndex > 4 || dogArrayIndex === 3){
        setTimeout(()=>{
            disableBtns()
            dogArrayIndex -= 1
            slideDirection = dogArrayIndex > 3 ? "shrink-left": slideDirection
            currentDog = getNewDog()
            enableBtns()            
            undoBtn.disabled = false;
            renderProfile()            

            if(currentDog.hasBeenLiked === true){
                renderBadge(`badge-like`, false)
            }
            else if(currentDog.hasBeenSuperLiked === true )
                renderBadge(`badge-super`, false)

            else{
                renderBadge(`badge-nope`, false)
            }

            modifiableDogsData[dogArrayIndex].hasBeenLiked = false  
            modifiableDogsData[dogArrayIndex].hasBeenSuperLiked = false  
            modifiableDogsData[dogArrayIndex].hasBeenSwiped = true

        },300)
    }    
})

rejectBtn.addEventListener('click', ()=>{
    disableBtns()
    
    // currentDog.hasBeenSwiped = true     // change the swiped and liked states to true 
    modifiableDogsData[dogArrayIndex].hasBeenSwiped = true  
        
    renderBadge("badge-nope", true) // display liked badge using DOM
    dogArrayIndex += 1 // increase object index by one
    
    
    setTimeout(() => {
            const dogAvatar = document.getElementById('dog-avatar')
            dogAvatar.classList.add('shrink-left')
    }, 300);

    // slideDirection = dogArrayIndex > 3 ? "swipe-left": slideDirection

    renderNextDog()
})


acceptBtn.addEventListener('click', ()=>{
    disableBtns()
    // currentDog.hasBeenSwiped = true     // change the swiped and liked states to true
    // currentDog.hasBeenLiked = true   
    
    modifiableDogsData[dogArrayIndex].hasBeenLiked = true  
    modifiableDogsData[dogArrayIndex].hasBeenSwiped = true  
        
    renderBadge("badge-like", true) // display liked badge using DOM
    dogArrayIndex += 1 // increase object index by one

    setTimeout(() => {
        const dogAvatar = document.getElementById('dog-avatar')
        dogAvatar.classList.add('shrink-right')
    }, 300);

    renderNextDog()
})


superBtn.addEventListener('click',()=>{
    disableBtns()
    // currentDog.hasBeenSwiped = true     // change the swiped and liked states to true
    // currentDog.hasBeenLiked = true   
    
    modifiableDogsData[dogArrayIndex].hasBeenSwiped = true  
    modifiableDogsData[dogArrayIndex].hasBeenSuperLiked = true  
        
    renderBadge("badge-super", true) // display liked badge using DOM
    dogArrayIndex += 1 // increase object index by one
    
    setTimeout(() => {  
       const dogAvatar = document.getElementById('dog-avatar')
        dogAvatar.classList.add('shrink-up')
    }, 300);

    renderNextDog()
})

tindogLogo.addEventListener('click', ()=>{
    disableBtns()
    undoBtn.disabled = true;
    homepageModal.style.display = "flex"
    
    document.getElementById('homepage-close-button').addEventListener('click',()=>{
        homepageModal.style.display = "none"
        enableBtns()
        undoBtn.disabled = true;
    })
})


profileIcon.addEventListener('click',()=>{
    renderUserUnderReviewModal()
})

chatIcon.addEventListener('click', ()=>{
    renderUserUnderReviewModal()
})

function renderUserUnderReviewModal(){
    userProfileModal.style.display = "flex"

}

document.getElementById('profile-close-button').addEventListener('click',()=>{
    userProfileModal.style.display = "none"

})

function renderNextDog(){ 
        if(dogArrayIndex < modifiableDogsData.length){
            setTimeout(()=>{
                currentDog = getNewDog()     
                renderProfile()
                
                if(dogArrayIndex > 4){
                enableBtns()
                }
                
            },500)
        }
        else {
            setTimeout(()=>{renderEndScreen()}, 500) 
        }
}

function renderBadge(badgeName, addBadge){
    const badgeContainer = document.getElementById("badge-container") 
    badgeContainer.innerHTML = `<img class="badge ${addBadge?"stamp-in": "stamp-out"}" id="badge"src="/images/${badgeName}.png">`       
    const badge = document.getElementById("badge")
}

function renderEndScreen(){
    expandedProfile.classList.add('hidden')
    document.getElementById('dog-avatar').style.backgroundImage = "url(''images/dog-maru.jpg'')"
    
    profileCard.innerHTML =
        `
        <h2 class="center final-message">😲 No more hot dogs left! 🐕</h2>
        <h2 class="center final-message">Try again in 1 hour! 🕦 </h2>
        `
}


export { slideDirection, currentDog, renderProfile, profileCard, profileContainer, expandedProfile, undoBtn, acceptBtn, superBtn, rejectBtn, renderRealDogArr, modifiableDogsData, dogArrayIndex, handleInfoBtnClick}