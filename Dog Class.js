// Dog class with constructor function that modifies data into html for rendering
import { slideDirection, dogArrayIndex } from "./app.js"
class DogClass{
    constructor(data){
        // assigns data to this
        Object.assign(this, data)
    }
    
    getDogHtml(){
        let { name, avatar, age, bio, city, country, likes, dislikes, hasBeenSwiped, hasBeenLiked } = this 
        return `
            <img class="profile-img" id="dog-avatar" src="${avatar}" alt="">
           
            <div id="badge-container"></div>
            
            <div class="text-overlay-container"id="text-overlay-container">
                <h4 id="dog-name">${name},
                <span id="dog-age">${age}</span></h4>
                
                <div id="location-overlay">
                    <img src="/images/location-icon.png" id="location-icon">
                    <span id="dog-location"> ${city}, ${country}</span>
                </div>
     
            </div>
            <img src="/images/info-icon.png" id="info-icon">
            <img src="/images/down-arrow.png" id="down-arrow" class="hidden">  
            <div id="instruction" class="instruction-overlay"></div>         
        `
    }
    
    getAdditionalHtml(){
        return `
            <h4 class="name-additional">${this.name},  <span class="age-additional">${this.age}</span></h4>    
            <div class="location-additional">
                <img src="/images/location-icon-grey.png" id="location-icon-additional">
                <span> ${this.city}, ${this.country}</span>
            </div>
            <hr>
            
            <p><strong>Likes:</strong> ${this.likes}</p>
            <br>
            <p><strong>Dislikes:</strong> ${this.dislikes}</p>
            <br>
            <p><strong>Bio:</strong> ${this.bio}</p>
            <br>
            <hr>
            <button id="share-btn" class="share-btn"><img class="share-icon" src="./images/share-btn.svg"></i>&nbsp<strong>${this.name}'s Profile </strong></button>
            `
        }
}

// Create the Dog class here
export default DogClass 


