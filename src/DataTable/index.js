import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import {Table,Popconfirm, Button, Space, Form, Input} from 'antd'
import {isEmpty, values} from 'lodash'
const DataTable = () => {
  const [gridData, setGridData] =useState([])
  const [loading, setLoading] =useState(false)

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
      render:(_,record)=>
        modifiedData.length >=1 ? (
          <Space>
            <Popconfirm
              title ="ban co muon xoa"
              onConfirm={()=>handleDelete(record)}
            >
              <Button danger type='primary'>
                Delete
              </Button>
            </Popconfirm>
            <Button onClick={()=>{}}>Edit</Button>
          </Space>
        ) : null
    }
  ]
  console.log(modifiedData)
  return (
    <div>
      <Table
        columns={columns}
        dataSource ={modifiedData}
      >

      </Table>
    </div>
  )
}

export default DataTable