import $ from 'jquery'
export default async function attirubteJQ (obj:any, attr:string, value:string ) { $(obj).attr(attr, value) }