
import {dogsData, fakeDogsData} from "./data.js";
import Dog from "./Dog.js";
import { renderIdlePage, checkUserConsent, renderWelcomeAnimations, renderWelcomePage, renderInstruction} from "./welcomeScreen.js";
import {renderScrollInstruction, renderPressDownBtnInstruction, renderFinalInstruction } from "./instructions.js"

let realDogData = dogsData.sort(() => Math.random() - 0.5)

let modifiableDogsData = [...fakeDogsData, ...realDogData];

// take control of all input buttons
const acceptBtn = document.getElementById('accept-btn')
const rejectBtn = document.getElementById('reject-btn')
const undoBtn = document.getElementById('undo-btn')
const superBtn = document.getElementById('super-btn')

// take control of page elements and their respective modals
const tindogLogo = document.getElementById('tindog-logo')
const homepageModal = document.getElementById('homepage-modal')
const unfinishedModal = document.getElementById('unfinished-modal')

const profileContainer = document.getElementById('profile-container')
const profileCard = document.getElementById('profile-card')
const expandedProfile = document.getElementById('expanded-profile')
// share modal

const closeShareModalBtn = document.querySelector('#close-share-modal-btn')
const shareModal = document.querySelector('#share-modal')

let dogArrayIndex = 0 // dogArrayIndex is initialized to 0 to store the first object
let currentDog = getNewDog() // call on getNewDog function to get the object data


function getNewDog(){    
    let nextDogData = modifiableDogsData[dogArrayIndex] 
    return nextDogData ? new Dog(nextDogData): {}     
}

function renderProfile(){
    profileCard.innerHTML = currentDog.getDogHtml()
    expandedProfile.innerHTML = currentDog.getAdditionalHtml()
    
    if(dogArrayIndex < 4 ){
        renderInstruction()
    }else{
        document.querySelector('#instruction').style.display = "none"
    }
    
    if (dogArrayIndex === 4){
         undoBtn.disabled = true;
    } 

    handleInfoBtnClick()
    handleShareBtnClick()
}

renderIdlePage()
checkUserConsent()

function renderRealDogArr(){
    

    enableBtns()
    dogArrayIndex += 2
    currentDog = getNewDog()

    renderProfile()
}



function handleInfoBtnClick(){


    let dogAvatar = document.getElementById('dog-avatar')
    let textOverlay = document.getElementById('text-overlay-container')
    let infoBtn = document.getElementById('info-icon')
    let downArrow = document.getElementById('down-arrow')

    if(dogArrayIndex < 2 || currentDog.name === "Yet another fake dog" && currentDog.hasBeenSwiped === false || dogArrayIndex === 3){
        infoBtn.classList.add('not-allowed')
    }
    else{
        infoBtn.addEventListener('click', ()=>{
        dogAvatar.classList.remove("zoom-out") 
        dogAvatar.classList.add("zoom-in")
        
        setTimeout(()=>{
            textOverlay.style.display = "none"
            dogAvatar.style.height = "400px"
            expandedProfile.classList.remove('hidden')
        },500)
        
        infoBtn.classList.toggle('hidden')
        downArrow.classList.toggle('hidden') 
        renderScrollInstruction()
    })

    downArrow.addEventListener('click', ()=>{
        dogAvatar.classList.remove("zoom-in")
        dogAvatar.classList.add("zoom-out")
        
        setTimeout(()=>{
            textOverlay.style.display = "block"
            dogAvatar.style.height = "600px"

        },500)
        
        infoBtn.classList.toggle('hidden')
        downArrow.classList.toggle('hidden')
        expandedProfile.classList.add('hidden')
        renderFinalInstruction()
    })  

    }
}

function handleShareBtnClick(){
    const shareBtn = document.querySelector('#share-btn')
    const isSampleDog = currentDog.hasBeenSwiped === false && dogArrayIndex === 2
    const isRealDog = dogArrayIndex === 0 || dogArrayIndex === 1 || dogArrayIndex === 3

    if (isSampleDog || isRealDog){
        return
    }

    const title = document.title;
    const url = document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : document.location.href;
    
    shareBtn.addEventListener('click',()=>{

        console.log("share btn clicked!")
        if(navigator.share){
            navigator.share({
                title:title, 
                url:url
            }).then(()=>{
                console.log("Thanks for sharing!")
            })
            .catch(console.error)
        }else{
            shareModal.style.display = "flex"
            const shareModalText = document.querySelector('#share-modal-text-container')
            shareModalText.innerHTML = `<p class="share-modal-text">
            Share a direct link to ${currentDog.name}'s profile on social media! </p>
            `
        }
    })
    
}




closeShareModalBtn.addEventListener('click',()=>{
    shareModal.style.display = "none"
    renderPressDownBtnInstruction()
})


undoBtn.addEventListener('click', ()=>{
    if(dogArrayIndex >= 5 || dogArrayIndex === 3){
        setTimeout(()=>{
            disableBtns()
            dogArrayIndex -= 1
            currentDog = getNewDog()
            enableBtns()            
            undoBtn.disabled = false;
            renderProfile()            
            if (currentDog.hasBeenLiked === true){
                removeBadge(`badge-like`)
            }
            else{
                removeBadge(`badge-nope`)
            }
            
            modifiableDogsData[dogArrayIndex].hasBeenLiked = false  
            modifiableDogsData[dogArrayIndex].hasBeenSwiped = true

        },200)
    }    
})

rejectBtn.addEventListener('click', ()=>{
    disableBtns()
    
    currentDog.hasBeenSwiped = true     // change the swiped and liked states to true 
    modifiableDogsData[dogArrayIndex].hasBeenSwiped = true  
        
    renderBadge("badge-nope") // display liked badge using DOM
    dogArrayIndex += 1 // increase object index by one
    
    renderNextDog()
})


acceptBtn.addEventListener('click', ()=>{
    disableBtns()
    currentDog.hasBeenSwiped = true     // change the swiped and liked states to true
    currentDog.hasBeenLiked = true   
    
    modifiableDogsData[dogArrayIndex].hasBeenLiked = true  
    modifiableDogsData[dogArrayIndex].hasBeenLiked = true  
        
    renderBadge("badge-like") // display liked badge using DOM
    dogArrayIndex += 1 // increase object index by one
    renderNextDog()
})


superBtn.addEventListener('click',()=>{
    disableBtns()
    currentDog.hasBeenSwiped = true     // change the swiped and liked states to true
    currentDog.hasBeenLiked = true   
    
    modifiableDogsData[dogArrayIndex].hasBeenLiked = true  
    modifiableDogsData[dogArrayIndex].hasBeenLiked = true  
        
    renderBadge("badge-like") // display liked badge using DOM
    dogArrayIndex += 1 // increase object index by one
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

function renderNextDog(){
        if(currentDog.hasBeenSwiped){
 
        if(dogArrayIndex < modifiableDogsData.length){
            setTimeout(()=>{
                currentDog = getNewDog()     
                renderProfile()
                
                if(dogArrayIndex > 4){
                enableBtns()
                }
                
            },400)
        }
        else {
            setTimeout(()=>{renderEndScreen()}, 400) 
        }
    }

}

function renderBadge(badgeName){
    const badgeContainer = document.getElementById("badge-container") 
    badgeContainer.innerHTML = `<img class="badge" id="badge"src="/images/${badgeName}.png">`       
    const badge = document.getElementById("badge")
    badge.classList.add("spin-in") // add spinning animation by adding in custom CSS 
}

function removeBadge(badgeName){
    const badgeContainer = document.getElementById("badge-container") 
    badgeContainer.innerHTML = `<img class="badge" id="badge"src="/images/${badgeName}.png">`       
    const badge = document.getElementById("badge")
    badge.classList.add("spin-out")
    setTimeout(()=>{
        badge.style.display = "none"
    },500)
}

function renderEndScreen(){
    expandedProfile.classList.add('hidden')
    profileCard.innerHTML =
        `
        <img class="profile-img final-message final-image" id="dog-avatar" src="images/dog-maru.jpg" alt="">    
        <h2 class="center final-message">😲 No more hot dogs left! 🐕</h2>
        <h2 class="center final-message">Try again in 1 hour! 🕦 </h2>
        `
}

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


export {currentDog, renderProfile, profileCard, profileContainer, expandedProfile, disableBtns, undoBtn, acceptBtn, superBtn, rejectBtn, renderRealDogArr, modifiableDogsData, dogArrayIndex, handleInfoBtnClick}