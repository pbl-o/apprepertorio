const express = require('express')
const cors = require('cors')
const path = require('path')
const fs  = require('fs')

const app =express()
const port = 3000



//middleware
app.use(express.json())
app.use(cors())

//rutas
app.get('/', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, 'index.html'))
})



app.listen(port, ()=>{
    console.log(`Servidor activo en http://localhost:${port}`)
})