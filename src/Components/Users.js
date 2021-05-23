import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ProTable from "@ant-design/pro-table";
import enUS from "antd/lib/locale/en_US";
import { ConfigProvider } from "antd";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Address",
    dataIndex: "address",
    valueType: "select",
    filters: true,
    onFilter: true,
    valueEnum: {
      london: {
        text: "London",
      },
      "New York": {
        text: "new York",
      },
    },
  },
  {
    title: "Action",
    key: "action",
    sorter: true,
    valueType: "option",
    render: () => [
      <a key="delete" href="#" onClick={(e) => e.preventDefault()}>
        Delete
      </a>,
      <a
        key="link"
        href="#"
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        More actions <DownOutlined />
      </a>,
    ],
  },
];
const genData = (total) => {
  if (total < 1) {
    return [];
  }
  const data = [];
  for (let i = 1; i <= total; i += 1) {
    data.push({
      key: i,
      id: i,
      name: "John Brown",
      age: i + 10,
      department: i % 2 === 0 ? "Finance" : "Market",
      address: i % 2 === 0 ? "london" : "New York",
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }
  return data;
};
const initData = {
  bordered: true,
  loading: false,
  columns,
  pagination: {
    show: "true",
    pageSize: 5,
    current: 1,
    total: 100,
  },
  size: "small",
  expandable: false,
  // headerTitle: 'Advanced Form',
  // tooltip: 'Advanced Form tooltip',
  showHeader: true,
  footer: true,
  rowSelection: {},
  scroll: true,
  hasData: true,
  tableLayout: undefined,
  toolBarRender: true,
  search: {
    show: "true",
    span: 12,
    collapseRender: true,
    labelWidth: 80,
    filterType: "query",
    layout: "horizontal",
  },
  options: {
    show: "true",
    density: false,
    fullScreen: true,
    setting: true,
    reload: false,
  },
};
const ProTableUserDetails = () => {
  var _a, _b, _c, _d, _e;
  const [config, setConfig] = useState(initData);
  const tableColumns =
    (_a = config.columns || columns) === null || _a === void 0
      ? void 0
      : _a.map((item) =>
          Object.assign(Object.assign({}, item), { ellipsis: config.ellipsis })
        );
  return (
    <ConfigProvider locale={enUS}>
      <ProTable className="pro-table-scroll"
        {...config}
        pagination={
          (
            (_b = config.pagination) === null || _b === void 0
              ? void 0
              : _b.show
          )
            ? config.pagination
            : {
                pageSize: 5,
              }
        }
        search={
          ((_c = config.search) === null || _c === void 0 ? void 0 : _c.show)
            ? config.search
            : {}
        }
        expandable={
          config.expandable && {
            expandedRowRender: (record) => <p>{record.description}</p>,
          }
        }
        options={
          ((_d = config.options) === null || _d === void 0 ? void 0 : _d.show)
            ? config.options
            : false
        }
        toolBarRender={
          (config === null || config === void 0 ? void 0 : config.toolBarRender)
            ? () => ""
            : false
        }
        footer={config.footer ? () => "" : false}
        headerTitle={config.headerTitle}
        columns={tableColumns}
        dataSource={genData(
          ((_e = config.pagination) === null || _e === void 0
            ? void 0
            : _e.total) || 10
        )}
        scroll={config.scroll}
      />
    </ConfigProvider>
  );
};
export default ProTableUserDetails;
