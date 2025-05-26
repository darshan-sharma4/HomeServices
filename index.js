require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const express = require('express')
const app = express();
const port = 3001;

const connectToMongoDb = require('./connection')
connectToMongoDb('mongodb://localhost:27017/Home-Services').then(()=>console.log("MogoDb connected"))

const path = require('path')
const staticRoute = require('./routers/staticRoute')
const handleTechnician =require('./routers/technicianRouter')
const handleAdmin = require('./routers/adminRouter')
const handleUser = require('./routers/userRouter')
const mechanics = require('./routers/category')
const hireRoutes = require('./routers/hireRouter');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const cookieParser = require('cookie-parser');

app.use(cookieParser());


app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"));


app.use('/',staticRoute);

app.use('/category',mechanics);
app.use('/technician',handleTechnician);
app.use('/admin',handleAdmin);
app.use('/user',handleUser);
app.use('/hire', hireRoutes);

app.listen(port,()=>console.log('Server connected')); 