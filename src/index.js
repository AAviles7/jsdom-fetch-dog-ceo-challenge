const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', () => {
    loadDogimg()
    loadDogBreed()
    dropDown()
})

function loadDogimg(){
    fetch(imgUrl)
    .then(resp => resp.json())
    .then((dogData) => {
        dogData.message.forEach(image => renderDog(image))
    })
}

function loadDogBreed(){
    fetch(breedUrl)
    .then(resp => resp.json())
    .then((breedData) => {
        Object.keys(breedData.message).forEach(breed => dogBreeds(breed))
    })
}

function renderDog(dog){
    let dogBox = document.querySelector('#dog-image-container')
    let dogImg = document.createElement('img')
    dogImg.src = dog
    dogBox.appendChild(dogImg)
}

function dogBreeds(breed){
    let breedList = document.querySelector('#dog-breeds')
    let breedLi = document.createElement('li')
    breedLi.innerText = `${breed}`
    breedList.appendChild(breedLi)
}

// generates random color
function generateRandomColor()
{
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
    //random color will be freshly served
}

// color changer on click
document.addEventListener('click', (event) => {
    if(event.target.nodeName==='LI'){
        event.target.style.color = generateRandomColor()
    }
})


//finds selected option
function dropDown(){
    let dropDown = document.querySelector("#breed-dropdown")
    dropDown.addEventListener('change', () => {
        //deletes all breeds
        let bList = document.querySelector('#dog-breeds')
        while( bList.firstChild ){
            bList.removeChild( bList.firstChild );
          }
        //
        let option  = dropDown.value
        updateBreeds(option)
    })
}

//gets all breeds again and filters through them.
function updateBreeds(option){
    //grabs all breeds
    fetch(breedUrl)
    .then(resp => resp.json())
    .then((breedData) => {
        let allBreeds = Object.keys(breedData.message)
        // filters all breeds by first letter (selected option)
        let optionBreeds = []
        allBreeds.forEach(breed => {
            if(breed.charAt(0) === option){
                optionBreeds.push(breed)
            }
        })
        //renders new filtered list
        optionBreeds.forEach(oBreed => dogBreeds(oBreed))
    })
}