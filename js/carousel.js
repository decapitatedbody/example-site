const portfolioItems = document.querySelectorAll(".portfolio-item")
const carouselItems = document.querySelectorAll('.carousel-item')
const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')
const totalSlides = portfolioItems.length
let counter = 0

const hideAll = () => {
    carouselItems.forEach(item => {
        item.classList.remove('carousel-item-visible')
        item.classList.add('carousel-item-hidden')
    })
}

const getNext = (e) => {
    if (e.code === 'ArrowRight' || e.type === 'click') {
        hideAll()
        if (counter < totalSlides-1) {
            counter++
            carouselItems[counter].classList.add('carousel-item-visible')
        } else {
            counter = 0
            carouselItems[counter].classList.add('carousel-item-visible')
        }
    }
}

const getPrev = (e) => {
    if (e.code === 'ArrowLeft' || e.type === 'click') {
        hideAll()
        if (counter > 0) {
            counter--
            carouselItems[counter].classList.add('carousel-item-visible')
        } else {
            counter = totalSlides-1
            carouselItems[counter].classList.add('carousel-item-visible')
        }
    }
}

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        hideAll()
        overlay.style.display = "block"
        counter = parseInt(item.id, 10) 
        console.log(counter)
        carouselItems[counter].classList.remove('carousel-item-hidden')
        carouselItems[counter].classList.add('carousel-item-visible')
    })
})

const quitModal = (e) => {
    if (e.type === 'keydown') {
        if (e.code === 'Escape') overlay.style.display = 'none'
    } else {
        const isModal = modal.contains(e.target)
        if (!isModal) { 
            overlay.style.display = 'none'
        }
    }
}

document.addEventListener('keydown', quitModal)
overlay.addEventListener('click', quitModal)
document.addEventListener('keydown', getNext)
document.addEventListener('keydown', getPrev)
nextBtn.addEventListener('click', getNext)
prevBtn.addEventListener('click', getPrev)