import * as XLSX from 'xlsx';
import { IObjectAny } from './interface';

class XlsxTool {
  sheetName: string;
  options: IObjectAny;
  constructor(options: IObjectAny) {
    const { sheetName, ...rest } = options;
    this.sheetName = sheetName;
    this.options = rest;
  }

  importExcel(file: Blob, callback?: Function) {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        const xlsxData = XLSX.read(result, { type: 'binary' });
        const sheetData = xlsxData.Sheets[this.sheetName];
        const colDatas = XLSX.utils.sheet_to_json(sheetData, this.options);
        callback?.(colDatas);
      } catch (error) {}
    };
  }
}

export default XlsxTool;
