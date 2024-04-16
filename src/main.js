const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(`${__dirname}/public/index.html`)
})
app.post('/api/avatars',async (req, res) =>{
    console.log("POST/api/avatars")
    console.log(req.body);

    const avatar = {
        id: Date.now(),
        avatarName: req.body.avatarName,
        childAge: parseInt(req.body.childAge),
        skinColor: req.body.skinColor,
        hairstyle: req.body.hairstyle,
        headShape: req.body.headShape,
        upperClothing: req.body.upperClothing,
        lowerClothing: req.body.lowerClothing,
        createdAt: new Date().toISOString()
    }

    try {
        const data = await fs.readFileSync(`${__dirname}/public/avatars.json`);
        const avatars = JSON.parse(data)

        avatars.push(avatar)

        await fs.writeFileSync(`${__dirname}/public/avatars.json`, JSON.stringify(avatars))

        res.sendStatus(200).set("Location", `/avatar/${avatar.id}`).send(avatar)
    } catch (error){
        res.sendStatus(500)
    }
})
app.listen(3000, () =>
    console.log("Server running...")
)