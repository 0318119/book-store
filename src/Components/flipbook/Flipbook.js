import React, { useEffect, useState } from 'react';
import PageFlip from 'react-pageflip';
import { useLocation } from 'react-router-dom';
import "../assets/css/flipbook.css"
import baseUrl from '../../config.json';
import { Button, message, Space } from 'antd';



export function FlipBook() {
  const search = useLocation().search;
  const ids = new URLSearchParams(search).get("id");
  const [pages, setPages] = useState([])
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageApiBook, contextHolderBook] = message.useMessage();


  const fetchbookPDF = async () => { 
    fetch(`https://payments-api.logomish.com/books/GetBooksImages/${ids}`, {
      method: "GET",
      headers: { 'content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        const newPages = res.data.map(i => (
          <div key={i.Id} className="page">
            <img src={`https://payments-api.logomish.com/${i.image.split('uploads/')[1]}`} alt={`Page ${i.Id}`} />
          </div>
        ));
        setPages(newPages);
      }).catch((error) => {
        messageApiBook.open({
          type: 'error',
          content: error.message || error.messsage,
        });
        setTimeout(() => {
          messageApiBook.destroy()
        }, 7000);
      })
  }


const fetchbookData = async () => {
  await fetch(`${baseUrl.baseUrl}/books/GetBooksById/${ids}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  }).then((response) => {
        return response.json();
    })
    .then((response) => {
      if(response.success){
        setData(response?.data[0]);
        console.log("first",response?.data[0])
      }else{
         messageApi.open({
          type: 'error',
          content: response.message || response.messsage,
        });
        setTimeout(() => {
          messageApi.destroy()
        }, 7000);
      }
    })
    .catch((error) => {
      messageApi.open({
        type: 'error',
        content: error.message || error.messsage,
      });
      setTimeout(() => {
        messageApi.destroy()
      }, 7000);
    });
};

  useEffect(() => {
    fetchbookPDF()
    fetchbookData();
  }, []);

  // Add your PDF pages here as JSX elements
  // For example, you can render images for each page


  return (
    <>
    {contextHolder}
    {contextHolderBook}
      <div className="bookContent">
        <div className='bookSumm'>
          <div className='bookdata'>
            <h5>Book Summary</h5>
            <ul>
              <li>{data?.title.slice(0,12)}...</li>
              <li>{data?.description.slice(0,20)}...</li>
            </ul>
            <img className='imgs' src={baseUrl.baseUrl + "/" + data?.title_image?.split("/resources/static/assets/uploads/")[1]} alt={data?.title_image} />
          </div>
        </div>
        <div className='bookBox'>
            {pages.length > 0 ?
                // <div className="flip-book-container">
                  <PageFlip
                    width={400}
                    height={600}
                  >
                    {pages}
                  </PageFlip>
                // </div>
                : "PDF NOT AVAILABLE"
              }
        </div> 
      </div>


    </>
  );
}
