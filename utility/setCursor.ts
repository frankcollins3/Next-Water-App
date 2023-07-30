import $ from 'jquery'
import CSS from './CSS'
export default async function setCursor (elem:any) {
    if (typeof window !== 'undefined') {
        let eventassertions = [ {property: 'cursor', value: `normal`}]
        CSS($(elem), 'cursor', `url('/water_img/mouse_droplet.png'), auto`)           
          $('*').on('mouseenter', (event:any) => { CSS($('*'), 'cursor', 'normal') })
        //   $('*').on('mouseenter', (event:any) => { CSS($(event.target), 'cursor', 'normal') })
      }
    }
