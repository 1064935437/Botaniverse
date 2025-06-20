export class UserStore {
    private static instance: UserStore;
    private _username: string = '';
    private constructor() { }
    static getInstance(): UserStore {
        if (!UserStore.instance) {
            UserStore.instance = new UserStore();
        }
        return UserStore.instance;
    }
    setUsername(username: string) {
        this._username = username;
    }
    getUsername(): string {
        return this._username;
    }
}
export default UserStore.getInstance();
