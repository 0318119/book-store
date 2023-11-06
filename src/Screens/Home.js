import React, { useEffect, useState } from 'react'
import Header from '../Components/Includes/Header'
import Footer from '../Components/Includes/Footer'
import Banner from '../assets/images/bookBanner.webp'
import '../Components/assets/css/home.css'
import image from '../assets/images/49666.pinterest.jpg'
import { BiSearchAlt } from 'react-icons/bi';
import baseUrl from '../config.json'
import { Link, json } from 'react-router-dom'


function Home() {
  const [isBookData, setBookData] = useState([])
  const [page, setpage] = useState(1)
  const [FilterValue, setFilterValue] = useState("");
  
  
  async function GET_BOOKS() {
    await fetch(
      `${baseUrl.baseUrl}/books/GetBooks/${page}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        setBookData(response?.data)
        console.log("object insight", response?.data)
      }
      else { }
    }).catch((error) => { });
  }

  useEffect(() => {
    GET_BOOKS()
  }, [page])

const SearchFilter = (e) => {
  const searchTerm = e.target.value;
  setFilterValue(searchTerm);
  
  if (searchTerm.trim() === '') {
    GET_BOOKS();
  } else {
    const filteredBooks = isBookData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBookData(filteredBooks);
  }
}

  return (
    <>

      <div className="mainBannerBox">
        <Header />
        <div className='homeBanner'>
          <img src={Banner} alt="" />
          <div className="searchBox">
            <input type="search" placeholder="Type book title here..." value={FilterValue} onChange={SearchFilter} />
            <BiSearchAlt />
          </div>
        </div>
      </div>

      <section className='imageSearchSystem'>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="image-grid">
                {
                  isBookData?.length > 0 ?
                    isBookData?.map((items) => {
                      return (
                        <Link to={`/FlipBook?id=${items?.id}`}>
                          <div className="image-box border pb-2">
                            <h6 className='mb-3 p-2' >{items?.title.slice(0, 15)}...</h6>
                            <img src={baseUrl.baseUrl + "/" + items.title_image?.split("/resources/static/assets/uploads/")[1]} alt={items?.title} />
                          </div>
                        </Link>
                      )
                    }) :
                    "Not Data Found"
                }
              </div>
              <div style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item"><span class="page-link" onClick={() => { setpage(page - 1) }}>Previous</span></li>
                    <li class="page-item"><span class="page-link" onClick={() => { setpage(page + 1) }}>Next</span></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
