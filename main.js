const API_URL = 'https://hex-escape-room.herokuapp.com'
const CORS_URL = 'https://kylen-cors-anywhere.herokuapp.com'
let resData = []
let sideDate = {}

const dateFormat = (time) => {
    const event = new Date(time)
    return event.toLocaleString()
}

const appendAside = () => {
    const exist = document.getElementsByClassName('aside-news').length > 0
    if (exist) $('.aside-news').remove()
    
    $('.row').append(`
            <div class="col-12 col-md-6 col-lg-3 aside-news"> 
                <div class="sticky-top">
                    <button class="btn btn-outline-secondary shadow border-0">
                        <i class="bi bi-caret-left-fill"></i> 返回
                    </button>
                    <h2 class="mt-3">${sideDate.title}</h2>
                    <span>${dateFormat(sideDate.publishedAt)}</span>
                    <img src="${sideDate.urlToImage}" class="img-fluid" alt="">
                    <p>${sideDate.description}
                    </p>
                    <a href="${sideDate.url}" target="blank">看更多</a>
                </div>
            </div>
    `)

    $(".btn").click(() => {
        $(".aside-news").remove()
    })
}

const cardClick = (event) => {
    $(".sticky-top").remove()

    $.ajax({
        type: "GET",
        url: `${CORS_URL}/${API_URL}/api/cors/news/${event.data.id}`,
        dataType: "json",
        success: (res) => {
            sideDate = res.data
            appendAside()
        },
        error: (err) => {
            console.log(err);
        }
    })

}

const appendCard = () => {
    $(".news-list").append(resData.map(item => {
        return `
            <div class="col">
                <div id="card-${item.id}" class="card bg-dark text-white card-gradient">
                    <img src="${item.urlToImage}" class="card-img"
                        alt="${item.title}">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${dateFormat(item.publishedAt)}</p><a href="#"
                            class="stretched-link"></a>
                    </div>
                </div>                    
            </div>
        `
    }))
    resData.forEach(item => (
        $(`#card-${item.id}`).bind("click", { id: item.id }, cardClick)
    ))
}

$.ajax({
    type: "GET",
    url: `${API_URL}/api/cors/news`,
    dataType: "json",
    success: (res) => {
        resData = res.data
        appendCard()
    },
    error: (err) => {
        console.log(err);
    }
})
