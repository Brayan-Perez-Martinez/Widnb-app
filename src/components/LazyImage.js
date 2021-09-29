import React, { useRef } from 'react'
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
const ImageWrapper = styled.div`
  
  position: relative;
  display:flex;
  width: 100%;
  height: 20vw;
  margin-bottom: 20px;
  

`;

const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAnimation} 1s infinite;
`;

const StyledImage = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius:10px;
  object-fit: cover;
`;
const LazyImage = ({src, alt, host, type, beds, rating, title }) => {
  const refPlaceholder = useRef()
  const removePlaceholder = () => {
    refPlaceholder.current.remove()
  }
  return (
    <div className='col-md-4 col-xs-4'>
      <ImageWrapper>
        <Placeholder ref={refPlaceholder} />
        <LazyLoad>
          <StyledImage
            onLoad={removePlaceholder}
            onError={removePlaceholder}
            src={src}
            alt={alt}
          />
        </LazyLoad>
      </ImageWrapper>
      <div className="flex-container">
        {host ? <b className="host">SUPER HOST</b> : ''}
        {type}
        {beds !== null ? <p>{beds} beds</p> : ''}
        <span style={{display:'flex'}}>
          <span className="material-icons" style={{ color: 'red' }}>star_rate</span>{rating} 
        </span>
        {title ? <b>{title}</b> : ''}

      </div>

    </div>
  )
}
LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  host:PropTypes.bool.isRequired,
  type:PropTypes.string.isRequired,
  beds:PropTypes.number,
  rating:PropTypes.number.isRequired,
  title:PropTypes.string.isRequired,  
};
export default LazyImage
