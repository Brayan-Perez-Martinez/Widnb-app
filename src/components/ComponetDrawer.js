import React, { useState, useEffect } from 'react'
import { Button, Divider, Drawer, Input, Select } from 'antd'
import 'antd/dist/antd.css';
import styled from 'styled-components'
import { STAY_LIST } from '../api/data'
const ComponetDrawer = ( props ) => {

  const { placement, onClose, visible ,filterSearch,setPrueba} = props
  
  const { Option } = Select;
  const [countAdult, setCountAdult] = useState(0)
  const [countChild, setCountChild] = useState(0)
  const [count, setCount] = useState(0)
  const [location, setLocation] = useState('')
  const [data, setData] = useState([])
  
  const getData = () => {

    setTimeout(() => {
      const res = STAY_LIST
      setData(res)
      console.log(res)

    }, 3000);


  }
  useEffect(() => {
    getData()
  }, [])

  const finalCount = (e) => {
    if (countAdult >= 0 && countChild >= 0) {
      setCount(countAdult + countChild)
    } else {
      setCount(0)
    }
  }

  useEffect(() => {
    finalCount()
  }, [countAdult, countChild])

  const selectCity = (value) =>{
   console.log(value)
   setLocation(value)
  }

  const filter = (e) => {
    e.preventDefault()
    filterSearch(location,count)

  }
  /* 
  useEffect(() => {
    filterSearch(location,count)
  }, [location,count]) */
  const clearSelected = () => {
    // this line will clear the select
    // when you click on the button
    setLocation('')
  }
  return (
    <div>

      <Drawer
        placement={placement}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={placement}
      >
        <Wrapper>
          <form onSubmit={filter}>
          <div className="container">
            <Select style={{ width: 120 }}  value={location}  onDoubleClick ={clearSelected} onChange={selectCity}>
              {
                data?.map((item,index) => (
                  <Option key={index} value={item.city}>{item.city}-{item.country}</Option>
                ))
              }
            </Select>
            <Divider className="dividers" type="vertical" />
            <Input onChange={(e) => setCount(e.target.value)} value={count} className="success" />
            
{/*             <Input onChange={(e) => setPrueba(e.target.value)} className="success" />
 */}            <Divider className="dividers" type="vertical" />
            <button type="submit" className="searching">
              <span >
                <span className="material-icons" style={{ color: 'white' }}>
                  search
            </span>Search </span>
            </button>

          </div>

          <div className="Counting">
            <p>Adults</p>
            <p>Ages 13 or above</p>
            <span><Button className="btn-1" onClick={() => setCountAdult(countAdult - 1)}><span className="material-icons" style={{ marginLeft: '-11px', marginTop: '-4px' }}>remove</span></Button>
              {countAdult}
              <Button className="btn-2" onClick={() => setCountAdult(countAdult + 1)}><span className="material-icons" style={{ marginLeft: '-11px', marginTop: '-5px' }}>add</span></Button>
            </span>
            <p>Children</p>
            <p>Ages 2-12</p>
            <span>
              <Button className="btn-1" onClick={() => setCountChild(countChild - 1)}><span className="material-icons" style={{ marginLeft: '-11px', marginTop: '-4px' }}>remove</span></Button>
              {countChild}
              <Button className="btn-2" onClick={() => setCountChild(countChild + 1)}><span className="material-icons" style={{ marginLeft: '-11px', marginTop: '-5px' }}>add</span></Button>
            </span>
          </div>
          </form>
        </Wrapper>

      </Drawer>
    </div>
  )
}

const Wrapper = styled.div`

.Counting{
  display: grid;
    justify-content: center;
}


.btn-1{
 width: 23px;
height: 23px;
border: 1px solid #828282;
box-sizing: border-box;
border-radius: 4px;
margin-right:10px;
}

.btn-2{
   width: 23px;
height: 23px;
border: 1px solid #828282;
box-sizing: border-box;
border-radius: 4px;
margin-left:10px;

}
.searching{
  color:white;
  align-items:baseline;
  line-height: 18px;
  width: 100px;
background: #EB5757;
box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
border-radius: 16px;
}
.dividers{
  height:auto
}
.container{
  display:flex;
  flex-wrap:wrap;
  align-items: stretch ;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
  justify-content:space-evenly;
}
.ant-input.success{
  width:auto;
  border-radius:12px;  
  border-style:none;
}

.ant-input.success:focus{
    border:1px solid black;
    box-shadow: 0 0 10px #fff;
}
.ant-select:not(.ant-select-customize-input) .ant-select-selector{
   width:auto;
  border-radius:12px;  
  border-style:none;
}

.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector:hover{
    border:1px solid black;
    box-shadow: 0 0 10px #fff;

}

`

export default ComponetDrawer
