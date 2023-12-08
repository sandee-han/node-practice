
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})