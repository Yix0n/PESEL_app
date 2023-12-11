import express, { IRoute } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

import validate from './validate';
import generate from './generate';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "/src/public/index.html"))
})

app.get("/wiki", (req, res) => {
    res.redirect("https://pl.wikipedia.org/wiki/PESEL")
})

app.get("/pope", (req, res) => {
    res.redirect("https://media.discordapp.net/attachments/1035061988222578709/1183743814817546321/pope.jpg?ex=65897256&is=6576fd56&hm=c84bd37f5a3a5f6c3c4c3ddc0b8a6d614fb9da21ba6672dc4f350c72f9d9caa2&=&format=webp&width=469&height=614")
})

io.on('connection', (socket) => {
    console.log(`[CONNECTION]> User ${socket.id} Connected`)
    socket.on("validate", (data:IValidate) => {
        let res = validate(data.pesel)
        socket.emit("validateRes", res)
    })

    socket.on("generate", (data:IGenerate) => {
        let res = generate(data.birth, data.sex);
        socket.emit("generateRes", res)
    })

    socket.on("disconnect", (reason) => {
        console.log(`[CONNECTION]> User ${socket.id} Disconnected. Reason : ${reason}`)
    })
})

server.listen(PORT, () => {
    console.log(`[SERVER]> Server is listening on port http://localhost:${PORT}`);
})

interface IValidate {
    pesel:string
}

interface IGenerate {
    sex:string,
    birth: string
}

