export const success = (obj:object) => {
    return {result:true, ...obj}
}

export const error = (obj:object) => {
    return {result:false, ...obj}
}

