import Building from "./building";
import { useState, useEffect } from "react";
import { ElevatorStatus } from "../enums/elevator-status.enum";
import useSound from "use-sound";
import timeout from "../utilities/timeout";
import findNext from "../utilities/findNext";
import findClosest from "../utilities/closestElevator";
import elevatorSound from '../sounds/elevator-bell.mp3';
import HeroForm from "./hero-form";

const Dashboard = () => {
    const [callQueue, changeCallQueue] = useState([]);
    const [defaultElevators, changeDefaultElevators] = useState(3);
    const [defaultFloors,changeDefaultFloors] = useState(10);
    const [elevators, changeElevators] = useState([]);
    const [floors, changeFloors] = useState([]);
    const [playSound] = useSound(elevatorSound)

    useEffect(()=> {
        setElevators();
    },[])


    const handleElevatorCall = (index) => {
        let localFloors = [...floors]
        localFloors[index].call = true;
        localFloors[index].timeCalled = new Date().getTime();
        changeFloors(localFloors);
    }

    const setElevators = (e) => {
        if(e) e.preventDefault();
        let initElevators = [];
        for(let e = 0; e < defaultElevators; e++) {
            initElevators.push(
                {
                    currentFloor: 0,
                    status: ElevatorStatus[0],
                }
            )
        }
        let initFloors = [];
        for(let f = 0; f < defaultFloors; f++) {
            initFloors.push(
                {
                    call: false,
                }
            )
        }
        changeElevators(initElevators);
        changeFloors(initFloors);
    }

    useEffect(() => {
        let localQueue = [];
        let filteredFloors = floors.filter(floor => floor.call).sort((a,b) => a.timeCalled - b.timeCalled);
        for(var i = 0; i < filteredFloors.length; i++){
            localQueue.push(floors.indexOf(filteredFloors[i]))
        }
        
        changeCallQueue(localQueue)
    }, [floors])

    useEffect(() => {
        let localElevators = [...elevators];
        let nextInCall = findNext(callQueue, localElevators)
        let availableElevator = localElevators.indexOf(findClosest(localElevators,nextInCall, changeElevators));
        if(availableElevator >= 0 ){
            localElevators[availableElevator].currentFloor = nextInCall;
            localElevators[availableElevator].status = ElevatorStatus[1];
            changeElevators(localElevators);
        }
    },[callQueue])

    useEffect(()=> {
        let localElevators = [...elevators];
        for(let i = 0; i < localElevators.length; i++){
            if(localElevators[i].status === ElevatorStatus[1]){
                const ele = document.getElementById('ele-'+i);
                Promise.all(ele.getAnimations().map((animation) => animation.finished)).then(
                     async() => {
                                localElevators[i].status = ElevatorStatus[2];
                                changeElevators(localElevators);
                                playSound()
                                await timeout(2000);
                                localElevators[i].status = ElevatorStatus[0];
                                let localFloors = [...floors];
                                localFloors[localElevators[i].currentFloor].call = false;
                                delete localFloors[localElevators[i].currentFloor].timeCalled;
                                changeElevators(localElevators);
                                changeFloors(localFloors)
                        }   
                );
            }
        }
        
    },[elevators])

    const elevatorChange = (event) =>  {
        changeDefaultElevators(event.currentTarget.value) 
    }

    const floorsChange = (event) =>  {
        changeDefaultFloors(event.currentTarget.value) 
    }

    return  <div className="elevators-exercise">
                <HeroForm defaultElevators={defaultElevators}
                          defaultFloors={defaultFloors}
                          elevatorChange={elevatorChange}
                          floorsChange={floorsChange}
                          onSubmit={setElevators}/>
                <Building 
                          floors={floors}
                          elevators={elevators}
                          queue={callQueue}
                          onCall={handleElevatorCall}
                />
             </div>
           
}

export default Dashboard;