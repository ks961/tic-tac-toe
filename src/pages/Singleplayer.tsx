import { Board } from "@/components/Board/Board";



export default function Singleplayer() {

    // const [ currentBoardSize, setCurrentBoardSize ] = usePersistentState<number>("boardSize", boardSize);
    
    // function handleOnBoardSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
    //   const { value } = event.target;
    //   const size = parseInt(value);
      
    //   if(isNaN(size) || size <= 1 || size > 9) return;
    //   setCurrentBoardSize(size);
    // }

    return(
        <div style={{width: "100%", height: "100%", display: "grid", placeContent: "center"}}>
            {/* <input 
                style={{padding: "4px 8px", width: "5rem", position: "fixed", top: "10px", left: "10px"}} 
                type="number" 
                name="boardSize" 
                id="boardSize"
                value={currentBoardSize} 
                onChange={handleOnBoardSizeChange}
                step={1}
            /> */}
            <Board />
        </div>
    );
}