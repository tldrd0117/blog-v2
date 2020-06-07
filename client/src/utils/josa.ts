class Josa {
    format1 = ["을","를","을/를","을를"]
    format2 = ["은","는","은/는","은는"]
    format3 = ["이","가","이/가","이가"]
    format4 = ["과","와","과/와","과와"]
    get(str:string, target:string){
        if(this.format1.includes(target)){
            return str + this.hasLast(str)? "을":"를";
        } else if(this.format2.includes(target)){
            return str + this.hasLast(str)? "은":"는";
        } else if(this.format3.includes(target)){
            return str + this.hasLast(str)? "이":"가";
        } else if(this.format4.includes(target)){
            return str + this.hasLast(str)? "과":"와";
        } else {
            throw new Error("잘못된 형식");
        }
    }

    hasLast(str: string){ //string의 마지막 글자가 받침을 가지는지 확인
        let num = str.charCodeAt(str.length - 1);
        return (num - 0xac00) % 28 > 0;
    }
}

export default new Josa()
