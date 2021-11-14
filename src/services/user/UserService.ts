
export abstract class UserService {

    abstract getUser(): { id: string, username: string };

    protected _generateId(length = 10): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += ~~(Math.random() * 10);
        }
        return result;
    }

}
