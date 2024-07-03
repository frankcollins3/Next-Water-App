export default function RegexBank () {    
    const regexobject = {
        stringAfterPeriod: /^.*\.(.*)$/,
        returnLettersAthruZ: /[a\-z]/g,
        returnNumbers: /[0\-9]/g,

        hasCaps: /[A-Z]/g,
        hasNums: /[A-Z]/g,
        noWhiteSpace: /\s/g,
        splitAtDot: /@([^.]*)\./        
    }
    return regexobject    
}
