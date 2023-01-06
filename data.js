const realDogsData = [
    
    {
        name: "Emilia",
        avatar: "/images/dog-emilia.jpg",
        age: 13,
        city: "Berlin",
        country: "Germany",
        likes:"Cats. Snow. Mailman",
        dislikes: "trucks in general",
        bio: "Kids just gone off to another family - so time to get herself out there / Not used a webcam before.",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Terry",
        avatar: "/images/dog-terry.jpg",
        age: 9,
        city: "Venice",
        country: "Italy",
        likes:"Walks (not in the rain). Beans. Sausages ",
        dislikes:"most mushrooms except Shiitake",
        bio: "Handsome lad, will take you for a pint of stones and chips and gravy.",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Koharu",
        avatar: "/images/dog-koharu.jpg",
        age: 3,
        city: "Gifu",
        country: "Japan",
        likes:"Plastic bottles, bottles caps, owner's chopstick",
        dislikes:"Owner's younger sister. Birds",
        bio: "removing food from the bowl to eat off the floor and chasing a ball once then not giving it back. Get onto desks but not sure how to get off",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Lily",
        avatar: "/images/dog-lily.jpg",
        age: 6,
        city: "Brighton",
        country: "United Kingdom",
        likes:"getting trimmed",
        dislikes:"showers",
        bio: 'Petite strawberry blonde. Likes long walks and also being carried. How can I say "multiple personality disorder" without sounding mental?',
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Ikesuke",
        avatar: "/images/dog-ikesuke.jpg",
        age: 8,
        city: "Honlulu",
        country: "United States",
        likes:"posing, staring at people, sniffing, ",
        dislikes:"perfumes",
        bio: "Half-Japanese American. Loves adventure and sunshine",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Milo",
        avatar: "/images/dog-milo.jpg",
        age: 10,
        city: "Vienna",
        country: "Austria",
        likes:"flowers, trees, nature",
        dislikes:"Having nails clipped, that dog down the road, early mornings",
        bio: "Loves: the outdoors, chasing squirrels, bubble wrap.", 
        hasBeenSwiped: false,
        hasBeenLiked: false
    },

    {
        name: "Bob",
        avatar: "/images/dog-bob.jpg",
        age: 12,
        city: "Phenoix",
        country: "Arizona",
        likes:"my cushion",
        dislikes:"cold rooms",
        bio: "Looks tough but a real softie. Just looking for someone special to love me as I am",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },

    {
        name: "Doge",
        avatar: "/images/dog-doge.jpg",
        age: 5,
        city: "Chitose",
        country: "Japan",
        likes:"Beds. Tatami. Hotsprings",
        dislikes:"Hard matresses",
        bio: "True homebuddy. Can spend 24 hours on the couch. Lived 2 years in Canada. Enjoyed the snow. Moving back to Toronto next year. ",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },

        {
        name: "Martin",
        avatar: "/images/dog-martin.jpg",
        age: 6,
        city: "Auckland",
        country: "New Zealand",
          likes:"All mammals",
        dislikes:"Suspicious of birds",
        bio: "Loves to swim, run, walk but most of all to eat.",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },

]

const fakeDogsData = [
    
    {
        name: "Fake Dog",
        avatar: "/images/dog-rex.jpg",
        age: 5,
        city: "Taxes",
        country: "United States",
        likes:"Art. Literature. Natural wine. Yoga",
        dislikes:"Cats larger than myself",
        bio: "Swipe left if you don't like sweet potatoes",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Another fake dog",
        avatar: "/images/dog-bella.jpg",
        age: 3,
        city: "Barcelona",
        country: "Spain",
        likes:"Tapas",
        dislikes:"home alone",
        bio: "Born and raised in London. Lives in Barcelona. Enjoys running around the garden and sunbathing. I’d love to have kids in the next two years. ",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Yet another fake dog",
        avatar: "/images/dog-teddy.jpg",
        age: 11,
        city: "Buenos Aires",
        country: "Argentina",
        likes:"cafe, leche, te",
        dislikes:"mucho calor o mucho frío",
        bio: "¿Cómo te va? Me gusto los gatos muchisimo. Desliza hacia la izquierda si no te gusta bailar.",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "One last fake dog",
        avatar: "/images/dog-rex.jpg",
        age: 1,
        city: "Taxes",
        country: "United States",
        likes:"Art. Literature. Natural wine. Yoga",
        dislikes:"Cats larger than myself",
        bio: "Swipe left if you don't like sweet potatoes",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
]

const instructions = {
    acceptBtn: `  <p class="instruction-text slide-right">Press <img "instruction-icons" src="./images/icon-accept.png"> to like a dog!</p>`,    
    superBtn: `<p class="instruction-text slide-left">Fell in love? Press <img class = "instruction-icons" src='./images/icon-super.png'> to superlike a dog!</p>`,
    rejectBtn: `<p class="instruction-text slide-right">Press <img "instruction-icons" src="./images/icon-reject.png"> to reject a dog!</p>`,
    undoBtn:` <p class="instruction-text slide-left">Regretting your decision? Press
         <img src="./images/icon-undo.png" class="instruction-icons"> to go back!</p>`,
    infoBtn:` <p class="instruction-text slide-right"> Remember! It's not all about the looks! Click <img src="/images/info-icon.png" class="primary-icon"> to read the profile!</p>`,
    downArrow: `<p class="instruction-text">Tap <img src="/images/down-arrow.png" class="primary-icon"> to view the dog's full photo again!</p>`,
    scrollDownText:` <p class="instruction-text">Scroll down, read their profile, and tap <img class="share-icon" src="./images/share-btn.svg"> to share their profile!</p>`,
    readyText:` <p class="instruction-text">Other icons do things to! Try them out! Ready to meet some dogs today?</p>
        <button id="ready-btn" class="rectangular-btn-primary cool-hover">Ready!</button>`
}
export { realDogsData, fakeDogsData, instructions }