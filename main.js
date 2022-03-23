$(document).ready(function () {
    const bricklayer = new Bricklayer(document.querySelector('.bricklayer'));

    const imgSrc = [
        './images/1 - ArsdCGv.jpg', './images/2 - LNUXzZF.jpg',
        './images/3 - kgTEVHZ.jpg', './images/4 - vZoqs0P.jpg',
        './images/5 - SEu9pHo.jpg', './images/6 - OkKwWM9.jpg',
        './images/7 - eUppgFB.jpg', './images/8 - WAIXTXs.jpg',
        './images/9 - vb0uajo.jpg', './images/10 - s6w2RpD.jpg'
    ]

    const renderData = (src) => {
        const node = document.createElement('li')
        node.className = "mb-5 grid-item animate__animated animate__bounce"
        node.innerHTML =
            `<img src="${src}" alt="">`
        return node
    }
    
    const render = () => {
        imgSrc.forEach((item, index) => {
            setTimeout(() => {
                bricklayer.append(renderData(item))
            }, index * 500)
        })
    }

    render()

})
