import indexDB from './indexeddb';
import { IObjectAny } from './interface';
import XlsxTool from './xlsxTool';
export function useIndexDB() {
  return indexDB;
}

export function useXlsx(options: IObjectAny) {
  const xlsxTool = new XlsxTool(options);
  return xlsxTool;
}
