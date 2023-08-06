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
app.set('views', __dirname +'/views')
app.set('view engine','handlebars')

app.use('/api/views', viewsRouter)


const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`puerto ${PORT} activo`)
})

const socketServer = new Server(httpServer)

const productos =[]

socketServer.on('connection', (socket)=>{
    console.log('cliente conectado');
    socket.emit('todoslosproductos', productos);

socket.on('producto',(producto)=>{
    productos.push({id:socket.id,producto})
    socketServer.emit('todoslosproductos',productos)
  })
  socket.on('eliminarProducto', (productoAEliminar) => {
    const indiceProducto = productos.findIndex(obj => obj.producto === productoAEliminar);
    if (indiceProducto !== -1) {
        productos.splice(indiceProducto, 1);
        socketServer.emit('todoslosproductos', productos);
    }
});

})