import CSS from './CSS'
import $ from 'jquery'

export default async function EVENT (object:any, event:string, loopExecutions:any) {    // loopExecutions has to be an array even if there's only one value
    if (loopExecutions.length === 1) {
        $(object).on(event, () => {
            loopExecutions.forEach( (action:any) => {
                CSS($(object), action.property, action.value)
            })
        })
    } else {
        return "error"
    }
}