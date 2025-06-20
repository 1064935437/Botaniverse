import EntryAbility, { Account } from './EntryAbility';

// 注册返回类型
interface RegisterResult {
  success: boolean;
  message: string;
}

// 登录返回类型
interface LoginResult {
  success: boolean;
  message: string;
  user?: Account;
}

class AccountService {
  private entryAbility: EntryAbility;
  private currentUser: Account | null = null;

  constructor(entryAbility: EntryAbility) {
    this.entryAbility = entryAbility;
  }

  // 注册账号
  async registerAccount(account: Account): Promise<RegisterResult> {
    if (!account.username || !account.password) {
      return { success: false, message: '用户名和密码不能为空' } as RegisterResult;
    }

    const existingAccounts = await this.entryAbility.searchAccountsByPlatform(account.username);
    if (existingAccounts.length > 0) {
      return { success: false, message: '用户名已存在' } as RegisterResult;
    }

    const encryptedPassword = this.encryptPassword(account.password);
    // 明确类型，不要用 ...account 直接扩展
    const accountData: Account = {
      platform: account.username,
      username: account.username,
      password: encryptedPassword,
      email: account.email,
      notes: account.notes
    };

    const insertId = await this.entryAbility.addAccount(accountData);
    if (insertId > 0) {
      return { success: true, message: '注册成功' } as RegisterResult;
    } else {
      return { success: false, message: '注册失败，请重试' } as RegisterResult;
    }
  }

  // 登录验证
  async login(username: string, password: string): Promise<LoginResult> {
    const accounts = await this.entryAbility.searchAccountsByPlatform(username);
    if (accounts.length === 0) {
      return { success: false, message: '用户不存在' } as LoginResult;
    }

    const user = accounts[0];
    const encryptedPassword = this.encryptPassword(password);

    if (user.password === encryptedPassword) {
      this.saveSession(user);
      return { success: true, message: '登录成功', user } as LoginResult;
    } else {
      return { success: false, message: '密码错误' } as LoginResult;
    }
  }

  private encryptPassword(password: string): string {
    return password;
  }

  private saveSession(user: Account): void {
    console.log('保存用户会话:', user);
    this.currentUser = user;
  }

  isUserLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): Account | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }
}

export default new AccountService(new EntryAbility());