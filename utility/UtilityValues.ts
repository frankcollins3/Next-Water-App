import $ from 'jquery'
import CSS from './CSS'

export const AgeArray = [1,2,3,4,5,6,7,8,9,10]
export const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
export const intervalTimeouts = [1000,2000]
// export const intervalTimeouts = [1000,2000,3000,4000,5000]

export const nothingFunc = () => { return }

export const passwordTogglevalue = (state:any, setState:any) => { setState(!state) }

export const currentDayBorderOn = (elem:any) => {
        CSS($(elem), 'backgroundColor', '#bbeafe')
        CSS($(elem), 'borderTop', 'none')
        CSS($(elem), 'color', 'silver')                    
}

export const currentDayBorderOff = (elem:any) => {
        CSS($(elem), 'backgroundColor', '#dedede70')
        CSS($(elem), 'borderTop', '40px dotted #73defe')
        CSS($(elem), 'color', 'silver')              
}
