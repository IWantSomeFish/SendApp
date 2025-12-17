import React from 'react';
import IconButtons from './components/naviButton';

export default function App() {
  return (

    <body style={{backgroundColor: '#3a6181ff', margin: 0, padding: 0}}>
      <div style={{ backgroundColor: '#83c5fcff', width: '100%', height: '10vh',margin:0, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}>
        <IconButtons style={{ padding: 16 }} iconSrc={'./renderer/components/resources/burger-bar.png'} />
      </div>
    </body>
  );
}
