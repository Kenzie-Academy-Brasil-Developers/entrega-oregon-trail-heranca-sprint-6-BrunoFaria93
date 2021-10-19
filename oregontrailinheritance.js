class Traveler{
    constructor(name){
        this._name = name,
        this._foodQtd = 1
        this._isHealthy = true
    }
    get name(){
        return this._name
    }
    set name(name){
        this._name = name
    }
    get foodQtd(){
        return this._foodQtd
    }
    set foodQtd(foodQtd){
        this._foodQtd = foodQtd
    }
    get isHealthy(){
        return this._isHealthy
    }
    set isHealthy(isHealthy){
        this._isHealthy = isHealthy
    }


    hunt(){
        this.foodQtd += 2
    }
    eat(){
        if(this.foodQtd > 0){
            this.foodQtd -= 1
            this.isHealthy = true
        }else{
            this.isHealthy = false
        }
    }
}

class Hunter extends Traveler{
    constructor(name, isHealthy){
        super(name, isHealthy)
        this._foodQtd = 2
    }

    get name(){
        return this._name
    }
    set name(name){
        this._name = name
    }
    get foodQtd(){
        return this._foodQtd
    }
    set foodQtd(foodQtd){
        this._foodQtd = foodQtd
    }
    get isHealthy(){
        return this._isHealthy
    }
    set isHealthy(isHealthy){
        this._isHealthy = isHealthy
    }


    hunt(){
        this.foodQtd += 5
    }
    eat(){
        if(this.foodQtd > 1){
            this.foodQtd -= 2
            this.isHealthy = true
        }else if(this.foodQtd === 1){
            this.foodQtd -= 1
            this.isHealthy = false
        }else{
            this.isHealthy = false
        }
    }
    giveFood(traveler, foodQtd){
        if(this.foodQtd < foodQtd){
            return console.log(`Erro! pedido: ${foodQtd}, e eu tenho: ${this.foodQtd}`)
        }else{
            this.foodQtd -= foodQtd
            traveler.foodQtd += foodQtd
        }
    }
}

class Doctor extends Traveler{
    constructor(name, isHealthy){
        super(name, isHealthy)
        this._foodQtd = 1
    }

    get name(){
        return this._name
    }
    set name(name){
        this._name = name
    }
    get foodQtd(){
        return this._foodQtd
    }
    set foodQtd(foodQtd){
        this._foodQtd = foodQtd
    }
    get isHealthy(){
        return this._isHealthy
    }
    set isHealthy(isHealthy){
        this._isHealthy = isHealthy
    }
    
    heal(traveler){
        traveler.isHealthy = true
    }
}

class Wagon{
    constructor(capacity){
        this._capacity = capacity
        this._passengers = []
    }
    get capacity(){
        return this._capacity
    }
    set capacity(capacity){
        this._capacity = capacity
    }
    get passengers(){
        return this._passengers
    }
    set capacity(passengers){
        this._passengers = passengers
    }
    getAvailableSeatCount(){
        if(this.passengers.length >= this.capacity){
            return this.passengers.length - this.capacity
        }else{
            return this.capacity - this.passengers.length 
        }      
    }
    join(newPassenger){
        if(this.passengers.length < this.capacity){
            this.passengers.push(newPassenger)
        }
    }
    shouldQuarantine(){
        for(let i = 0; i < this.passengers.length; i ++){
            if(this.passengers[i].isHealthy === false){
                return true
            }
        }
        return false
    }
    totalFood(){
        let totalFood = 0
        for(let i = 0; i < this.passengers.length; i ++){
            totalFood += this.passengers[i].foodQtd
        }
        return totalFood
    }
}
// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
 
wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
 
sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();
 
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
 
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)
 
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
 
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
 
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente
 
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
