import React from 'react'
export default function ReusableImage( imageObject: any ) { 
    const { src } = imageObject
    // const { src, size, unit, className, id, func, event } = imageObject
    
    const nothing = () => {return}

    return <img src={src}/>
    
    // export default function ReusableImage( src:string, size:number, unit:string, className:string|undefined, id:string|undefined, func:any, event:any ) { 
    // return <img src={src} className={className ? className : ""} id={ id ? id : ""} 
    // style={{ height: unit === 'relative' ? `${size}em` : `${size}px`, width: unit === 'relative' ? `${size}em` : `${size}px` }}
    // onClick={event === 'click' ? func : nothing} onDoubleClick={event.toLowerCase() === 'doubleclick' ? func : nothing}
    //  onMouseEnter={event.toLowerCase() === 'mouseenter' ? func : nothing} onMouseLeave={event.toLowerCase() === 'mouseleave' ? func : nothing} onMouseMove={event.toLowerCase() === 'mousemove' ? func : nothing} 
}