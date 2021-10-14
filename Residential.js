let elevatorID = 1;
let floorRequestButtonID = 1;
let callButtonID = 1;

class Column{
    constructor(_id, _status, _amountOfFloors, _amountOfElevators){
        this.ID = _id;
        this.status = _status;
        this.amountOfFloors = _amountOfFloors;
        this.amountOfElevators = _amountOfElevators;
        this.elevatorsList = [];
        this.callButtonsList = [];

        this.createElevators(_amountOfFloors, _amountOfElevators);
        this.createCallButtons(_amountOfFloors)
    }
} 
    
    

    //---------------------------------Methods--------------------------------------------
    createCallButtons(_amountOfFloors); {
        
        for (i = 0; i < _amountOfFloors; i++) {
            if (i < _amountOfFloors) {
                let callButton = new CallButton(callButtonID, "OFF", buttonFloor, "Up"); //id, status, floor, direction
                this.callButtonsList.push(callButton);
                callButtonID++;
            }

            if (i > 1) {
                this.callButton = new CallButton(callButtonID, "OFF", buttonFloor, "Down"); //id, status, floor, direction
                this.callButtonsList.push(callButton);
                callButtonID++;
            }
        }
    }

    createElevators(_amountOfFloors, _amountOfElevators); {
        for (i = 0; i < _amountOfFloors; i++) {
            let elevator = new Elevator(elevatorID, idle, _amountOfFloors, 1); //id, status, amountOfFloors, currentFloor
            this.elevatorsList.push(elevator);
            elevatorID++;
        }
    }

    //Simulate when a user press a button outside the elevator
    requestElevator (floor, direction); {
        let elevator = findElevator(floor, direction);
        elevator.floorRequestList.push(floor); 
        elevator.move();
        elevator.operateDoors();
        return elevator
    }

    //We use a score system depending on the current elevators state. Since the bestScore and the referenceGap are 
    //higher values than what could be possibly calculated, the first elevator will always become the default bestElevator, 
    //before being compared with to other elevators. if two elevators get the same score, the nearest one is prioritized.
    findElevator(requestedFloor, requestedDirection); {
        let bestElevator = null;
        let bestScore = 5;
        this. referenceGap = 10000000;
        let bestElevatorInformations = [];

        for (i = 0; i < elevatorsList.size; i++) {
            //The elevator is at my floor and going in the direction I want
            if (requestedFloor == elevator.currentFloor && elevator.status == "stopped" && requestedDirection == elevator.direction){
                bestElevatorInformations = this.checkifElevatorIsBetter (0, elevator, bestScore, referenceGap, bestElevator, requestedFloor)
            }
            //The elevator is lower than me, is coming up and I want to go up
            else if (requestedFloor > elevator.currentFloor && elevator.direction == "up" && requestedDirection == elevator.direction){
                bestElevatorInformations = this.checkifElevatorIsBetter (1, elevator, bestScore, referenceGap, bestElevator, requestedFloor)
            }
            //The elevator is higher than me, is coming down and I want to go down
            else if (requestedFloor < elevator.currentFloor && elevator.direction == "down" && requestedDirection == elevator.direction) {
                bestElevatorInformations = this.checkifElevatorIsBetter (2, elevator, bestScore, referenceGap, bestElevator, requestedFloor)
            }
            //The elevator is idle
            else if (elevator.status == "idle") { 
                bestElevatorInformations = this.checkifElevatorIsBetter (3, elevator, bestScore, referenceGap, bestElevator, requestedFloor)
            }
            //The elevator is not available, but still could take the call if nothing better is found
            else {
                bestElevatorInformations = this.checkifElevatorIsBetter (4, elevator, bestScore, referenceGap, bestElevator, requestedFloor)
            }
            bestElevator = bestElevatorInformations[0];
            bestScore = bestElevatorInformations[1]; 
            referenceGap = bestElevatorInformations[2];
        }
        return bestElevator
    }

    checkifElevatorIsBetter(scoreToCheck, newElevator, bestScore, referenceGap, bestElevator, floor); {
        if (scoreToCheck < bestScore){
            bestScore = scoreToCheck;
            bestElevator = newElevator;
            referenceGap = Math.abs(this.currentFloor - floor);
        }
        else if(bestScore == scoreToCheck){
            let gap = Math.abs(this.currentFloor - floor);
            if (referenceGap > gap){
                bestElevator = newElevator;
                referenceGap = gap;
            }
        }
        return bestElevatorInformations[bestElevator, bestScore, referenceGap]
    }


class Elevator{
    constructor(_id, _status, _amountOfFloors, _currentFloor){
        this.ID = _id;
        this.status = _status;
        this.amountOfFloors = _amountOfFloors;
        this.currentFloor = _currentFloor;
        this.direction = null;
        let.door = new Door (_id, "closed");
        this.floorRequestsButtonsList = [];
        this.floorRequestList = [];
        createFloorRequestButtons(_amountOfFloors);
    }
    

    createFloorRequestButtons(_amountOfFloors){
        for (i = 0; i < _amountOfFloors; i++)
            this.floorRequestButton = new FloorRequestButton(floorRequestButtonID, "OFF", buttonFloor);//id, status, floor
            floorButtonsList.push(floorRequestButton);
            floorRequestButtonID = floorRequestButtonID + 1;
        }
    }

    //Simulate when a user press a button inside the elevator
    requestFloor(floor);{
        requestList.push(floor);
        move();
        operateDoors();
    }

    move(); {
        while(requestList != empty) {
            let destination = requestList[0];
            this.status = "moving";
            if (this.currentFloor < destination){
                direction = "up";
                sortFloorList();
                while (this.currentFloor < destination){
                    currentFloor = currentFloor + 1;
                    screenDisplay = currentFloor;
                }
            } else if (this.currentFloor > destination) {
                direction = "down";
                sortFloorList();
                while (this.currentFloor > destination){
                    currentFloor--;
                    screenDisplay = currentFloor;
                }
            }
            status = "stopped"
            requestList.pop(0);
        }
        this.status = "idle"
    }

    sortFloorList();{
        if (this.direction = "up"){
            sort(requestList);
        }else{ 
            reverse(requestList);
        }
    }

    operateDoors();{
        door.status = "opened";
        setTimeout(5);
        if (THIS IS NOT overweight){
            door.status = "closing";
            if (no obstruction){
                door.status = "closed";
            }else{
                operateDoors();
            }      
        }else{
            WHILE THIS IS overweight
                Activate overweight alarm
            ENDWHILE
            operateDoors();
        }
    }

} //Elevator

/*DEFINE CallButton USING _id, _status, _floor, _direction
    this. ID TO _id
    this. status TO _status
    this. floor TO _floor
    this. direction TO _direction
ENDDEFINE*/

/*DEFINE FloorRequestButton USING _id, _status, _floor
    this. ID TO _id
    this. status TO _status
    this. floor TO _floor
ENDDEFINE*/

/*DEFINE Door USING _id, _status
    this. ID TO _id
    this. status TO _status
ENDDEFINE*/


//==================================Scenario 1=================================================
scenario1 = () =>{
    let column = new Column(1, "online", 10, 2) //id, status, amountOfFloors, amountOfElevators
    column.elevatorsList[0].currentFloor = 10
    column.elevatorsList[1].currentFloor = 6
    let elevator = column.requestElevator(3, "Up")
    elevator.requestFloor(7)
}
//==================================End Scenario 1=============================================


//==================================Scenario 2=================================================
scenario2 = () =>{
    let column = new Column(1, "online", 10, 2) //id, status, amountOfFloors, amountOfElevators
    column.elevatorsList[0].currentFloor = 10
    column.elevatorsList[1].currentFloor = 3
    console.log("")
    //Part 1
    let elevator = column.requestElevator(1, "Up")
    elevator.requestFloor(6)
    //Part 2
    let elevator = column.requestElevator(3, "Up")
    elevator.requestFloor(5)
    //Part 3
    let elevator = column.requestElevator(9, "Down")
    elevator.requestFloor(2)
}
//==================================End Scenario 2=============================================

//==================================Scenario 3=================================================
scenario3 = () =>{
    let column = new Column(1, "online", 10, 2) //id, status, amountOfFloors, amountOfElevators
    column.elevatorsList[0].currentFloor = 10
    column.elevatorsList[1].currentFloor = 3
    column.elevatorsList[1].floorRequestList.push(6)
    //Part 1
    let elevator = column.requestElevator(3, "Down")
    elevator.requestFloor(2)
    //Part 2
    let elevator = column.requestElevator(10, "Down")
    elevator.requestFloor(3)
}
//==================================End Scenario 3===========================================