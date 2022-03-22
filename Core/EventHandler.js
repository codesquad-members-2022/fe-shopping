import {delay} from "../util.js";

export class EventHandler{
    #throttle;
    #currentCallback=-1;
    #prev=performance.now();
    #target;
    #cache;
    constructor() {
        this.#cache = time=>this.auto(time,fn,delay)
    }
    debounce(fn, delay){
        return ()=>{
            cancelAnimationFrame(this.#currentCallback);
            this.#currentCallback = requestAnimationFrame(fn);
        }
    }
    throttle(fn,time){
        if(this.#throttle===true)return false;
        this.#throttle = true;
        fn();
        delay(time).then(()=>this.#throttle=false)
    }
    startAuto(fn,delay){
        cancelAnimationFrame(this.#currentCallback);
        this.#currentCallback = requestAnimationFrame(this.#cache)
    }
    auto= (time, fn,delay)=>{
        if(time-this.#prev>=delay){
            this.#prev=time;
            fn();
        }else{ cancelAnimationFrame(this.#currentCallback)}
        this.#currentCallback = requestAnimationFrame(this.#cache)
    }
}

