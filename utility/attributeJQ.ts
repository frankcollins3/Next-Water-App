import $ from 'jquery'
export default async function attributeJQ (obj:any, attr:string, value:string ) { $(obj).attr(attr, value) }