var socket=   io();

 socket.on('connect',function (){
     console.log('connected to server');
})
 socket.on('disconnect',function (){
    console.log('disconneced from server');
 })

 socket.on('newMessage',function(data) {

    var formattedTime=moment(data.createdAt).format('h:mm a');
    // console.log(data);
     var li=jQuery('<li></li>');
     li.text(`${data.from} ${formattedTime} : ${data.text}`);

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
     jQuery('[name=message]').val('')
})
})
// var location=jQuery('#send-location');
// locationButton.on('click',function(){
//     if(!navigator.geolocation){
//          return  alert('geolocation not supported by your browser');
//     }
    
//     navigator.geolocation.getCurrentPosition(function(position){
//            console.log(position);
//     },function(){
//         alert('Unable to fetch location');
//     })
// })