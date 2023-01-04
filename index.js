
import {dogsData, fakeDogsData} from "./data.js";
import Dog from "./Dog.js";
import { renderIdlePage, checkUserConsent, renderWelcomeAnimations, renderWelcomePage, renderInstruction} from "./welcomeScreen.js";

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



let dogArrayIndex = 0 // dogArrayIndex is initialized to 0 to store the first object
let currentDog = getNewDog() // call on getNewDog function to get the object data


function getNewDog(){    
    let nextDogData = modifiableDogsData[dogArrayIndex] 
    return nextDogData ? new Dog(nextDogData): {}     
}

function renderProfile(){
    profileCard.innerHTML = currentDog.getDogHtml()
    expandedProfile.innerHTML = currentDog.getAdditionalHtml()
    renderInstruction()
    handleInfoBtnClick()
}

renderIdlePage()
checkUserConsent()


function handleInfoBtnClick(){
    let dogAvatar = document.getElementById('dog-avatar')
    let textOverlay = document.getElementById('text-overlay-container')
    let infoBtn = document.getElementById('info-icon')
    let downArrow = document.getElementById('down-arrow')

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
    })   
}

undoBtn.addEventListener('click', ()=>{
    if(dogArrayIndex => 3){
        setTimeout(()=>{
            disableBtns()
            dogArrayIndex -= 1
            currentDog = getNewDog()
            renderProfile()
            enableBtns()
            undoBtn.disabled = false;
            
            if (dogArrayIndex === 0){
                undoBtn.disabled = true;
            } 
            
            if (currentDog.hasBeenLiked === true){
                removeBadge(`badge-like`)
            }
            else{
                removeBadge(`badge-nope`)
            }
            
            modifiableDogsData[dogArrayIndex].hasBeenLiked = false  
        },500)
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
                
            },800)
        }
        else {
            setTimeout(()=>{renderEndScreen()}, 800) 
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


export {renderProfile, profileCard, profileContainer, expandedProfile, disableBtns, undoBtn, acceptBtn, superBtn, rejectBtn, modifiableDogsData, dogArrayIndex, handleInfoBtnClick}