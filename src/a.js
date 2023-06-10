import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import express from 'express';
import initAPIRoute from './route/api';


// import connection from './configs/connectDB';
require('dotenv').config();




const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//setup view engine
configViewEngine(app);
//init web route
initWebRoute(app);
//init API
initAPIRoute(app);
//init dasj



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
//npm install