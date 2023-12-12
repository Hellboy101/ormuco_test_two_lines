import { useRef, useContext, useEffect } from "react";
import { Context } from "./context";
import "./App.css";

function LinesInputs() {
  const { 
    checkOverlapse,
    state,
    checkEnable,
    canCheck,
    canShow,
    overlapse 
  } = useContext(Context);

  useEffect(() => {
    if (state.line1.x1 !== null && state.line1.x2 !== null && state.line2.x1 !== null && state.line2.x2 !== null) {
      checkEnable(true);
    }
  }, [state, checkEnable]);

  return (
    <>
      <div className="App-lines-container">
        <Line lineId={1}/><Line lineId={2} />
      </div>
      <br />
      <button onClick={checkOverlapse} disabled={!canCheck}>Check overlapse</button>
      <p className={'App-p' + canShow}>
        { overlapse ? 'Lines overlaspe' : 'Lines don\'t overlapse' }
      </p>
    </>
  );
}
function Line({ lineId }) {
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const { setXValue } = useContext(Context);
  return (
    <div className="App-line-input">
      <h3>Line {lineId}</h3>
      <input ref={inputRef1} type="number" onChange={e => setXValue(`line${lineId}`, "x1", e.target.value)}/>&nbsp;&nbsp;
      <input ref={inputRef2} type="number" onChange={e => setXValue(`line${lineId}`, "x2", e.target.value)}/>
    </div>
  );
}

function App() {

  return (
    <div className="App">
      <h1>Two Lines</h1>
      <header className="App-header">
        <LinesInputs />
      </header>
    </div>
  );
}

export default App;
