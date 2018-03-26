var socket=   io();

 socket.on('connect',function (){
     console.log('connected to server');
})
 socket.on('disconnect',function (){
    console.log('disconneced from server');
 })

 socket.on('newMessage',function(data) {
     console.log(data);
     var li=jQuery('<li></li>');
     li.text(`${data.from}: ${data.text}`);

     jQuery('#messages').append(li);
 })


 //acknowledge sent from server to client
//  socket.emit('createMessage', {
//     from:'froank',
//     text:'hi'
// },function(data) {
//     console.log('got it',data);
// });

jQuery('#message-form').on('submit',function(e){
e.preventDefault();
socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
},function(){

})
})
