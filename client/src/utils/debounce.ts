

export const debounce = (function(){
    var timeout : any
    return function(callback: Function, time: number){
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            if(callback) callback();
        }, time);
        
    }
})()

