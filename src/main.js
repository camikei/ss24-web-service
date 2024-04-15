const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}))

app.get('/', function (req, res){
    res.sendFile(__dirname + '/public/index.html')
})
app.post('/create-avatar',function (req, res){
    console.log(req.body);

    const avatar = {
        id: Date.now(),
        avatarName: req.body.avatarName,
        childAge: req.body.childAge,
        skinColor: req.body.skinColor,
        hairstyle: req.body.hairstyle,
        headShape: req.body.headShape,
        upperClothing: req.body.upperClothing,
        createdAt: new Date().toISOString()
    }

    try {
        const data = await fs.readFileSync(`${__dirname}/public/avatars.json`)
        const currentAvatars = JSON.parse(data)

        currentAvatars.push(avatar)

        await fs.writeFileSync(`${__dirname}/public/avatars.json`, JSON.stringify(currentAvatars))

        res.sendStatus(200)
    } catch (error){
        res.sendStatus(500)
    }
})
app.listen(3000, () =>
    console.log("Server running...")
)