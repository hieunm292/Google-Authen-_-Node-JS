const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000

//Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '432168670314-omrcangnq2oft24kevcq5onso158i05k.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

app.set('view engine', 'ejs');

app.use(express.urlencoded(extended= true));
app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login'),(req,res)=>{
    let token=req.nody.token;
    console.log(token);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, 
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload)
    }
    verify().catch(console.error);
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})