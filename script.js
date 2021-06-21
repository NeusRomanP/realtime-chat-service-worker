if(navigator.serviceWorker){
    navigator.serviceWorker.register("sw.js");
}

let button = document.getElementById("sendbutton");

button.addEventListener("click", sendMessage);

function sendMessage(){
    let message = document.getElementById("mymessage").value;
    if(message!=""){
        navigator.serviceWorker.ready.then(res => res.active.postMessage(message));
    }
    
}

let input = document.getElementById("mymessage");
input.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        button.click();
    }
});

navigator.serviceWorker.addEventListener("message", e=>{
    let fathernode = document.createElement("DIV");
    let node = document.createElement("P");
    if(e.data.client){
        fathernode.className="client"
        node.className="client-child"
    }else{
        fathernode.className="service"
        node.className="service-child"
    }
    let textnode = document.createTextNode(e.data.msg);

    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let time = hour +":"+ min;

    let timenode = document.createElement("SPAN");
    let timetext = document.createTextNode(time);

    timenode.className="time";
    timenode.appendChild(timetext);
    
    node.appendChild(textnode);
    node.appendChild(timenode);
    fathernode.appendChild(node);
    
    document.querySelector(".chat-container").appendChild(fathernode);

    document.getElementById("mymessage").value="";
})
