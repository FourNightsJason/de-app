import { MenuProps } from 'antd';

export type TLabels = '物料编码' | '物料名称' | '规格型号' | '品牌';
export type TKeys = 'code' | 'name' | 'spec' | 'brand';

export const label2Key = {
  物料编码: 'code',
  物料名称: 'name',
  规格型号: 'spec',
  品牌: 'brand',
};

export const menuItems: MenuProps['items'] = [
  { label: '手工录入', key: 'hand' },
];
