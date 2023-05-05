class Observable {
    constructor(){
        this.eventCounter = -1
        this.events = {}
    }

    addEvent() {
        this.eventCounter++
        this.events[this.eventCounter] = {status: "waiting", type: undefined, data: undefined}
        return this.eventCounter
    }

    putData(id, data, type){
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

    getEvent(id) {
        
            if(id in this.events){
                return this.events[id]
            } else {
                return  {status: "error", type: "string", data: "Event does not exist"}
            }
    }

}

class Timer extends Observable {
    waitFor(ms) {
        let id = this.addEvent()
        setTimeout(() => {
            this.putData(
                id,  
                "int", 
                Date.now() 
            )
        }, ms)
        return id
    }
}