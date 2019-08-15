import { NativeModules, Platform } from 'react-native';

const SQLite = NativeModules.NativeSQLite;

export class NativeSQLite {

  /**
   * 通过SQL语句操作数据库
   * @param db_name 数据库名字
   * @param com     SQL语句
   * @param callback
   */
  static insertCommand(db_name, com, callback) {
    SQLite.insertCommand(db_name, com, callback);
  }

  /**
   * 初始化一个SQL数据库
   * @param db_name  SQL名字 不需要带文件后缀
   * @param callback
   */
  static initSQLite(db_name, callback) {
    SQLite.initSQLite(db_name, callback);
  }


  /**
   * 在SQL数据库中添加表
   * @param db_name   SQL名字 不需要带文件后缀
   * @param table     表名字
   * @param callback
   */
  static createTable(db_name, table_name, table_column_name, callback) {
    SQLite.createTable(db_name, table_name, table_column_name, callback);
  }

  /**
   * 在SQL数据库中删除指定表
   * @param db_name   SQL名字 不需要带文件后缀
   * @param table     表名字
   * @param callback
   */
  static deleteTable(db_name, table, callback) {
    SQLite.deleteTable(db_name, table, callback);
  }

  /**
   * 添加数据到表中
   * @param db_name    SQL名字 不需要带文件后缀
   * @param table_name 表名字
   * @param map        添加的内容 {k,v}
   * @param callback
   */
  static insert(db_name, table_name, map, callback) {
    SQLite.insert(db_name, table_name, map, callback);
  }

  /**
   *
   * @param db_name     SQL名字 不需要带文件后缀
   * @param table_name  表名字
   * @param key         要删除的内容的key
   * @param value       要删除的key 满足的内容
   * @param callback
   *  NativeSQLite.delete('book', 'books', 'id', 1, (data) => {
   *        console.log(data);
   *     });
   */
  static delete(db_name, table_name, key, value, callback) {
    SQLite.delete(db_name, table_name, key, value.toString(), callback);
  }

  /**
   * 单词跟新一条数据
   * @param db_name
   * @param table_name
   * @param map    添加的内容 {k:v,k:v}
   * @param key    唯一key 一般为id
   * @param value  唯一key 的value
   * @param callback
   *
   *
   *  NativeSQLite.update('book', 'books', { remark: '更新的内容', name: '更新的内容' }, 'id', '5', (data) => {
   *   console.log(data);
   * });
   */
  static update(db_name, table_name, map, key, value, callback) {
    SQLite.update(db_name, table_name, map, key, value.toString(), callback);
  }

}
