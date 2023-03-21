import { ElevatorStatus } from "../enums/elevator-status.enum";

const  findClosest = (arr, floor) => {
    let closest = null;
    let diff = Infinity;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].status === ElevatorStatus[0] ) {
        let currentDiff = Math.abs(floor - arr[i].currentFloor);
        if (currentDiff < diff) {
          diff = currentDiff;
          closest = arr[i];
        }
      }
    }
    return closest;
  }

  export default findClosest;