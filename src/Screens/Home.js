import React, { useEffect, useState } from 'react'
import Header from '../Components/Includes/Header'
import Footer from '../Components/Includes/Footer'
import Banner from '../assets/images/bookBanner.webp'
import '../Components/assets/css/home.css'
import image from '../assets/images/49666.pinterest.jpg'
import { BiSearchAlt } from 'react-icons/bi';
import baseUrl from '../config.json'


function Home() {
  const [isBookData, setBookData] = useState([])

  async function GET_BOOKS() {
    await fetch(
      `${baseUrl.baseUrl}/books/GetBooks/0`, {
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
  }, [])


  return (
    <>

      <div className="mainBannerBox">
        <Header />
        <div className='homeBanner'>
          <img src={Banner} alt="" />
          <div className="searchBox">
            <input type="search" placeholder='Type book name here...' />
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
                          <div className="image-box border pb-2">
                            <h5 className='mb-3 p-2' style={{ textTransform: "capitalize" }}>{items?.title}</h5>
                            <img src={baseUrl.baseUrl + "/" + items?.title_image} alt={items?.title} />
                          </div>
                        )
                      }) :
                      "Not Data Found"
                }
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
