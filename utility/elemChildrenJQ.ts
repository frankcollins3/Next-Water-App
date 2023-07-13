import $ from 'jquery'

export default async function elemChildrenJQ (object:any, Nchildren:number|string) {
    let children = $(object).children()
    let childrenLength:number = children.length
    // if the type is string it must
    if (typeof Nchildren === 'string' && Nchildren.toLowerCase() === 'all') {
        console.log('children from utility function')
        console.log(children)
        return children
    } 
    else if (typeof Nchildren === 'number') {
        console.log('Nchildren from the else block')
        console.log(Nchildren)
        console.log('childrenLength')
        console.log(childrenLength)
        if (Nchildren < childrenLength) {
            return children[Nchildren] || Nchildren
        } else {
            return `The element is only Parent to: ${Nchildren} children elements`
        }
    }
}
