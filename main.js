const API_URL = 'https://hex-escape-room.herokuapp.com'

const showData = (data) => {

    data.forEach(item => {
        item.publishedAt = moment.tz(item.publishedAt, item.iana).format("YYYY-MM-DD HH:mm:ss")
    })
    axios.post(`${API_URL}/api/news/v1/data`, {
        data: data
    }).then(res => console.log(res.data))
}

axios.get(`${API_URL}/api/news/v1/data`)
    .then(res => {
        showData(res.data.articles)
    })
    .catch(err => err)
