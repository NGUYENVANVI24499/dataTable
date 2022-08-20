import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import {Table,Popconfirm, Button, Space, Form, Input} from 'antd'
import {isEmpty, values} from 'lodash'
const DataTable = () => {
  const [gridData, setGridData] =useState([])
  const [loading, setLoading] =useState(false)
  const [editRowkey, setEditRowkey] = useState("")
  const [form] = Form.useForm()
  useEffect(()=>{
    loadData();
  },[])

  const loadData = async () => {
    setLoading(true)
    const res = await axios.get("https://jsonplaceholder.typicode.com/comments")
    setGridData(res.data)
    setLoading(false)
  }

  const dataWithAge = gridData.map(item=>({
    ...item,
    age:Math.floor(Math.random()*6) + 20
  }))
  const modifiedData = dataWithAge.map(({body, ...item})=>({
    ...item,
    key:item.id,
    message: isEmpty(body)? item.message : body
  }))

  const handleDelete = (value) =>{
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter(i=>i.id !== value.id)
    setGridData(filteredData)
  }

  const isEditing = (record)=>{
    return record.key === editRowkey
  }
  const cancel = () =>{

  }
  const save = () =>{}

  const edit = (record) =>{
    form.setFieldValue({
      name:"",
      email:"",
      message:"",
      ...record
    })
    setEditRowkey(record.key)
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title:"Name",
      dataIndex: "name",
      align:"center",
      editTable: true
    },
    {
      title:"Email",
      dataIndex: "email",
      align:"center",
      editTable: true
    },
    {
      title:"Age",
      dataIndex: "age",
      align:"center",
      editTable: true
    },
    {
      title:"Message",
      dataIndex: "message",
      align:"center",
      editTable: true
    },
    {
      title:"Action",
      dataIndex: "action",
      align:"center",
      render:(_,record)=>{
        const editable = isEditing(record)
      return  modifiedData.length >=1 ? (
          <Space>
            <Popconfirm
              title ="ban co muon xoa"
              onConfirm={()=>handleDelete(record)}
            >
              <Button danger type='primary' disabled = {editable }>
                Delete
              </Button>
            </Popconfirm>
            {editable?(
              <span>
                <Space size="middle" >
                  <Button onClick={()=>save(record.key)} style ={{marginRight: '8px'}}>Save</Button>
                  <Popconfirm title="bạn có muốn hủy" onConfirm={cancel}>
                    <Button>Cancel</Button>
                  </Popconfirm>
                </Space>
              </span>
            ):(
              <Button onClick={()=>edit(record)}>Edit</Button>

            )}
          </Space>
        ) : null
      }
    }
  ]
  const mergedColumns = columns.map((col)=>{
    if(!col.editTable){
      return col
    }
    return {
      ...col,
      onCell: (record) =>({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })
  const EditableCell = ({
    editing,
    dataIndex, 
    title, 
    record, 
    children, 
    ...restProps
  })=>{
    const input = <Input />

    return(
      <td {...restProps}>
          {editing?(
            <Form.Item 
              name={dataIndex}
              rules={[
                {
                  required: true,
                  message: `vui long nhap in ${title}`
                }
              ]}>
                {input}
            </Form.Item>
          ):(
            children
          )}
      </td>
    )
  }
  return (
    <div>
      <Form form={form} component = {false}>
        <Table
          columns={mergedColumns}
          components = {{
            body: {
              cell:EditableCell
            }
          }}
          dataSource ={modifiedData}
          bordered
          loading = {loading}
        >

        </Table>
      </Form>
    </div>
  )
}

export default DataTable