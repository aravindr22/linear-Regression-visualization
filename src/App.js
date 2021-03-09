import React, {useState} from 'react';
import classes from './App.module.css';
import {transpose, inv, round} from 'mathjs';

import Input from './components/input/Input';
import Checkbox from './components/input/Checkbox';
import Scatterchart from './components/chart/scatterchart';
import LineChart from './components/chart/lineChart';
import ChartInput from './components/input/chartInput/ChartInput';
import Backdrop from './components/Backdrop/Backdrop';
import Modal from './components/modal/Modal';

function App() {

  const [updated, setupdated] = useState(false);
  const [csvdata, setcsvdata] = useState([[]]);
  const [checkedLC, setcheckedLC] = useState(false);
  const [checkedSC, setcheckedSC] = useState(false);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [fx, setfx] = useState([]);
  const [xfx, setxfx] = useState([]);
  const [matrixA, setMatrixA] = useState([]);
  const [addVal, setAddVal] = useState();
  const [added, setAdded] = useState(false);
  const [show, setShow] = useState(false);
  const [modalShow, setmodalShow] = useState(false);
  const [addedfxtoBack, setaddedfxtoBack] = useState(false);

  if(added){
    console.log(xfx);
    setShow(true);
    setmodalShow(true);
    setxfx(() => [...xfx, +addVal])
    setX(() => x.filter(a => a !== +addVal))
    console.log(xfx);
    setAdded(false);
  }

  if(updated){
    let sx = [];
    let sy = [];
    for(let i=0;i<csvdata.length-1;i++){
      sx.push(+csvdata[i][0])
      sy.push(+csvdata[i][1])
    }
    setX(() => sx);
    setY(() => sy);
    setxfx(() => sx);
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
    for(let i of xfx){
      val = matrixA[0] + (matrixA[1]*i)
      calfx.push(val)
    }
    let r = calfx.map(x => Number(x.toFixed(2)))
    setfx(() => [...r]);
    setShow(true);
    setmodalShow(true);
    setaddedfxtoBack(true);
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

  function close(){
    setShow(false);
    setmodalShow(false);
    setaddedfxtoBack(false);
  }

  console.log(x,y,"->",xfx)
  console.log(matrixA, fx)
  console.log(addVal, added)
  return (
    <div className={classes.App}>
      <Backdrop show={show} clicked={close}/>
      {/* logical must be done */}
      <Modal show={modalShow}>
        <p>The f(x) Equation is:   f(x) = {matrixA[0]} + {matrixA[1]}x</p>
        {addedfxtoBack?
          <div>
            <br />
            <p>The f(x) for {addVal} : {fx[fx.length-1]}</p>
            <p>The value now update to Scatter Chart</p>
          </div>
          : 
          <div>
            The Data is added next click calculate f(x)
          </div>  
        }
      </Modal>
      <div className='mx-auto border-2'>
        <Input 
          setcsvdata={setcsvdata} 
          setupdated={setupdated} 
          />
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
        {checkedLC ? <LineChart x={x} y={y} xfx={xfx} fx={fx}/> : null}
        {checkedSC ? <Scatterchart x={x} y={y} xfx={xfx} fx={fx}/> : null }
        {checkedLC || checkedSC ? CalButton : null}
        {checkedLC || checkedSC ? <ChartInput setAddVal={setAddVal} setAdded={setAdded} /> : null}
      </div>
    </div>
  );
}

export default App;
