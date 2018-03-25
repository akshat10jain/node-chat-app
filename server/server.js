const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');


const publicPath=path.join(__dirname,'../public')
const port =process.env.PORT || 3000;
var app=express();

var server=http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
//console.log('jgjhg')

io.on('connection',(socket)=>{
 console.log('new user connected');

 // socket .emit  from admin text welcome to chat app
  socket.emit('newMessage',{
      from:'Admin',
      text:'Welcome to chat app',
      createdAt:new Date().getTime()
  })

 //socket .broadcast .emit from admin text new user joined
 socket.broadcast.emit('newMessage',{
     form:'Admin',
     text:'New user joined',
     createdAt:new Date().getTime()
 })

socket.on('createMessage',(message)=>{
  console.log('createMessage', message);

  // every body see the message including me
  io.emit('newMessage',{
    from:message.from,
    text:message.text,
    createdAt:new Date().getTime()
  })

// we will not see the message we send but every body else

//  socket.broadcast.emit('newMessage', {
//     from:message.from,
//         text:message.text,
//         createdAt:new Date().getTime()
//  });
});
   

 socket.on('disconnect',()=>{
    console.log('user was disconnected');
 })
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
})
