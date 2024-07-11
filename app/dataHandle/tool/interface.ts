export interface IDataItem {
  code: string;
  name: string;
  spec: string;
  brand: string;
  children?: IDataItem[];
  flag?: 'same' | 'conflict';
}
