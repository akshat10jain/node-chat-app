const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const {generateMessage}=require('./utils/message');

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
  socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));

 //socket .broadcast .emit from admin text new user joined
 socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

socket.on('createMessage',(message,callback)=>{
  console.log('createMessage', message);

  // every body see the message including me
  io.emit('newMessage',generateMessage(message.from,message.text))
  callback('this is frm the server');

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
