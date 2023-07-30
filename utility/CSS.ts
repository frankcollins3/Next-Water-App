import $ from 'jquery';
export default async function CSS(selector:any, property:string, value:string) { $(selector).css(property, value) }