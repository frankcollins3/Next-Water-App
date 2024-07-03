import $ from 'jquery'

export default function lazyJQanimate(elemObj:any, elemId:string, confirmOrReject:string) {
    if (!elemObj) return
    if (elemId === 'link-google') {
        $(elemObj)
        .animate({
          opacity: 0.8
      }, 1000)
      .animate({
          opacity: 0.5                                
      }, 500)
      .animate({
          opacity: 0.2                                                                
        }, 500)
        .promise()
        .done(function() {
          // Detach the element after the last animation completes
          $(elemObj).detach();
        })                       
    }

    if (elemId === 'googleconfirmation') {
        $(elemObj)
        .animate({
        opacity: 0.5
        }, 1000)
        .animate({
        opacity: 0.2                                
        }, 500)
        .animate({
        opacity: 0.2                                                                
        }, 500)
        .promise()
        .promise()
        .done(async () => {
        await $('#googlereject').detach();
        if (confirmOrReject === 'signp') {
            await $('*').fadeOut()
            await $('*').css('opacity', '0.3')
            $(elemObj).detach();
            window.location.href = '/'
        }        
        })   
        // .done(function() {
        // })       
    }

    if (elemId === 'googlereject') {
        $(elemObj)
        .animate({
        opacity: 0.5
        }, 1000)
        .animate({
        opacity: 0.2                                
        }, 500)
        .animate({
        opacity: 0.2                                                                
        }, 500)
        .promise()
        .done(async () => {
        await $('#googlereject').detach();
        if (confirmOrReject === 'signup') {
            await $('*').fadeOut()
            await $('*').fadeIn()
            await $('*').css('opacity', '0.3')
            window.location.href = '/'
        }
        })   
    }
}

// bookmarking dream vacation of making this function with parameters:

// elemObj
// integer: how many times an animate function is created. done so by loop
// animate property(s)
// this reusability would specify the abritrage/number gap between opacity or other obj.    if it were 0.2 then it goes from 1.0 to 0.8 and so on according to the specified number.

