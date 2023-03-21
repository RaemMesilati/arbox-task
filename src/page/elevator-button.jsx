import { ElevatorStatus } from "../enums/elevator-status.enum";
import { FloorStatus } from "../enums/floor-status.enum";

const ElevatorButton = ({onCall, eleIndex, floor, elevator}) => {

    const setButton = (floor, elevator) => {
        if(floor.call && elevator && elevator.status === ElevatorStatus[2]) return FloorStatus.arrived;
        if(floor.call) return  FloorStatus.waiting;
        return FloorStatus.call;
    }

    return <div className="elevator-button">
                <button onClick={() => onCall(eleIndex)} className={setButton(floor,elevator).toLocaleLowerCase()} disabled={elevator}>{setButton(floor,elevator)}</button>
            </div>
    
}

export default ElevatorButton