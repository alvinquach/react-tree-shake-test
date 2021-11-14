import { UserService } from './UserService';

export class WebUserService extends UserService {

    getUser(): { id: string; username: string; } {
        return {
            id: this._generateId(),
            username: 'aquach'
        };
    }
    
}