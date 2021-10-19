const portfolio = document.getElementById('portfolio-container')
const snakeGame = document.getElementById('snakeGame')
const modal = document.getElementById('modal')
const carousel = document.getElementById('carousel')
const navBtns = document.querySelectorAll(".nav-btn")
const mainContent = document.querySelector('.container-main')
const overlay = document.getElementById('overlay')
const submitBtn = document.getElementById('submit')

const photos = [
    "images/dino-reichmuth-kk3W5-0b6e0-unsplash.jpg",
    "images/garrett-parker-DlkF4-dbCOU-unsplash.jpg",
    "images/qingbao-meng-01_igFr7hd4-unsplash.jpg",
    "images/samuel-ferrara-uOi3lg8fGl4-unsplash.jpg"
] 

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
})

const displayPhotos = (photos, type) => {
    let items = photos.map((photo, index) => {
        return `<div id=${index} class=${type}-item>
                <img src=${photo} class=${type}-img>
            </div>
        `
    })
    type === 'carousel' ?
        carousel.innerHTML += items.join('') :
        portfolio.innerHTML += items.join('')
}


const getSection = (e) => {
    const btnId = e.target.id.slice(0,-4)
    for (let i=0; i<mainContent.children.length; i++){
        if (mainContent.children[i].id === btnId) {
            mainContent.children[i].style.display = 'block'
        } else {
            mainContent.children[i].style.display = 'none'
        }
    }
}

displayPhotos(photos, 'carousel')
displayPhotos(photos, 'portfolio')

navBtns.forEach(btn => {
    console.log(btn)
    btn.addEventListener('click', getSection)
})

