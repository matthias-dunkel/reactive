class Observable {
    constructor(){
        this.eventCounter = -1
        this.events = {}
    }

    addPromise() {
        this.eventCounter++
        this.events[this.eventCounter] = {status: "waiting", type: undefined, data: undefined}
        return this.eventCounter
    }

    getPromise(id) {
        if(id in this.events){
            return this.events[id]
        } else {
           throw new Error("Event with: " + id + "does not exist")
        }
    }

    putData(id, type, data){
        if(id in this.events){
            if(this.events[id].status !== "fullfilled"){
                this.events[id].data = data
                this.events[id].type = type
                this.events[id].status = "fullfilled"
            } else {
                throw new Error("Something went wrong: Event: " + id + " already fullfilled. Can not put data in a fullfilled Event.")
            }
        } else {
            throw new Error("Event does not exits in Oberservable")
        }
    }
}

class Timer {
    constructor(){
        this.obs = new Observable()
    }

    waitFor(ms) {
        let id = this.obs.addPromise()
        setTimeout(() => {
            this.obs.putData(
                id,  
                "int", 
                Date.now() 
            )
        }, ms)
        return id
    }

    getPromise(id){
        return this.obs.getPromise(id)
    }
}

class Input {
    constructor() {
        this.obs = new Observable()
        this.readline = require('readline')
        this.rl = this.readline.createInterface(process.stdin, process.stdout);
    }

    onInput() {
        let id = this.obs.addPromise()
        this.rl.on("line", data => {
                this.obs.putData(id, "string", data)
                this.rl.close()
        })
        return id
    }

    getPromise(id){
        return this.obs.getPromise(id)
    }
}
