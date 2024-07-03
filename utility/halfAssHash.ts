export default function halfAssHash(char:string, string:string) {
    let stringLength:number = string.length
    let hashedValue = char.repeat(stringLength)
    return hashedValue
}