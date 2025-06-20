// 导入必要的模块
import relationalStore from '@ohos.data.relationalStore';
import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';
import { BusinessError } from '@ohos.base';

// 定义账号信息接口
interface AccountInfo {
  id?: number; // 可选，因为新增时不需要
  platform: string;
  username: string;
  password: string;
  email: string;
  notes?: string;
}

// 数据库常量
const DB_NAME = 'accountDB.db';
const TABLE_NAME = 'accounts';
const STORE_CONFIG: relationalStore.StoreConfig = { // 显式指定类型
  name: DB_NAME,
  securityLevel: relationalStore.SecurityLevel.S1
};

// 创建表的 SQL 语句
const SQL_CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

export default class EntryAbility extends UIAbility {
  private rdbStore: relationalStore.RdbStore | null = null;

  async onCreate() {
    try {
      // 创建或打开数据库
      this.rdbStore = await relationalStore.getRdbStore(this.context, STORE_CONFIG);

      // 创建账号信息表
      await this.rdbStore.executeSql(SQL_CREATE_TABLE);
      console.log('Database and table created successfully');
    } catch (err) {
      console.error(`Failed to create database: ${JSON.stringify(err)}`);
    }
  }

  // 添加账号信息
  async addAccount(account: AccountInfo): Promise<number> {
    if (!this.rdbStore) {
      console.error('Database not initialized');
      return -1;
    }

    const valueBucket: relationalStore.ValuesBucket = {
      'platform': account.platform,
      'username': account.username,
      'password': account.password,
      'email': account.email || '',
      'notes': account.notes || ''
    };

    try {
      const insertId = await this.rdbStore.insert(TABLE_NAME, valueBucket);
      console.log(`Account added with ID: ${insertId}`);
      return insertId;
    } catch (err) {
      console.error(`Failed to add account: ${JSON.stringify(err)}`);
      return -1;
    }
  }

  // 查询所有账号信息
  async getAllAccounts(): Promise<AccountInfo[]> {
    if (!this.rdbStore) {
      console.error('Database not initialized');
      return [];
    }

    const columns = ['id', 'platform', 'username', 'password', 'email', 'notes', 'created_at'];
    const predicates = new relationalStore.RdbPredicates(TABLE_NAME);

    try {
      const resultSet = await this.rdbStore.query(predicates, columns);
      const accounts: AccountInfo[] = [];

      while (resultSet.goToNextRow()) {
        accounts.push({
          id: resultSet.getLong(resultSet.getColumnIndex('id')),
          platform: resultSet.getString(resultSet.getColumnIndex('platform')),
          username: resultSet.getString(resultSet.getColumnIndex('username')),
          password: resultSet.getString(resultSet.getColumnIndex('password')),
          email: resultSet.getString(resultSet.getColumnIndex('email')),
          notes: resultSet.getString(resultSet.getColumnIndex('notes'))
        });
      }

      resultSet.close();
      return accounts;
    } catch (err) {
      console.error(`Failed to query accounts: ${JSON.stringify(err)}`);
      return [];
    }
  }

  // 更新账号信息
  async updateAccount(account: AccountInfo): Promise<boolean> {
    if (!this.rdbStore || !account.id) {
      console.error('Database not initialized or missing account ID');
      return false;
    }

    const valueBucket: relationalStore.ValuesBucket = {
      'platform': account.platform,
      'username': account.username,
      'password': account.password,
      'email': account.email || '',
      'notes': account.notes || ''
    };

    const predicates = new relationalStore.RdbPredicates(TABLE_NAME);
    predicates.equalTo('id', account.id);

    try {
      const rowsUpdated = await this.rdbStore.update(valueBucket, predicates);
      console.log(`Updated ${rowsUpdated} account(s)`);
      return rowsUpdated > 0;
    } catch (err) {
      console.error(`Failed to update account: ${JSON.stringify(err)}`);
      return false;
    }
  }

  // 删除账号信息
  async deleteAccount(id: number): Promise<boolean> {
    if (!this.rdbStore) {
      console.error('Database not initialized');
      return false;
    }

    const predicates = new relationalStore.RdbPredicates(TABLE_NAME);
    predicates.equalTo('id', id);

    try {
      const rowsDeleted = await this.rdbStore.delete(predicates);
      console.log(`Deleted ${rowsDeleted} account(s)`);
      return rowsDeleted > 0;
    } catch (err) {
      console.error(`Failed to delete account: ${JSON.stringify(err)}`);
      return false;
    }
  }

  // 根据平台名称搜索账号
  async searchAccountsByPlatform(platform: string): Promise<AccountInfo[]> {
    if (!this.rdbStore) {
      console.error('Database not initialized');
      return [];
    }

    const columns = ['id', 'platform', 'username', 'password', 'email', 'notes'];
    const predicates = new relationalStore.RdbPredicates(TABLE_NAME);
    predicates.contains('platform', platform);

    try {
      const resultSet = await this.rdbStore.query(predicates, columns);
      const accounts: AccountInfo[] = [];

      while (resultSet.goToNextRow()) {
        accounts.push({
          id: resultSet.getLong(resultSet.getColumnIndex('id')),
          platform: resultSet.getString(resultSet.getColumnIndex('platform')),
          username: resultSet.getString(resultSet.getColumnIndex('username')),
          password: resultSet.getString(resultSet.getColumnIndex('password')),
          email: resultSet.getString(resultSet.getColumnIndex('email')),
          notes: resultSet.getString(resultSet.getColumnIndex('notes'))
        });
      }

      resultSet.close();
      return accounts;
    } catch (err) {
      console.error(`Failed to search accounts: ${JSON.stringify(err)}`);
      return [];
    }
  }
}