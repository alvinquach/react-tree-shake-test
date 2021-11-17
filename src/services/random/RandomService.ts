export class RandomService {
    
    private static readonly _Magnitude = 1e5;

    private _currentNumber = this._generateRandomNumber();

    get currentNumber(): number {
        return this._currentNumber;
    }

    generateNewNumber(): number {
        return this._currentNumber = this._generateRandomNumber();
    }

    private _generateRandomNumber() {
        return ~~(Math.random() * RandomService._Magnitude);
    }

}
