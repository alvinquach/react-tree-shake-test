import { UserService } from './UserService';

export class MockUserService extends UserService {

    getUser(): { id: string; username: string; } {
        return {
            id: this._generateId(),
            username: 'ligerx069'
        };
    }
    
}