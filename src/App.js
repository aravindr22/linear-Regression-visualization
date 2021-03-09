import React, {useState} from 'react';
import classes from './App.module.css';
import {transpose, inv, round} from 'mathjs';

import Input from './components/input/Input';
import Checkbox from './components/input/Checkbox';
import Scatterchart from './components/chart/scatterchart';
import LineChart from './components/chart/lineChart';
import ChartInput from './components/input/chartInput/chartInput';

function App() {

  const [updated, setupdated] = useState(false);
  const [csvdata, setcsvdata] = useState([[]]);
  const [checkedLC, setcheckedLC] = useState(false);
  const [checkedSC, setcheckedSC] = useState(false);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [fx, setfx] = useState([]);
  const [matrixA, setMatrixA] = useState([]);
  const [addVal, setAddVal] = useState(0);

  if(updated){
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

  function multiply(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length, bNumCols = b[0].length,
      m = new Array(aNumRows);  // initialize array of rows
      for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols); // initialize the current row
        for (var c = 0; c < bNumCols; ++c) {
          m[r][c] = 0;             // initialize the current cell
          for (var i = 0; i < aNumCols; ++i) {
            m[r][c] += a[r][i] * b[i][c];
          }
        }
      }
    return m;
  }

  function calculateMatrixA(){
    let modifiedX = [], modifiedY = [], modifiedXX = [];
    for(let i of y){
      modifiedY.push([i])
    }
    for(let i of x){
        modifiedXX.push([1,i])
        modifiedX.push([i])
    }
    let transposedXX = transpose(modifiedXX);
    let mul = multiply(transposedXX, modifiedXX);
    let mulinv = inv(mul)
    let secondMultiply = multiply(transposedXX, modifiedY);
    let final = round(multiply(mulinv, secondMultiply),1);
    setMatrixA([final[0][0], final[1][0]]);
    calculateFx();
  }

  function calculateFx(){
    let val,calfx = [];
    for(let i of x){
      val = matrixA[0] + (matrixA[1]*i)
      calfx.push(val)
    }
    let r = calfx.map(x => Number(x.toFixed(2)))
    setfx(() => [...r]);
  }

  let CalButton = (
    <div className={classes.CalButton}>
      <button 
        className={classes.button} 
        type="button"
        onClick={() => calculateMatrixA()}>
        Click to Calculate f(x)
      </button>
    </div>
  );

  console.log(x,y)
  console.log(matrixA, fx)
  return (
    <div className={classes.App}>
      <div className='mx-auto border-2'>
        <Input 
          setcsvdata={setcsvdata} 
          setupdated={setupdated} 
          setAddVal={setAddVal}/>
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
        {checkedLC ? <LineChart x={x} y={y} fx={fx}/> : null}
        {checkedSC ? <Scatterchart x={x} y={y} fx={fx}/> : null }
        {checkedLC || checkedSC ? CalButton : null}
        {checkedLC || checkedSC ? <ChartInput /> : null}
      </div>
    </div>
  );
}

export default App;
