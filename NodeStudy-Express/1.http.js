const http = require('node:http');
const fs = require('node:fs')

const port = process.env.PORT ?? 3100

http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  if(req.url === '/'){
    res.end('Bienvenido a mi página de inicio');
  }else if(req.url === '/inge.jpg'){
    fs.readFile('./inge.jpg', (err, data) =>{
      if(err){
        res.statusCode = 500
        res.end('<h1>500 Intel Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'imagen/jpg')
        res.end(data)
      }
    })
  }else if(req.url === '/contacto'){
    res.end('Contacto');
  }else {
    res.statusCode = 404   // Not found
    res.end('<h1> 404 </h1>');
  }
  
}).listen(port, () =>{
  console.log('Server corriendo en el puerto http://localhost:3100/');
});
