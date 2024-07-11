'use client';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Row,
  Space,
  Table,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './page.module.scss';
import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIndexDB, useXlsx } from '@/utils/hooks';
import _ from 'lodash';
import { IDataItem } from './tool/interface';
import columns from './tool/columns';
import { label2Key, menuItems, TKeys, TLabels } from './tool/config';
import { IObjectAny } from '@/utils/interface';

export default function DataHandle() {
  const [search, setSearch] = useState('');
  const [createDrawer, setCreateDrawer] = useState(false);
  const [comDrawer, setComDrawer] = useState(false);
  const [dataSource, setDataSource] = useState<IDataItem[]>([]);
  const [filterData, setFilterData] = useState<IDataItem[]>([]);
  const [viewData, setViewData] = useState<IDataItem[]>([]);
  const [conflictNum, setConflictNum] = useState(0);
  const [form] = Form.useForm();
  const uploadRef = useRef<HTMLInputElement>(null);
  const indexDB = useIndexDB();
  const xlsxTool = useXlsx({ sheetName: '外购件', range: 3 });
  const onConfirm = async () => {
    try {
      const { record } = await form.validateFields();
      compareData(record);
      setComDrawer(true);
    } catch (error) {}
  };
  const onReset = () => {
    form.resetFields();
  };
  const onSubmit = () => {};
  const onDelete = () => {};
  const compareData = (newDatas: IDataItem[]) => {
    console.log(newDatas, dataSource);

    const viewData: IDataItem[] = newDatas.map((item) => {
      const pickKey = ['code', 'name', 'spec', 'brand'];
      const oldData = dataSource.find((data) => data.code === item.code);
      const viewItem: IDataItem = { ...item };
      if (!_.isEqual(_.pick(oldData, pickKey), _.pick(viewItem, pickKey))) {
        viewItem.flag = 'conflict';
        viewItem.children = [{ ...oldData, flag: 'conflict' } as IDataItem];
      } else {
        viewItem.flag = 'same';
      }
      return viewItem;
    });
    setViewData(viewData);
  };

  const excelImport = () => {
    uploadRef.current?.click();
  };

  const itemsClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'hand') {
      setCreateDrawer(true);
    }
  };

  const handleUpload = (e: BaseSyntheticEvent) => {
    const file = e.target.files[0];
    xlsxTool.importExcel(file, (data: IObjectAny[]) => {
      setImportData(data.slice(0, -1));
      e.target.value = null;
    });
  };
  const setImportData = (data: IObjectAny[]) => {
    const keys = Object.keys(label2Key);
    const newData = data.map((item) => {
      return _.mapKeys(
        _.pick(item, keys),
        (value: string, key: TLabels) => label2Key[key]
      );
    });
    indexDB.setAll('dataHandle', newData);
    getData();
  };

  const getData = useCallback(async () => {
    const res = await indexDB.getAll('dataHandle');
    setDataSource(res);
  }, [indexDB]);

  const handleFilterData = useCallback(() => {
    const reg = new RegExp(`(${search})`, 'gi');
    const filterData = _.cloneDeep(dataSource).flatMap((data: any) => {
      let flag = false;
      const result = { ...data };
      if (search) {
        Object.keys(data).map((key) => {
          result[key] = data[key].replace(
            reg,
            '<span style="background:black; color:white">$1</span>'
          );

          if (result[key] !== data[key]) {
            flag = true;
          }
        });
      }
      return flag || !search ? result : [];
    });
    console.log(filterData);
    setFilterData(filterData);
  }, [search, dataSource]);

  useEffect(() => {
    handleFilterData();
  }, [handleFilterData]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    setFilterData(dataSource);
  }, [dataSource]);

  return (
    <div className={styles.dataHandle}>
      <h3 className={styles.header}>
        <span className={styles.title}>数据处理</span>
        <div>
          <Dropdown.Button
            // type='primary'
            key='excel'
            menu={{ items: menuItems, onClick: itemsClick }}
            onClick={excelImport}
          >
            表格录入
          </Dropdown.Button>
          <input
            style={{ display: 'none' }}
            ref={uploadRef}
            type='file'
            accept='.xlsx'
            onChange={handleUpload}
          ></input>
        </div>
      </h3>
      <Input
        placeholder='请输入关键字'
        allowClear
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Table
        rowKey='code'
        className={styles.data}
        columns={columns.map((col) => ({
          ...col,
          render: (text) => (
            <span dangerouslySetInnerHTML={{ __html: text }}></span>
          ),
        }))}
        dataSource={filterData}
      ></Table>
      <Drawer
        title='手工录入'
        open={createDrawer}
        closeIcon={false}
        destroyOnClose
        width={500}
        onClose={() => {
          setCreateDrawer(false);
          onReset();
        }}
        extra={
          <Space>
            {/* <Button onClick={() => onDelete()} ghost danger>
              删除
            </Button> */}
            <Button onClick={onConfirm} ghost type='primary'>
              确认
            </Button>
          </Space>
        }
      >
        <Form form={form} autoComplete='off' initialValues={{ record: [{}] }}>
          <Form.List name='record'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ name }) => (
                  <Space key={name} direction='vertical'>
                    <Card
                      size='small'
                      title={`第 ${name + 1} 项`}
                      extra={
                        fields.length > 1 ? (
                          <CloseOutlined onClick={() => remove(name)} />
                        ) : null
                      }
                    >
                      <Row gutter={[16, 0]}>
                        {columns.map((item) => (
                          <Col span={12} key={item.dataIndex as string}>
                            <Form.Item
                              label={item.title as TLabels}
                              name={[name, item.dataIndex as TKeys]}
                              required
                              rules={[{ required: true }]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                        ))}
                      </Row>
                    </Card>
                  </Space>
                ))}
                <Button
                  style={{
                    position: 'sticky',
                    bottom: '0',
                  }}
                  onClick={() => add()}
                  type='primary'
                  block
                >
                  添加新项
                </Button>
              </>
            )}
          </Form.List>
        </Form>
        <Drawer
          title='数据对比'
          closeIcon={false}
          onClose={() => setComDrawer(false)}
          open={comDrawer}
          width={600}
          destroyOnClose
          extra={
            <Space>
              <Button type='primary' ghost onClick={onSubmit}>
                提交
              </Button>
            </Space>
          }
        >
          <div></div>
          <Space></Space>
          <Table
            className={styles.viewData}
            rowKey={(record) => record.code}
            rowSelection={{
              type: 'checkbox',
              getCheckboxProps: (record) => ({
                disabled: record.flag === 'same',
              }),
              defaultSelectedRowKeys: viewData.flatMap((item) =>
                item.flag === 'same' ? [] : item.code
              ),
              onSelectAll: (a, b, c) => {
                console.log(a, b, c);
              },
            }}
            dataSource={viewData}
            columns={columns}
            rowClassName={(record) => (record.flag ? styles[record.flag] : '')}
          ></Table>
        </Drawer>
      </Drawer>
    </div>
  );
}
