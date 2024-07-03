// this function makes every booped element dance

import React, { useState, useEffect } from 'react';

interface Props {
  rotateAngle: number,
  speed: number,
  children: JSX.Element,
  keepGoing: boolean
}

const Boooooop = ({ speed, rotateAngle, children, keepGoing }: Props) => {
  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let intervalId: NodeJS.Timeout | null = null;

    if (keepGoing) {

        const elements = document.getElementsByClassName('boop-child');
        

        intervalId = setInterval( () => {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i] as HTMLElement;
                element.style.transform = `rotate(${rotateAngle}deg)`;
            }
        }, 1000)

        intervalId = setInterval( () => {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i] as HTMLElement;
                element.style.transform = `rotate(-${rotateAngle}deg)`;
            }
        }, 1500)        
    } 
  });
//   }, [isRotated, rotateAngle, speed]);

//   useEffect(() => {
//     setIsRotated(keepGoing);
//   }, [keepGoing]);

  return (
    <div className="boop">
      {React.Children.map(children, (child, index) => {
        const styledChild = React.cloneElement(child, {
          className: 'boop-child',
          style: {
            transform: keepGoing ? `rotate(${rotateAngle}deg)` : '',
          },
        });

        return keepGoing ? styledChild : child              // keepGoing is boolean redux state. click flipflops to toggle this dance function. click again to toggle off. return child if toggled off.
      })}
    </div>
  );
};

export default Boooooop;

// child component is rendered from falsy ternary block because "boop-child" is styledChild. the original element is gone. * * * * YOU CAN SEE THIS IN googledevtools -> elements -> .Right-Cont -> <img/>
// className: 'boop-child',
// style: {
//   transform: keepGoing ? `rotate(${rotateAngle}deg)` : '',
// },
// });

{/* <Boop rotateAngle={15} speed={500}> */}
{/* <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>
<img onClick={test} style={{ border: FLIP_FLOP_ICON === true ? "5px solid brown" : "5px solid blue" }} src="/water_img/bottles.png" />
</Boooooop> */}
{/* </Boop> */}

// this is done because with this input: you can't access the CSS in inline-props because the cloned child is rendered. not the inline element child to <Boop> important because it's .detached() 
// if you get tangled up in the parent component logic, and as a noob it's easy, an escape-hatch, one might think, would be inline CSS. doesn't work.

{/* <img onClick={test} style={{ border: FLIP_FLOP_ICON === true ? "5px solid brown" : "5px solid blue" }} src="/water_img/bottles.png" /> */}