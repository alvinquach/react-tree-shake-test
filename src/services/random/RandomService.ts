import { Injectable } from '../../decorators/injectable';

@Injectable
export class RandomService {
    
    private _currentNumber = this.generateRandomNumber();

    get currentNumber(): number {
        return this._currentNumber;
    }

    generateNewNumber(): number {
        return this._currentNumber = this.generateRandomNumber();
    }

    generateRandomNumber() {
        return ~~(Math.random() * 1e5);
    }

}
