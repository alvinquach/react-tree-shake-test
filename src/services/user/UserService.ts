import { Inject } from '../../decorators/Inject';
import { RandomService } from '../random/RandomService';

export abstract class UserService {

    @Inject(RandomService)
    protected readonly _randomService!: RandomService;

    abstract getUser(): { id: string, username: string };

    protected _generateId(): string {
        return String(this._randomService.generateRandomNumber());
    }

}
