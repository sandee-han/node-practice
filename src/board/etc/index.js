
var cors = require('cors')
const port = 3000
 
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.get('/sound/:name', (req, res) => {
    const { name } = req.params

    if (name == "dog") {
        res.json({'sound': '왕왕'})
    } else if (name == "cat") {
        res.json({'sound': '냥냥'})
    } else if (name == "cow") {
        res.json({'sound': '음머'})
    } else {
        res.json({'sound': 'NA'})
    } 

})

app.get('/', function (request, response) {
    // __dirname 을 써서 디렉토리 설정 후 html 소환!
    response.sendfile(__dirname + '/index.html')
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})