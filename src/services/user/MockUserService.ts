import { Injectable } from '../../decorators/injectable';
import { UserService } from './UserService';

@Injectable
export class MockUserService extends UserService {

    getUser(): { id: string; username: string; } {
        return {
            id: this._generateId(),
            username: 'ligerx069'
        };
    }
    
}