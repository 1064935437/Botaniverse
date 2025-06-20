// 定义 Account 接口
export interface Account {
  platform: string;
  username: string;
  password: string;
  email: string;
  notes?: string;
}

// 模拟数据库
const accountsDb: Account[] = [];

export default class EntryAbility {
  async searchAccountsByPlatform(username: string): Promise<Account[]> {
    // 模拟按用户名查找
    return accountsDb.filter(acc => acc.username === username);
  }

  async addAccount(account: Account): Promise<number> {
    accountsDb.push(account);
    // 返回插入后的索引作为 insertId
    return accountsDb.length;
  }
}