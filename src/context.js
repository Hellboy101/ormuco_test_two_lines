import {
    createContext,
    useMemo,
    useCallback,
    useState
  } from "react";
  
  const initialState = {
    line1: {x1: null, x2: null},
    line2: {x1: null, x2: null},
  };
 
  export const Context = createContext();
  
  const Provider = ({ children }) => {
    const state = initialState;
    const [canCheck, setCanCheck] = useState(false);
    const [canShow, setCanShow] = useState(' no-show');
    const [overlapse, setOverlapse] = useState(null);

    const setXValue = useCallback((line, point, value) => {
        state[line][point] = parseInt(value);
        if (state.line1.x1 !== null && state.line1.x2 !== null && state.line2.x1 !== null && state.line2.x2 !== null) {
            setCanCheck(true);
        }
    }, [state]);

    // This is the part that manage 
    const checkOverlapse = useCallback(() => {
        const [line1Start, line1End] = state.line1.x1 < state.line1.x2 ? [state.line1.x1, state.line1.x2] : [state.line1.x2, state.line1.x1]
        const [line2Start, line2End] = state.line2.x1 < state.line2.x2 ? [state.line2.x1, state.line2.x2] : [state.line2.x2, state.line2.x1]
        if (line1End >= line2Start && line2End >= line1Start) {
            setOverlapse(true); 
        } else {
            setOverlapse(false); 
        }
        setCanShow('');
    }, [state]);
  

    const value = useMemo(() => {
      return {
        state,
        canCheck,
        canShow,
        overlapse,
        setXValue,
        checkOverlapse,
        checkEnable: setCanCheck,
      };
    }, [setXValue, checkOverlapse, state, canCheck, canShow, overlapse]);
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  
  export default Provider;