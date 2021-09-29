import React, { useState } from 'react'
import { Divider } from 'antd'
import 'antd/dist/antd.css';
import logo from '../assets/logo.png'
import styled from 'styled-components'
import { STAY_LIST } from '../api/data'
import ComponetDrawer from './ComponetDrawer';
import LazyImage from './LazyImage';
const Airdbnb = () => {

    const [data, setData] = useState(STAY_LIST)
    const [visible, setVisible] = useState(false)
    const [city, setCity] = useState('')
    const [guest, setGuest] = useState(0)
    const count = data.length
    const [location, setLocation] = useState('')





    const showDrawer = () => {
        setVisible(true)
    }
    const onClose = () => {
        setVisible(false)
    }


    const filter = (place, count) => {
        
        const citys = STAY_LIST.filter((item) => item.city === place && item.maxGuests >= count)
        const persons = STAY_LIST.filter((item) => item.maxGuests >= count)
        
        if (place === "") {
            setData(persons)
        } else if (place === 'all'){
            setData(persons)
        } else {
            setData(citys)
        }

        citys.forEach(element => {
            setLocation(element.country)
        });
        setCity(place)
        setGuest(count)

        return false
    }

    return (
        <Wrapper >
            <div className="header">
                <div className="wind">
                    <img src={logo} alt='logo' className="logo" />
                </div>
                <div className="searching">
                    <div className="search">
                        <div className="city" >{city}</div>
                        <Divider type='vertical' style={{ height: '30px' }} />
                        <div className="guests" > {guest && guest ? guest : 'Add guests'}</div>
                        <Divider type='vertical' style={{ height: '30px' }} />
                        <span onClick={showDrawer} className="material-icons" style={{ marginRight: '10px', marginTop: '5px' }}>
                            search
                        </span>
                    </div>
                </div>
                <br />


            </div>
            <ComponetDrawer filterSearch={filter} visible={visible} onClose={onClose} placement='top' />
            <div className="lugares">
                <h4 className="tit1"> {location === "" ? 'All Stays' : ` Stays in  ${location}`} </h4>
                <p className="tit2">{count} Stays</p>
            </div>
            <div className="places">
              <div className="row">
                    {
                        data.map((item, index) =>
                        (
                        
                                <LazyImage
                                    key={item.id}
                                    src={item.photo}
                                    alt={`Random image ${item}`}
                                    host={item.superHost}
                                    type={item.type}
                                    beds={item.beds}
                                    rating={item.rating}
                                    title={item.title}
                                />
                    

                        )
                        )
                    }
            </div>
            </div>

        </Wrapper>
    )

}

const Wrapper = styled.div`
    overflow: hidden;

.header{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin:5%;
    line-height:100%;
}
.wind{
    margin-left: -10px;
    }

.searching{
    margin-left: auto;
}
.city{
    width: 80px;
    margin-left: 25px;
    line-height: 30px;
}
.guests {
    width: 80px;
    
    line-height: 30px;


}

.logo{
    width:100px;
height: 20px;
}

.search{
    display:flex;
    flex-wrap: nowrap;
    align-items: stretch ;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    height:auto;

}
.lugares{
    display: flex;
  flex-wrap: nowrap;
  justify-content:space-between;
  align-items:baseline;
  }
   .tit1{
      margin-left:20px
  }
  .tit2{
    margin-right: 30px;
  }
.host{
    float:left;
    border: 1px solid #4F4F4F;
    box-sizing: border-box;
    border-radius: 14px;
    border-color: #000;
    width: 40%;
    height: 10%;
}
.imagenes{
    width:95%;
    border-radius:10%
}
.flex-container {
  display: flex;
  flex-wrap: nowrap;
  margin: 10px;
  text-align: center;
  font-size: 14px;
  justify-content: space-around;
}

.places{
    margin-left: 2px;
}


.stays{
    margin-top: 200px
}
@media screen and (max-width: 550px) {
 
 .searching{
     margin-top: 30px;
     position: auto;
 }
 }
`
export default Airdbnb
