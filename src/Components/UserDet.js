import React, { Component } from "react";
import { Table, Checkbox, Collapse } from "antd";
export default class UserDet extends Component {
  constructor() {
    super();
    this.state = {
      idCheck: true,
      nameCheck: true,
      deptCheck: true,
      filteredInfo: null,
      sortedInfo: null,
      children: [],
      dataSource: [
        {
          key: "1",
          id: "1",
          name: "John Brown",
          department: "Marketing Department",
          age: 32,
          address: "New York No. 1 Lake Park",
        },
        {
          key: "2",
          id: "2",
          name: "Jim Green",
          department: "Operations Department",
          age: 42,
          address: "London No. 1 Lake Park",
        },
        {
          key: "3",
          id: "3",
          name: "Joe Black",
          department: "Finance Department",
          age: 32,
          address: "Sidney No. 1 Lake Park",
        },
        {
          key: "4",
          id: "4",
          name: "Jim Red",
          department: "Sales Department",
          age: 32,
          address: "London No. 2 Lake Park",
        },
        {
          key: "5",
          id: "5",
          name: "John Brown",
          department: "Marketing Department",
          age: 32,
          address: "New York No. 2 Lake Park",
        },
        {
          key: "6",
          id: "6",
          name: "Jim Green",
          department: "Operations Department",
          age: 42,
          address: "London No. 2 Lake Park",
        },
        {
          key: "7",
          id: "7",
          name: "Joe Black",
          department: "Finance Department",
          age: 32,
          address: "Sidney No. 2 Lake Park",
        },
        {
          key: "8",
          id: "8",
          name: "Jim Red",
          department: "Sales Department",
          age: 32,
          address: "London No. 2 Lake Park",
        },
      ],
      columns: [
        {
          title: "Id",
          dataIndex: "id",
          key: "id",
          sorter: (a, b) => a.id - b.id,
          ellipsis: true,
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.length - b.name.length,
          ellipsis: true,
        },
        {
          title: "Department",
          dataIndex: "department",
          key: "department",
          sorter: (a, b) => a.address.length - b.address.length,
          ellipsis: true,
        },
      ],
    };
  }
  //Calling function to add/display column
  onCheckChange(e, value) {
    let sort;
    if (value === "id") {
      sort = (a, b) => a.id - b.id;
      this.setState({ idCheck: !this.state.idCheck });
    }
    if (value === "name") {
      sort = (a, b) => a.name.length - b.name.length;
      this.setState({ nameCheck: !this.state.nameCheck });
    }
    if (value === "department") {
      sort = (a, b) => a.department.length - b.department.length;
      this.setState({ deptCheck: !this.state.deptCheck });
    }
    const { columns } = this.state;
    let title = value.charAt(0).toUpperCase() + value.slice(1);
    if (e.target.checked === true) {
      let obj = {
        title: title,
        dataIndex: value,
        sorter: sort,
        key: value,
        ellipsis: true,
      };
      console.log("obj", obj);
      this.setState({
        columns: [...columns, obj],
      });
    }
    if (e.target.checked === false) {
      let arr = [...columns];
      let index = arr.findIndex((x) => x.title === title);
      if (index !== -1) {
        arr.splice(index, 1);
        this.setState({
          columns: arr,
        });
      }
    }
  }
  render() {
    const { dataSource, columns } = this.state;
    const { Panel } = Collapse;
    return (
      <>
        <span style={{ fontSize: "23px", fontWeight: "600" }}>
          User Details
        </span>
        <Collapse style={{ width: "50%", float: "right" }}>
          <Panel header="Select Columns to display">
            <Checkbox
              onChange={(e) => this.onCheckChange(e, "id")}
              checked={this.state.idCheck}
            >
              ID
            </Checkbox>
            <Checkbox
              onChange={(e) => this.onCheckChange(e, "name")}
              checked={this.state.nameCheck}
            >
              Name
            </Checkbox>
            <Checkbox
              onChange={(e) => this.onCheckChange(e, "department")}
              checked={this.state.deptCheck}
            >
              Department
            </Checkbox>
            <Checkbox onChange={(e) => this.onCheckChange(e, "age")}>
              Age
            </Checkbox>
            <Checkbox onChange={(e) => this.onCheckChange(e, "address")}>
              Address
            </Checkbox>
          </Panel>
        </Collapse>
        <Table dataSource={dataSource} columns={columns} scroll={{ y: 240 }} style={{marginTop:'7%'}}/>
      </>
    );
  }
}
