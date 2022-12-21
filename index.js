import dogs from "/data.js"
import DogClassConstructor from "/Dog.js"


let modifiableDogsData = [] // create new array from module
Object.assign(modifiableDogsData, dogs)

// take control of all inpu buttons
const acceptBtn = document.getElementById('accept-btn')
const rejectBtn = document.getElementById('reject-btn')
const undoBtn = document.getElementById('undo-btn')
const superBtn = document.getElementById('super-btn')

// take control of page elements and their respective modals
const tindogLogo = document.getElementById('tindog-logo')
const homepageModal = document.getElementById('homepage-modal')

const unfinishedModal = document.getElementById('unfinished-modal')
const expandedProfileContainer = document.getElementById('expanded-profile-container')


let dogArrayIndex = 0 // dogArrayIndex is initialized to 0 to store the first object
let currentDog = getNewDog() // call on getNewDog function to get the object data


function getNewDog(){    
    let nextDogData = modifiableDogsData[dogArrayIndex] 
    
    return nextDogData ? new DogClassConstructor(nextDogData): {}     
}

function render(){
    expandedProfileContainer.classList.add('hidden')
    document.getElementById('profile-container').innerHTML = currentDog.getDogHtml()
    expandedProfileContainer.innerHTML = currentDog.getAdditionalHtml()
    handleInfoBtnClick()
}

render()

function handleInfoBtnClick(){
    let dogImage = document.getElementById('dog-avatar')
    let textOverlay = document.getElementById('text-overlay-container')
    let infoBtn = document.getElementById('info-icon')
    let downArrow = document.getElementById('down-arrow')

    infoBtn.addEventListener('click', ()=>{
        dogImage.classList.remove("zoom-out") 
        dogImage.classList.add("zoom-in")
        
        setTimeout(()=>{
            textOverlay.style.display = "none"
            dogImage.style.height = "400px"
            expandedProfileContainer.classList.remove('hidden')
        },500)
        
        infoBtn.classList.toggle('hidden')
        downArrow.classList.toggle('hidden') 
    })

    downArrow.addEventListener('click', ()=>{
        dogImage.classList.remove("zoom-in")
        dogImage.classList.add("zoom-out")
        
        setTimeout(()=>{
            textOverlay.style.display = "block"
            dogImage.style.height = "600px"

        },500)
        
        infoBtn.classList.toggle('hidden')
        downArrow.classList.toggle('hidden')
        expandedProfileContainer.classList.add('hidden')
    })   
}

undoBtn.addEventListener('click', ()=>{
    if(dogArrayIndex > 0){
        setTimeout(()=>{
            disableBtns()
            dogArrayIndex -= 1
            currentDog = getNewDog()
            render()
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
    
    if(currentDog.hasBeenSwiped){
        
        if(dogArrayIndex != modifiableDogsData.length){
            setTimeout(()=>{
                currentDog = getNewDog()     
                render()
                enableBtns()
            },800)
        }
        else {
            setTimeout(()=>{endScreen()}, 800) 
        }
    }
})


acceptBtn.addEventListener('click', ()=>{
    disableBtns()
    currentDog.hasBeenSwiped = true     // change the swiped and liked states to true
    currentDog.hasBeenLiked = true   
    
    modifiableDogsData[dogArrayIndex].hasBeenLiked = true  
    modifiableDogsData[dogArrayIndex].hasBeenLiked = true  
        
    renderBadge("badge-like") // display liked badge using DOM
    dogArrayIndex += 1 // increase object index by one
    
    if(currentDog.hasBeenSwiped){
        if(dogArrayIndex != modifiableDogsData.length){
            setTimeout(()=>{
                currentDog = getNewDog()     
                render()
                enableBtns()
            },800)
        }
        else {
            setTimeout(()=>{endScreen()}, 800) 
        }
    }
})


superBtn.addEventListener('click',()=>{
    disableBtns()
    undoBtn.disabled = true;
    unfinishedModal.style.display = "flex"
    
    document.getElementById('close-button').addEventListener('click',()=>{
        unfinishedModal.style.display = "none"
        enableBtns()
        undoBtn.disabled = true;
    })
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

function endScreen(){
     expandedContainer.classList.add('hidden')
    document.getElementById('profile-container').innerHTML =
        `
        <img class="profile-img final-message final-image" id="dog-avatar" src="images/dog-maru.jpg" alt="">    
        <h2 class="center final-message">😲 No more hot dogs left! 🐕</h2>
        <h2 class="center final-message">Try again in 1 hour! 🕦 </h2>
        `
}


// input disable 
function disableBtns(){
    // undoBtn.disabled = true 
    acceptBtn.disabled = true // disable both input button when valid button click is detected
    rejectBtn.disabled = true
    superBtn.disabled = true   
}

// input enable 
function enableBtns(){
    // undoBtn.disabled = false 
    acceptBtn.disabled = false // disable both input button when valid button click is detected
    rejectBtn.disabled = false
    superBtn.disabled = false
    undoBtn.disabled = false   
}
// undo function


