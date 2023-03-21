import Lift from "./Lift";
import ElevatorButton from './elevator-button';
import convertToOrdinal from "../utilities/ordinalNumbers";

const Building = ({floors, elevators, onCall, queue}) => {
    return <div className="building">
                <div className="floor-number">
                    {floors.map( (floor, index) => 
                    <div key={index} className="floor-name">{convertToOrdinal(index)}</div>)}
                </div>
                <div className="elevators">
                    {elevators.map((elevator,index) => 
                    <Lift key={index}
                          floors={floors}
                          elevator={elevator} 
                          queue={queue}
                          eleNum={index}/>)}
                </div>
                <div className="elevator-buttons">
                    {floors.map( (floor, index) =>                    
                    <ElevatorButton key={index}
                                    onCall={onCall}
                                    eleIndex={index}
                                    floor={floor} 
                                    elevator={elevators.filter(elevator => elevator.currentFloor === index)[0]} />
                    )}
                </div>
                
            </div> 
}

export default Building;