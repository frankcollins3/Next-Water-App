import attributeJQ from './attributeJQ'

export default async function ghostText (target:any, state:any|null|undefined) {
    
        let jqtarget:any = $(target)
        let targetId:string = target.id       
        if (targetId === 'password') {
            attributeJQ(target, 'value', state)
        } else {
            attributeJQ(target, 'value', targetId)         // $(event.target).attr('value', targetId)
        }
        // modular function arguments:                  1: target $(event.target)   2: 'value' <input value={}/>        3: targetId: ['username', 'password',] 
}
