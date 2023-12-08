// express 라이브러리 쓸거임
const exp = require('constants');
const express = require('express');

// 객체 생성
const app = express();

// 포트번호
var portNumber = 8088;


app.listen(portNumber, () => console.log(`${portNumber}포트입니다.`));

app.use(express.urlencoded({extended: true}));

require('dotenv').config({path:"/src/board/env/.env.development"});

var mongodbUser = process.env.DB_USER;
var mongodbPassword = process.env.DB_PASSWORD;

var connectMongooseUrl = 'mongodb+srv://' + mongodbUser + ':' + mongodbPassword + '@cluster0.xxknzkk.mongodb.net/?retryWrites=true&w=majority';

// 몽구스 연결
const mongoose = require('mongoose');
mongoose
    .connect(
        connectMongooseUrl,
        {
            // useNewUrlPaser: true,
            // useUnifiedTofology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        }

    )
    .then(() => console.log('MongoDB conected'))
    .catch((err) => {
        console.log(err);
    });

const todoSchema = new mongoose.Schema({
    title: String,
    content: Number,
    dueDate: String,
    date: String
});

const Todo = mongoose.model('Todo', todoSchema);

// async function saveMovie() {
//     const amadeus = new tidi({title : 'Amadeus', year: 1986, score: 9.2, rating:'R'})
//     amadeus.save()
//     console.log(amadeus)    
// }

app.get('/pet', function (request, response) {
    response.send('shopping page for pet item');
});

app.get('/beauty', function (request, response) {
    response.send('shopping page for beauty item');
});

app.get('/add', function (request, response) {
    response.sendfile(__dirname + '/add.html')
    console.log('/add접속!')
});

app.post('/add', function(request, response){
    console.log(request.body)
    response.send(request.body)
});

app.get('/', function (request, response) {
    // __dirname 을 써서 디렉토리 설정 후 html 소환!
    response.sendfile(__dirname + '/index.html')
});
