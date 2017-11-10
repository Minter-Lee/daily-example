// 通过Generator和Promise结合，不断交替执行权来实现异步代码同步化书写

var g = function* () {
    try {
        var result = yield requestUrl('url')
        console.info(result);
    } catch(e) {
        console.info(e);
    }
}

var requestUrl = new Promise(function(resolve, reject){
    var client = new XhrHttpRequest();
    client.open('Get',url);
    client.onreadystatechchange = handler;
    client.responseType = 'json';
    client.setRequestHeader = ["Accept","applycation/json"]
    client.send(); 

    function handler() {
        if (this.readyState !== 4) {
            return;
        }
        if(this.status == 200) {
            resolve(this.response)
        } else {
            reject(new Error(this.statusText))
        }
   }
});

function run(generator) {
    var it = generator;
    function go(result) {
        if (result.done)  return result.value;

        return result.value.then(function(value) {
            return go(it.next(value));
        }, function(error){
            return go(it.throw(error));
        })
    }

    go(it.next());
}