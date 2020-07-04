

export const throttle = (function(){
    let throttleCheck = false
    return function(callback: Function, time: number){
        if(!throttleCheck){
            throttleCheck = true
            setTimeout(() => {
                if(callback) callback();
                throttleCheck = false
            }, time);
        }
    }
})()

