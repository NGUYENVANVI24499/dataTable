import React, { useEffect, useState } from "react";
import { Button, Input, Card } from "antd";

const initialvalue = {
  useName: "",
  password: "",
  children: [
    {
      name: "",
      value: "",
    },
    {
      name: "",
      value: "",
    },
  ],
};
const DataTable = () => {

  console.log('render')
  const [values, setValue] = useState(initialvalue);
  const [errors, setErrors] = useState({});
  const [error1, setErrors1] = useState({});

  const validate = (fleldValue = values) => {
    let temp = { ...errors };
    if ("useName" in fleldValue) {
      temp.useName = fleldValue.useName ? "" : "vui long nhap ten";
    }
    if ("password" in fleldValue) {
      temp.password = fleldValue.password ? "" : "vui long nhap pasword";
    }
    setErrors({
      ...temp,
    });
    if (fleldValue == values) return Object.values(temp).every((x) => x == "");
  };
  const validate1 = (fleldvalues = values) => {
    let tempp = { ...error1 };
    tempp.children = fleldvalues.children.map((item, index) => {
      return {
        ...item,
        ...{
          name: item.name ? "" : "nhập name",
          value: item.value ? "" : "vui lòng nhập value",
        },
      };
    });
    setErrors1({
      ...tempp,
    });
    if ((fleldvalues = values)) {
      let ischeck = [];
      tempp.children.forEach((item, index) => {
        ischeck.push(Object.values(item).every((x) => x == ""));
      });
      return ischeck.every((x) => x == true);
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
    validate({
      [name]: value,
    });
  };
  const handleChangeChildren = (e, index) => {
    const { name, value } = e.target;
    let temp = { ...values };
    temp.children[index][name] = value;
    setValue(temp);
    validate1(temp);
  };
  const handleSubmit = () => {
    if (validate()) {
      if (validate1()) {
        console.log(values)
      }
    } else {
      alert('vui lòng nhập đầy đủ thông tin')
    }
  };
  return (
    <div className="container-sm" style={{ marginTop: 50 }}>
      <Input
        name="useName"
        className="mt-3"
        placeholder="username"
        value={values.name}
        onChange={handlechange}
        {...(errors.useName && { status: "error" })}
      ></Input>
      <div style={{ color: "red" }}>{errors.useName}</div>

      <Input
        name="password"
        className="mt-3"
        placeholder="password"
        value={values.password}
        onChange={handlechange}
        {...(errors.password && { status: "error" })}
      ></Input>
      <div style={{ color: "red" }}>{errors.password}</div>
      <Card title={"Công việc con"} className="mt-3">
        {values.children.map((item, index) => (
          <Card
            className="mt-3"
            key={index}
            title={"công việc con số:" + index}
          >
            <Input
              name="name"
              placeholder=" nhập name"
              value={item.name}
              onChange={(e) => handleChangeChildren(e, index)}
              {...(error1?.children &&
                error1?.children[index].name && { status: "error" })}
            ></Input>
            <div style={{ color: "red" }}>
              {error1?.children &&
                error1?.children[index].name &&
                error1?.children[index].name}
            </div>
            <Input
              name="value"
              placeholder="value"
              className="mt-2"
              value={item.value}
              onChange={(e) => handleChangeChildren(e, index)}
              {...(error1?.children &&
                error1?.children[index].value && { status: "error" })}
            ></Input>
            <div style={{ color: "red" }}>
              {error1?.children &&
                error1?.children[index].value &&
                error1?.children[index].value}
            </div>
          </Card>
        ))}
      </Card>
      <Button
        className="mt-3"
        style={{ marginBottom: "20px" }}
        onClick={handleSubmit}
      >
        submit
      </Button>
    </div>
  );
};

export default DataTable;
