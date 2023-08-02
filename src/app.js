import  express  from "express";
import {__dirname} from './utils.js'
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js'
import { Server} from "socket.io";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname +'/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname +'/views/')
app.set('view engine','handlebars')

app.use('/api/views', viewsRouter)


const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`puerto ${PORT} activo`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket)=>{
    console.log('cliente conectado');
})