import Elevator from "./elevator";
import Floor from "./floor";

const Lift = ({floors, elevator, eleNum, queue}) => {
    return <div className="path">
                {floors.map((floor, index) => 
                <Floor  key={index} />)}
                <Elevator elevator={elevator} eleNum={eleNum} floors={floors}/>
            </div>
}

export default Lift