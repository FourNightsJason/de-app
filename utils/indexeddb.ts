class IndexDB {
  db: IDBDatabase | null;
  constructor() {
    this.db = null; // 初始化数据库
    typeof window !== 'undefined' && this.init();
  }

  init() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      // 判断数据库是否打开
      if (this.db) {
        resolve(this.db);
      } else {
        const request = indexedDB.open('DEDB');
        // 首次创建数据库
        request.onupgradeneeded = (e) => {
          const db = (e.target as IDBOpenDBRequest).result;
          //   todo
          db.createObjectStore('dataHandle', { keyPath: 'code' });
        };
        request.onsuccess = () => {
          this.db = request.result;
          resolve(request.result);
        };
        request.onerror = (error) => {
          reject(error);
        };
      }
    });
  }

  // 插入输入
  async setItem(name: string, obj: object) {
    const db = await this.init();
    return new Promise<IDBValidKey>((resolve, reject) => {
      const request = db
        .transaction([name], 'readwrite')
        .objectStore(name)
        .put(obj);
      request.onsuccess = (e) => {
        resolve(request.result);
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  // 存储多条数据
  async setAll(name: string, arr: object[]) {
    arr.forEach(async (item) => await this.setItem(name, item));
  }

  // 获取单条数据
  async getItem(name: string, key: string) {
    const db = await this.init();
    return new Promise<any>((resolve, reject) => {
      const request = db
        .transaction([name], 'readwrite')
        .objectStore(name)
        .get(key);

      request.onsuccess = (e) => {
        resolve(request.result);
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  // 获取全部数据
  async getAll(name: string) {
    const db = await this.init();
    return new Promise<any[]>((resolve, reject) => {
      let arr: any[] = [];
      const request = db
        .transaction([name], 'readwrite')
        .objectStore(name)
        .openCursor();
      request.onsuccess = (e) => {
        let cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          arr.push({ ...cursor.value, key: cursor.key });
          cursor.continue();
        } else {
          resolve(arr);
        }
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  async removeItem(name: string, key: string) {
    const db = await this.init();
    return new Promise<void>((resolve, reject) => {
      const request = db
        .transaction([name], 'readwrite')
        .objectStore(name)
        .delete(key);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  async clear(name: string) {
    const db = await this.init();
    return new Promise<void>((resolve, reject) => {
      const request = db
        .transaction([name], 'readwrite')
        .objectStore(name)
        .clear();
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }
}

const indexDB = new IndexDB();
export default indexDB;
