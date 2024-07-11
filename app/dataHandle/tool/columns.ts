import { ColumnType } from 'antd/es/table';
import { IDataItem } from './interface';

const columns: ColumnType<IDataItem>[] = [
  { title: '编码', dataIndex: 'code' },
  { title: '名称', dataIndex: 'name' },
  { title: '规格', dataIndex: 'spec' },
  { title: '品牌', dataIndex: 'brand' },
  // { title: '旧名称', dataIndex: 'oldName' },
];

export default columns;
