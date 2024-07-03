import $ from 'jquery'
import attributeJQ from './attributeJQ'

export default async function inputHandler (event:any, SET_STATE:any) {

    let value:string = event.target.value
        if (event.target.id === 'password') {
            let hashedValue:string = '*'.repeat(value.length)
            $(event.target).attr('value', hashedValue)
            SET_STATE(hashedValue)
        } else {
            $(event.target).attr('value', value)
            SET_STATE(value)
        }        
}