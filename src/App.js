import React, {useState, useEffect} from 'react';
import classes from './App.module.css';

import Input from './components/input/Input';
import Checkbox from './components/input/Checkbox';
import Scatterchart from './components/chart/scatterchart';
import LineChart from './components/chart/lineChart';

function App() {

  const [updated, setupdated] = useState(false);
  const [csvdata, setcsvdata] = useState([[]]);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [checkedLC, setcheckedLC] = useState(false);
  const [checkedSC, setcheckedSC] = useState(false);

  if(updated){
    console.log(csvdata)
    let sx = [];
    let sy = [];
    for(let i=0;i<csvdata.length-1;i++){
      sx.push(+csvdata[i][0])
      sy.push(+csvdata[i][1])
    }
    setX(() => sx);
    setY(() => sy);
    setupdated(false)
  }

  return (
    <div className={classes.App}>
      <div className='mx-auto border-2'>
        <Input setcsvdata={setcsvdata} setupdated={setupdated} />
      </div>
      
      <div className={classes.check}>
        <Checkbox 
          className={classes.box} 
          value="Line Chart" 
          checked={checkedLC}
          onChange={() => setcheckedLC(!checkedLC)}
          />
        <Checkbox 
          className={classes.box} 
          value="Scatter Chart"
          checked={checkedSC}
          onChange={() => setcheckedSC(!checkedSC)}
          />
      </div>

      <div className={classes.chartSize}>
        {checkedLC ? <LineChart x={x} y={y}/> : null}
        {checkedSC ? <Scatterchart x={x} y={y}/> : null }
      </div>
    </div>
  );
}

export default App;
