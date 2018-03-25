var socket=   io();

 socket.on('connect',function (){
     console.log('connected to server');

socket.emit('createMessage',{
    from:'jfh'

})

 })

 socket.on('disconnect',function (){
    console.log('disconneced from server');
 })

 socket.on('newMessage',function(data) {
     console.log(data);
 })