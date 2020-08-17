

export const throttle = function(callback: Function, time: number){
    let throttleCheck = false
    return function(){
        if(!throttleCheck){
            throttleCheck = true
            setTimeout(() => {
                if(callback) callback();
                throttleCheck = false
            }, time);
        }
    }
}

