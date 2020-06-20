export const stringUtils = {
    removeSymbol: (text:string)=>{
        return text.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, "")
    }
}