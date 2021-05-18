import React from 'react'
import styled from 'styled-components'
import 'antd/dist/antd.css';

const Locations = ({host,type,beds,photo,title,rating,key}) => {

    return (
        <Wrapper>

        
             <div className="places">

              <div className='row'>
            <div key  className='col-md-4 col-xs-4'>
                <img src={photo} alt="property" className="imagenes" />

                <div className="flex-container">
                    {host && host ? <p className="host">SUPER HOST</p> : ''}
                    {type}
                    {beds !== null ? <p>{beds} beds</p> : ''}<span>
                        <span className="material-icons">star_rate</span>{rating} </span>
                </div>
                { title && title ? <p>{title}</p> : ''}
            </div>

        

        </div>
        </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  


`
export default Locations
