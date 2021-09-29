import React, { useState, useEffect } from 'react'
import { Button, Divider, Drawer, Input, Select } from 'antd'
import 'antd/dist/antd.css';
import styled from 'styled-components'
import { STAY_LIST } from '../api/data'
const ComponetDrawer = (props) => {

  const { placement, onClose, visible, filterSearch } = props

  const { Option } = Select;
  const [countAdult, setCountAdult] = useState(0)
  const [countChild, setCountChild] = useState(0)
  const [count, setCount] = useState(0)
  const [location, setLocation] = useState('')
  const [data, setData] = useState([])
  const [citys, setCitys] = useState([])


  const getData = () => {

    setTimeout(() => {
      const res = STAY_LIST
      setData(res)

    }, 3000);


  }
  useEffect(() => {
    getData()
  }, [])

 

  useEffect(() => {
    const finalCount = (e) => {
      if (countAdult >= 0 && countChild >= 0) {
        setCount(countAdult + countChild)
      } else {
        setCount(0)
      }
    }

    finalCount()
  }, [countAdult, countChild])


  const adultIncrement = () => {
    setCountAdult(countAdult => countAdult + 1)
  }
  const adultDecrement = () => {
    if (countAdult === 0) return
    setCountAdult(countAdult => countAdult - 1)

  }

  const childIncrement = () => {
    setCountChild(countChild => countChild + 1)
  }

  const childDecrement = () => {
    if (countChild === 0) return
    setCountChild(countChild => countChild - 1)

  }

  const maxCount = () => {
    if (!isNaN(count)) {
    } else {
    }
  }

  maxCount()
  const selectCity = (value) => {
    setLocation(value)
  }

  const filter = (e) => {
    e.preventDefault()
    filterSearch(location, count)

  }
  const clearSelected = () => {
    
    setLocation('')
  }



  


  useEffect(() => {
    const optionsSelect =  () => {
    let locals = [];
    data.map((item) => {
      const city = item.city;
      if (!locals.includes(city)) {
        locals = [...locals, city]
      }
      return item
    })
    let all = 'all'
    locals.unshift(all)
    setCitys(locals)
    return locals
  }
  
    optionsSelect()
  }, [data])
  
  


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
              <Select style={{ width: 120  }} className="success"  value={location} onDoubleClick={clearSelected} onChange={selectCity}>
                {
                  citys?.map((item, index) => (
                    <Option key={index} value={item}>{item}</Option>
                  ))
                }
              </Select>
              <Divider className="divider-1" type="vertical" />
              <Input onChange={(e) => setCount(e.target.value)} value={count} className="success" />
              <Divider className="divider-2" type="vertical" />
              <button type="submit" className="btn btn-danger searching" >
                <span style={{display:'flex'}} >
                  <span className="material-icons" style={{ color: 'white' }}>
                    search
                  </span>Search </span>
              </button>

            </div>

            <div className="Counting">
              <p>Adults</p>
              <p>Ages 13 or above</p>
              <span style={{display:'flex'}}><Button className="btn-1" onClick={adultDecrement}><span className="material-icons" style={{ marginLeft: '-11px', marginTop: '-4px' }}>remove</span></Button>
                {countAdult}
              <Button className="btn-2" onClick={adultIncrement}><span className="material-icons" style={{ marginLeft: '-11px', marginTop: '-5px' }}>add</span></Button>
              </span>
              <p>Children</p>
              <p>Ages 2-12</p>
              <span style={{display:'flex'}}>
                <Button className="btn-1" onClick={childDecrement}><span className="material-icons" style={{ marginLeft: '-11px', marginTop: '-4px' }}>remove</span></Button>
                {countChild}
                <Button className="btn-2" onClick={childIncrement}><span className="material-icons" style={{ marginLeft: '-11px', marginTop: '-5px' }}>add</span></Button>
              </span>
            </div>
          </form>
         
          
        </Wrapper>

      </Drawer>
    </div >
  )
}

const Wrapper = styled.div`

@media screen and (max-width: 396px) {
  .divider-1{
  display: none;
}
}

@media screen and (max-width: 512px) {
  .divider-2{
  display: none;
}
}

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
  width: 100px;
  background: #EB5757;
  box-shadow: 0px px 6px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}

.divider-1,.divider-2{
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
  width:120px;
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

@media screen and (max-width:730px){
      .success{
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .searching{
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .container{
        display: grid;
      }
}

`

export default ComponetDrawer
