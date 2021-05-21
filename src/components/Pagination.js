import React from 'react'
import styled from 'styled-components'
import { Space} from 'antd'


const Pagination = (props) => {
    const { hotelsPerPage, totalHotels, paginate, nextPage, prevPage,currentPage,activePage } = props
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalHotels / hotelsPerPage); i++) {
        pageNumbers.push(i)

    }
    return (
        <Wrapper>
        <nav>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a className="page-link" href="#" onClick={() => prevPage()}>Previous</a>
                </li>

                {pageNumbers.map(num => (
                        <li className="page-item " key={num}>
                            <a onClick={() => paginate(num)} href="#" className={currentPage == num ? "active page-link" : "page-link"}>
                                <span class="sr-only">{num}</span></a>
                        </li>
                    ))}
                    <li className="page-item ">
                        <a className="page-link" href="#" onClick={() => nextPage()}>Next</a>
                    </li>
                </ul>
        </nav>
        </Wrapper>
    )
}

export default Pagination
const Wrapper = styled.div`


.page-item:not(:first-child) .page-link {
    margin-left: 2px;
}
.active{
    border-color: #339FFF;
   
}



`