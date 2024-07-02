import { useState } from 'react'
import { Board } from './components/Board/Board.tsx';
import { boardSize } from './config.ts';

function App() {

  const [ currentBoardSize, setCurrentBoardSize ] = useState<number>(boardSize);

  function handleOnBoardSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const size = parseInt(value);
    
    if(isNaN(size) || size <= 1 || size > 10) return;
    setCurrentBoardSize(size);
  }

  return(
    <div style={{width: "100%", height: "100%", display: "grid", placeContent: "center"}}>
      <input 
        style={{padding: "4px 8px", width: "5rem", position: "fixed", top: "10px", left: "10px"}} 
        type="number" 
        name="boardSize" 
        id="boardSize"
        value={currentBoardSize} 
        onChange={handleOnBoardSizeChange}
        step={1}
      />
      <Board currentBoardSize={currentBoardSize} />
    </div>
  )
}

export default App;
