const HeroForm = ({defaultElevators, defaultFloors, elevatorChange, floorsChange, onSubmit}) => {
    
    return <div className="elevator-hero">
                <h1>Elevator Exercise</h1>
                <form>
                    <div>
                        <label htmlFor="elevators">Number Of Elevators:</label>
                        <input type="number" id="elevators" value={defaultElevators} onChange={(e) => elevatorChange(e)}/>
                    </div>
                    <div>
                        <label htmlFor="elevators">Number Of Floors:</label>
                        <input type="number" id="floors" value={defaultFloors} onChange={(e) => floorsChange(e)}/>
                    </div>
                    <div><button onClick={(e) => onSubmit(e)} >Start!</button></div>
                </form>
            </div>
}

export default HeroForm;