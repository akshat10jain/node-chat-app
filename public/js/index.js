var socket=   io();

function scrollToBottom () {
      //selectors
      var messages=jQuery('#messages');
      var newMessage=messages.children('li:last-child');
      //heights
      var clientHeight = messages.prop('clientHeight');
      var scrollTop = messages.prop('scrollTop');
      var scrollHeight = messages.prop('scrollHeight');
      var newMessageHeight = newMessage.innerHeight();
      var lastMessageHeight = newMessage.prev().innerHeight();
      if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ){
          messages.scrollTop(scrollHeight);
      }

}


 socket.on('connect',function (){
     console.log('connected to server');
})
 socket.on('disconnect',function (){
    console.log('disconneced from server');
 })

 socket.on('newMessage',function(data) {

    var formattedTime=moment(data.createdAt).format('h:mm a');
    var template=jQuery('#message-template').html();
    var html=Mustache.render(template,{
        text:data.text,
        from:data.from,
        createdAt:formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // var formattedTime=moment(data.createdAt).format('h:mm a');

    //  var li=jQuery('<li></li>');
    //  li.text(`${data.from} ${formattedTime} : ${data.text}`);

    //  jQuery('#messages').append(li);
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