
const Elevator = ({elevator, eleNum, floors}) => {
      return <span className="elevator" style={{"bottom": elevator.currentFloor/floors.length*100+"%" }} id={'ele-'+eleNum} >
                <img src="elevator.svg" className={elevator.status.toLowerCase()} alt=""/>
              </span>
  }


  export default Elevator;
  