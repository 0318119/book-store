import React, { useEffect, useState } from 'react';
import Table from 'react-data-table-component';
import baseUrl from '../config.json';
import '../Components/assets/css/adminpanel.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Button, message, Space } from 'antd';


function AdminPanel() {
  const [isBookData, setBookData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageApiLoading, showloading] = message.useMessage();
  const [isBookTitle, setBookTitle] = useState(null)
  const [isBookDes, setBookDes] = useState(null)
  const [isBookImage, setBookImage] = useState('')
  const [isUpdateId, setUpdateId] = useState(null)
  const [isPDFFile,setPDFFile] = useState('')
  const [page, setPage] = useState(1)
  const [Isrows, setRows] = useState([]);


  const [isModal, setModal] = useState({
    addNewModal: false,
    deleteModal: false,
    uploadPdfModal: false
  })
  const [isLoading, setLoading] = useState({
    isFormLoading: false,
    dataLoad: false,
  })


  async function GET_BOOKS() {
    setLoading({
      dataLoad: true,
    })
    await fetch(`${baseUrl.baseUrl}/books/GetBooks/${page}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.success) {
          setLoading({
            dataLoad: false,
          })
          setBookData(response?.data);
          setRows(response?.totalRows)
        } else {
          setLoading({
            dataLoad: false,
          })
          messageApi.open({
            type: 'error',
            content: response?.message,
          });
        }
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: error?.message,
        });
      });
  }

  useEffect(() => {
    GET_BOOKS();
  }, [page]);

  useEffect(() => {
    if (isLoading.isFormLoading == true) {
      messageApiLoading.open({
        type: 'loading',
        content: 'Please wait...',
      });
    } else {
      messageApiLoading.destroy()
    }
  }, [isLoading]);

  const customStyles = {
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        borderTop: '1px solid #80808021',
        borderLeft: '1px solid #80808021',
        borderRight: '1px solid #80808021',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        borderBottom: '1px solid #80808021',
        borderLeft: '1px solid #80808021',
        borderRight: '1px solid #80808021',
      },
    },
  };

  const columns = [
    {
      name: 'R.No',
      selector: 'id',
      grow: 0,
      minWidth: '50px',
    },
    {
      name: 'Image',
      cell: (row) => (
        <div className='p-2'>
          {row?.title_image ? (
            <img
              width='50'
              style={{ borderRadius: '50px' }}
              height='50'
              src={baseUrl.baseUrl + '/' + row?.title_image?.split('/resources/static/assets/uploads/')[1]}
              alt=''
            />
          ) : (
            'Not Found'
          )}
        </div>
      ),
    },
    {
      name: 'name',
      selector: 'title',
    },
    {
      name: 'Description',
      selector: 'description',
    },
    {
      name: 'Upload PDF',
      cell: (row) => (
        <div className=''>
          <button className='updatebtn' onClick={() => { 
                setModal({uploadPdfModal: true})
                setUpdateId(row?.id)

           }}>
            <AiFillEdit />
          </button>
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className=''>
          <button className='updatebtn' onClick={() => { editDataModal(row?.id) }}>
            <AiFillEdit />
          </button>
          <button className='deletebtn' onClick={() => {
            setModal({ deleteModal: true })
            setUpdateId(row?.id)
          }}>
            <AiFillDelete />
          </button>
        </div>
      ),
    },
  ];

  const formData = new FormData();
  async function createBookImage(e) {
    e.preventDefault();
    setLoading({ isFormLoading: true });
    formData.append("title", isBookTitle);
    formData.append("description", isBookDes);
    if (isBookImage !== '') {
      formData.append("file", isBookImage);
    }
    try {
      await fetch(`${baseUrl.baseUrl}/books/bookTitleInsert`, {
        method: "POST",
        headers: { Accept: "form-data" },
        body: formData,
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.success) {
            messageApi.open({
              type: 'success',
              content: 'You have been submited.',
            });
            setLoading({ isFormLoading: false });
            setUpdateId(null)
            setBookTitle("")
            setBookDes("")
            setBookImage("")
            setTimeout(() => {
              setModal({ addNewModal: false });
              messageApi.destroy()
              GET_BOOKS();
            }, 3000);
          } else {
            messageApi.open({
              type: 'error',
              content: response?.message,
            });
            setLoading({ isFormLoading: false });
            setTimeout(() => {
              messageApi.destroy()
            }, 3000);
          }
        })
        .catch((error) => {
          messageApi.open({
            type: 'error',
            content: error?.message,
          });
          setLoading({ isFormLoading: false });
          setTimeout(() => {
            messageApi.destroy()
          }, 3000);
        });
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
      setLoading({ isFormLoading: false });
      setTimeout(() => {
        messageApi.destroy()
      }, 3000);
    }
  }

  async function updateBook(e) {
    e.preventDefault();
    setLoading({
      isFormLoading: true,
    });
    formData.append("title", isBookTitle);
    formData.append("description", isBookDes);
    formData.append("id", isUpdateId);
    if (isBookImage == "") {
      formData.append("file", isBookImage);
    }

    try {
      await fetch(`${baseUrl.baseUrl}/books/updateBookTitle`, {
        method: "POST",
        headers: { Accept: "form-data" },
        body: formData,
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.success) {
            messageApi.open({
              type: 'success',
              content: 'You have been Updated.',
            });
            setLoading({ isFormLoading: false });
            setTimeout(() => {
              setModal({ addNewModal: false });
              setUpdateId(null)
              setBookTitle("")
              setBookDes("")
              setBookImage("")
              GET_BOOKS();
            }, 3000);
          } else {
            setLoading({ isFormLoading: false });
            messageApi.open({
              type: 'error',
              content: response?.message,
            });
          }
        })
        .catch((error) => {
          setLoading({ isFormLoading: false });
          messageApi.open({
            type: 'error',
            content: error?.message,
          });
        });
    } catch (error) {
      setLoading({ isFormLoading: false });
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
    }
  }

  async function deletebook() {
    setLoading({ isFormLoading: true });
    try {
      await fetch(`${baseUrl.baseUrl}/books/DeleteBook`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          "id": isUpdateId
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.success) {
            messageApi.open({
              type: 'success',
              content: 'You have been Deleted.',
            });
            setLoading({ isFormLoading: false });
            setTimeout(() => {
              setModal({ addNewModal: false });
              setUpdateId(null)
              GET_BOOKS();
            }, 3000);
          } else {
            setLoading({ isFormLoading: false });
            messageApi.open({
              type: 'error',
              content: response?.message,
            });
          }
        })
        .catch((error) => {
          setLoading({ isFormLoading: false });
          messageApi.open({
            type: 'error',
            content: error?.message,
          });
        });
    } catch (error) {
      setLoading({ isFormLoading: false });
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
    }
  }

  const editDataModal = async (id) => {
    setModal({ addNewModal: true })
    try {
      await fetch(`${baseUrl.baseUrl}/books/GetBooksById/${id}`, {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.success) {
            setUpdateId(response?.data?.[0].id)
            setBookTitle(response?.data?.[0].title)
            setBookDes(response?.data?.[0].description)
            setBookImage(response?.data?.[0].title_image)
          } else {
            messageApi.open({
              type: 'error',
              content: response?.message,
            });
          }
        })
        .catch((error) => {
          messageApi.open({
            type: 'error',
            content: error?.message,
          });
        });
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
    }
  }

  const uploadPDfFile = async () => {
    setLoading({ isFormLoading: true });

    formData.append("book_id", isUpdateId);
    if (isBookImage == "") {
      formData.append("file", isPDFFile);
    }

    try {
      await fetch(`${baseUrl.baseUrl}/bookupload/bookInsert`, {
        method: "POST",
        headers: { Accept: "form-data" },
        body: formData,
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.success) {
            messageApi.open({
              type: 'success',
              content: 'You have Uploaded PDF file.',
            });
            setLoading({ isFormLoading: false });
            setTimeout(() => {
              setModal({ uploadPdfModal: false });
              setUpdateId(null)
              GET_BOOKS();
            }, 3000);
          } else {
            setLoading({ isFormLoading: false });
            messageApi.open({
              type: 'error',
              content: response?.message,
            });
          }
        })
        .catch((error) => {
          setLoading({ isFormLoading: false });
          messageApi.open({
            type: 'error',
            content: error?.message,
          });
        });
    } catch (error) {
      setLoading({ isFormLoading: false });
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
    }
  }

  const handlePageChange = page => {
      setPage(page)
  }
  return (
    <>

      {contextHolder}
      {showloading}

      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='mainbx'>
              <h5>Admin Panel</h5>
              {/* <div className="input-wrapper"> */}
              <button className='addnew' onClick={() => { setModal({ addNewModal: true }) }}>
                Add New
              </button>
              {/* <input className='searchbar'
                  placeholder="Type to search..."
                />
              </div> */}
              <Table
                columns={columns}
                data={isBookData}
                progressPending={isLoading?.dataLoad}
                highlightOnHover
                pagination
                paginationTotalRows={Isrows}
                paginationServer
                paginationComponentOptions={{
                  noRowsPerPage: true,
                }}
                customStyles={customStyles}
                onChangePage={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {isModal?.deleteModal && (
        <div className='modal'>
          <div className='modal-box'>
            <p>Are you sure you want to delete this item?</p>
            <button className='confirm-delete' disabled={isLoading.isFormLoading} onClick={deletebook}>
              Confirm Delete
            </button>
            <button className='cancel' onClick={() => {
              setModal({ addNewModal: false })
              setUpdateId(null)
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {isModal?.uploadPdfModal && (
        <div className='modal'>
          <div className='modal-box'>
             <button className='cancelbtn' onClick={() => {
                setModal({ uploadPdfModal: false })
                setUpdateId(null)
              }}>X</button>
            <h5 className='text-uppercase'>Upload a PDF file</h5>
            <div className="form-group">
              <label htmlFor="name">PDF :</label>
              <input type="file" className='form-control' required accept=".pdf" onChange={(e) => { setPDFFile(e.target.files[0]) }}/>
            </div>
            <button className='confirm-delete' disabled={isLoading.isFormLoading} onClick={uploadPDfFile}>
              Submit
            </button>
          </div>
        </div>
      )}
      {
        isModal.addNewModal ?
          <div className="addnewmodal">
            <div className="addnewmodal-box">
              <button className='cancelbtn' onClick={() => {
                setModal({ addNewModal: false })
                setUpdateId(null)
                setBookTitle(null)
                setBookDes(null)
                setBookImage(null)
              }}>X</button>
              <form onSubmit={isUpdateId !== null ? updateBook : createBookImage}>
                <div className="form-group">
                  <label htmlFor="name">Title</label>
                  <input type="text" required={isUpdateId == null ? true : false} name="name" value={isBookTitle} onChange={(e) => { setBookTitle(e.target.value) }} />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea id="description" required={isUpdateId == null ? true : false} name="description" defaultValue={isBookDes} onChange={(e) => { setBookDes(e.target.value) }} />
                </div>
                <div className="form-group">
                  <label htmlFor="image"></label>
                  <input type="file" id="image" required={isUpdateId == null ? true : false} name="image" onChange={(e) => { setBookImage(e.target.files[0]) }} />
                </div>
                <div className="form-actions">
                  {isUpdateId !== null ?
                    <button type="submit" disabled={isLoading.isFormLoading}>Update</button> :
                    <button type="submit" disabled={isLoading.isFormLoading}>Submit</button>
                  }
                </div>
              </form>
            </div>
          </div>
          : ""
      }
    </>
  );
}

export default AdminPanel;

