const { HmacSHA256 } = CryptoJS;
const { Base64 } = CryptoJS.enc;

const URL = "https://hex-escape-room.herokuapp.com/api/linePay/v3/payments/request"

const secret = 'OPbD1Pr6ClcPXvd9BHHso1EvhARV0iEz';
const channelId = '1234567890';
const uri = '/v3/payments/request';
const nonce = Math.floor(Date.now() / 1000);
const body = {
    "amount": 100,
    "currency": "TWD",
    "orderId": "xgmks1639467061",
};

const encrypt = Base64.stringify(
    HmacSHA256((secret + uri + JSON.stringify(body) + nonce), secret)
);

const headers = {
    headers: {
        "Content-Type": "application/json",
        "X-LINE-ChannelId": channelId,
        "X-LINE-Authorization-Nonce": nonce,
        "X-LINE-Authorization": encrypt,
    }
};

axios.post(URL, body, headers)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))