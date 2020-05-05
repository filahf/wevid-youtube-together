import React from 'react';
import './terminal.scss';
import { useSpring, animated } from 'react-spring';
function Terminal() {
  const props = useSpring({
    config: { duration: 1000 },
    from: {
      left: '0%',
      top: '0%',
      width: '0%',
      height: '0%',
      background: 'lightgreen',
    },
    to: async (next) => {
      while (1) {
        await next({
          left: '0%',
          top: '0%',
          width: '100%',
          height: '100%',
          background: 'lightblue',
        });
        await next({ background: 'lightgreen' });
        await next({
          background: 'lightgoldenrodyellow',
        });
        await next({ background: 'lightpink' });
        await next({ background: 'lightsalmon' });
        await next({ background: 'lightcoral' });
        await next({ background: 'lightseagreen' });
        await next({ background: 'lightskyblue' });
        await next({ background: 'lightslategrey' });
      }
    },
  });
  return (
    <div className='terminalWrap'>
      <div className='terminal-head'>
        <div className='min'></div>
        <div className='max'></div>
        <div className='close'></div>
      </div>
      <div className='card'>
        <div className='markdown'>
          <animated.div className='script-box' style={props} />
        </div>
      </div>
    </div>
  );
}

export default Terminal;
