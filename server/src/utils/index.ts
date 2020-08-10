import Hangul from 'hangul-js'
export const stringUtils = {
    removeSymbol: (text:string)=>{
        return text.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, "")
    },
    predictJamo: (word:string)=>{
        let lastWord = word[word.length -1]
        if(Hangul.isConsonant(lastWord) || Hangul.isComplete(lastWord)){
            const disWord = Hangul.disassemble(lastWord)
            if(disWord.length <4){
                const jamoMap = {"ㄱ":"가","ㄲ":"까","ㄴ":"나","ㄷ":"다","ㄸ":"따","ㄹ":"라","ㅁ":"마","ㅂ":"바","ㅃ":"빠","ㅅ":"사","ㅆ":"싸","ㅇ":"아","ㅈ":"자","ㅉ":"짜","ㅊ":"차","ㅋ":"카","ㅌ":"타","ㅍ":"파","ㅎ":"하"}
                var texts = new Array()
                var targets = new Array()
                if(disWord.length == 1){
                    if(!Hangul.isConsonant(lastWord)) return;
                    targets.push({
                        fixed : word.slice(0, word.length-1),
                        first : jamoMap[lastWord],
                        last : Hangul.assemble([disWord[0],"ㅣ","ㅎ"])
                    })
                }
                if(disWord.length == 2){
                    if(!Hangul.isComplete(lastWord)) return;
                    targets.push({
                        fixed : word.slice(0, word.length-1), 
                        first : lastWord,
                        last : Hangul.assemble([disWord[0],disWord[1],"ㅎ"])
                    })
                }
                if(disWord.length == 3){
                    //닮 => ㄷ ㅏ ㄹ ㅁ
                    //왜 => ㅇ ㅗ ㅐ
                    targets.push({
                        fixed : word.slice(0, word.length-1),
                        first : lastWord,
                        last : Hangul.assemble([disWord[0],disWord[1],disWord[2],"ㅎ"])
                    })
                    
                    targets.push({
                        fixed : word.slice(0, word.length-1) + Hangul.assemble([disWord[0],disWord[1]]),
                        first : jamoMap[disWord[2]],
                        last : Hangul.assemble([disWord[2],"ㅣ", "ㅎ"])
                    })
                }
                // console.log(targets)
                for(var j = 0; j < targets.length; ++j){
                    console.log(targets[j].first)
                    for(var i = targets[j].first.charCodeAt(0); i <= targets[j].last.charCodeAt(0); ++i){
                        texts.push(targets[j].fixed + String.fromCharCode(i))
                    }
                }
                return texts
                // word = `'${texts.join(" OR ")}' IN BOOLEAN MODE`            
            } else {
                return [word]
            }
        } else {
            return [word]
        }
    }
}