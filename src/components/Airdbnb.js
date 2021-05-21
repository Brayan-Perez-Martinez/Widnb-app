import React, {  useState } from 'react'
import { Input, Divider,Button,Space} from 'antd'
import 'antd/dist/antd.css';
import logo from '../assets/logo.png'
import styled from 'styled-components'
import { STAY_LIST } from '../api/data'
import ComponetDrawer from './ComponetDrawer';
import Pagination from './Pagination';

const Airdbnb = () => {


    


    const [data, setData] = useState(STAY_LIST)

    const [visible, setVisible] = useState(false)
    const [city, setCity] = useState('')
    const [guest, setGuest] = useState(0) 
    const count = data.length
    const [location ,setLocation] = useState('')
    const [state, setstate] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [hotelsPerPage, setHotelsPerPage] = useState(5)
    
    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const [activePage,setActivePage] = useState(false)
/*     const currentHotels = data.slice(indexOfFirstHotel,indexOfLastHotel)
 */
    const maxPage = Math.ceil([...data].length / hotelsPerPage)

    const paginate =( pageNum) => {
        setActivePage(true)
        console.log(activePage)
        setCurrentPage(pageNum)
    console.log(currentPage)
}
console.log(activePage)

    const nextPage = () => {
        if(currentPage >= maxPage - 1 ) return
        setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if(currentPage === 1) return
        setCurrentPage(currentPage - 1)
    }
   
    
    console.log(state)
     
   console.log(city)
   console.log(guest)


    const showDrawer = () => {
        setVisible(true)
    }
    const onClose = () => {
        setVisible(false)
    }


    const filter = (location,count) =>{
        console.log(location,count)
       
       const citys = STAY_LIST.filter((item) => item.city === location && item.maxGuests >= count)  
       setCity(location)
        setGuest(count)
        citys.forEach(element => {
            setLocation(element.country)
       });
      
      
      console.log(location)
       const persons = STAY_LIST.filter((item) => item.maxGuests >= count)
       
       if(location.length === 0){
          setData(persons)
      }else if(location === "" && count === 0 ) {
          setData(STAY_LIST)
      }else{
          setData(citys)          
      }

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
                        <Input  value={city} onChange={e => setCity(e.target.value)} className="success" />
                        <Divider type='vertical' style={{ height: '30px' }} />
                        <Input value={guest} onChange={e => setGuest(e.target.value)} placeholder="Add guests" className="success" />
                        <Divider type='vertical' style={{ height: '30px' }} />
                        <span onClick={showDrawer} className="material-icons" style={{ marginRight: '10px', marginTop: '5px' }}>
                            search
                        </span>
                    </div>
                   
                </div>
                <br/>
              

            </div>
            <ComponetDrawer setPrueba={setstate} filterSearch={filter} visible={visible} onClose={onClose} placement='top' />
            <div className="lugares">
                <h4 className="tit1"> {location === "" ? 'All Stays': ` Stays in  ${location}`} </h4>
                <p className="tit2">{count} Stays</p>
            </div>
            <div className="places">

                <div className='row'>
                    {
                        data.slice(indexOfFirstHotel,indexOfLastHotel).map((item, index) =>
                        (
                            <div key={index} className='col-md-4 col-xs-4'>
                                <img src={item?.photo} alt="property" className="imagenes" />

                                <div className="flex-container">
                                    {item?.superHost ? <p className="host">SUPER HOST</p> : ''}
                                    {item?.type}
                                    {item?.beds !== null ? <p>{item.beds} beds</p> : ''}<span>
                                        <span className="material-icons">star_rate</span>{item?.rating} </span>
                                </div>
                                {item?.title ? <p>{item.title}</p> : ''}
                            </div>

                        )
                        )
                    }
                </div>
              <Pagination hotelsPerPage={hotelsPerPage} currentPage={currentPage} activePage={activePage} totalHotels={data.length}
              paginate={paginate} nextPage={nextPage} prevPage={prevPage} 
 />
            </div>
           
        </Wrapper>
    )

}

const Wrapper = styled.div`
.header{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin:30px;


}
.wind{
    margin-left: -10px;
    }
@media screen and (max-width: 550px) {
 
.searching{
    margin-top: 20px;
}
}
.ant-input.success {
    border-color: none;
    box-shadow: none;
    outline-color:  none;
    border-style:none;

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
border-radius: 12px;
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
    margin-left: 20px;
}


.stays{
    margin-top: 200px
}

`
export default Airdbnb
