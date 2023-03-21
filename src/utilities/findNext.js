const findNextCall = (queue, eles) => {
    let nextCall;
    for(var i = 0; i < queue.length; i++) {
        if(nextCall==null && eles.filter(ele => ele.currentFloor === queue[i]).length === 0) {
            nextCall = queue[i];
        }
    }
    return nextCall;
}

export default findNextCall;