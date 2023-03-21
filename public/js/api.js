let socket = io.connect(); 

socket.on('messages', data=> { 
    render(data);
});

function render(data) { 
    let html = data.map(elem=>{ 
        return(`<div class="chat">
            <p  class="chat__email">Usuario : ${elem.email}</p>
            <p  class="chat__fecha">(${elem.timestamp}):</p>
            <p  class="chat__texto"> ${elem.body}</p>
            </div>`) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}

function addMessage() { 
    let mensaje = { 
        email: document.getElementById('username').value,
        timestamp:new Date().toLocaleString(), 
        body: document.getElementById('texto').value
    }; 
    socket.emit('new-message', mensaje); 
    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()
    return false;
}
