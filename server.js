// lib & framework
const exp = require('constants');
const express = require('express');
const dotenv = require('dotenv');

// 객체 생성
const app = express();

// 포트번호
var portNumber = 8088;
app.listen(portNumber, () => console.log(`${portNumber}포트입니다.`));

// path 내장 모듈 설정
const path = require('path');

// ejs 사용 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/board/views'));

app.use(express.urlencoded({ extended: true }));

// 환경변수 불러오기
dotenv.config();

var mongodbUser = process.env.DB_USER;
var mongodbPassword = process.env.DB_PASSWORD;

console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

var connectMongooseUrl = 'mongodb+srv://' + mongodbUser + ':' + mongodbPassword +
    '@cluster0.xxknzkk.mongodb.net/?retryWrites=true&w=majority';

// 몽구스 연결
const mongoose = require('mongoose');
const { db } = require('mongodb');
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


// todo DB Schema 생성
const todoSchema = new mongoose.Schema({
    title: String,
    content: String,
    dueDate: String,
    date: String
});

const todo = mongoose.model('todo', todoSchema);

// 입력된 todo DB 저장
async function saveTodo(request) {
    const firstTodo = new todo(
        {
            title: request.body.title,
            content: request.body.content,
            dueDate: request.body.dueDate,
            date: dateFormat(today)
        });
    firstTodo.save();
    console.log(firstTodo);
}

// 날짜
const today = new Date;

function dateFormat(today) {
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    return year + '/' + month + '/' + date;
}

app.get('/list', async function (err, response) {
    try {
        const todos = await todo.find({});
        response.render('list.ejs', { todos: todos });
        console.log(todos);
    } catch (err) {
        console.log(err);
    }
});

app.get('/add', function (request, response) {
    response.sendfile(__dirname + '/src/board/etc/add.html');
    console.log('/add접속!');
});

app.post('/add', function (request, response) {
    console.log(request.body);
    saveTodo(request);
    response.send(request.body);
});