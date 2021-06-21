self.addEventListener("install", e => {
    console.log("instalando service worker")
})

self.addEventListener("activate", () => {
    console.log("Service worker activo")
})

self.addEventListener("fetch", ()=>{
    console.log("interceptando peticion");
})

self.addEventListener("message", (e)=>{
    self.clients.matchAll({includeUncontrolled: true, type: "all"}).then(function(clients) {
        for(let i = 0; i<clients.length; i++){
            if(clients[i].focused){
                clients[i].postMessage({
                    msg: e.data,
                    client: true,
                });
            }else{
                clients[i].postMessage({
                    msg: e.data,
                    client: false,
                });
            }
            
        }
    });
})

/*self.clients.matchAll({includeUncontrolled: true, type: "window"}).then(function(clients) {
    console.log(clients);
    clients.forEach(client => {
        client.postMessage();
    });
});*/