import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axiosAuth from '../../utils/axiosAuth';
import { UserDetail } from './UserDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommentDetail } from './CommentDetail';



var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};
const dateTimeFormatter = (params) => {
  const date = new Date(params.value);
  const formattedDateTime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return formattedDateTime;
};

function AdminComment(props)
{
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [annoucement, setAnnoucement] = useState(null);

    const [columnDefs, setColumnDefs] = useState([
      {
        field: 'post_time',
        headerName: "Time",
        minWidth: 170,
        checkboxSelection: checkboxSelection,
        headerCheckboxSelection: headerCheckboxSelection,
        cellRenderer: dateTimeFormatter,
      },
      { field: 'user.username', headerName: 'Username' },
      { field: 'movie.title', headerName: 'Movie' },
      { field: 'content' },
    
    ]);

    const onRowClicked = (event) => {
      setSelectedProduct(event.data);
      console.log(event.data);
    };
    const handleClose = () => {
      setSelectedProduct(null);
    };
    useEffect(() => {
      if(annoucement != null){
        if(annoucement.status === "success"){
          toast.success(annoucement.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            });
            axiosAuth.get("http://127.0.0.1:8000/api/manager/list_comment/")
            .then((resp) => {return resp.data})
            .then((data) => setRowData(data));
        }else
        toast.error(annoucement.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      

    }, [annoucement])

    // const autoGroupColumnDef = useMemo(() => {
    //   return {
    //     headerName: 'Group',
    //     minWidth: 170,
    //     field: 'athlete',
    //     valueGetter: (params) => {
    //       if (params.node.group) {
    //         return params.node.key;
    //       } else {
    //         return params.data[params.colDef.field];
    //       }
    //     },
    //     headerCheckboxSelection: true,
    //     cellRenderer: 'agGroupCellRenderer',
    //     cellRendererParams: {
    //       checkbox: true,
    //     },
    //   };
    // }, []);
    const defaultColDef = useMemo(() => {
      return {
        editable: false,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      };
    }, []);
  
    const onGridReady = useCallback((params) => {
   
      axiosAuth.get("http://127.0.0.1:8000/api/manager/list_comment/")
      .then((resp) => {return resp.data})
      .then((data) => setRowData(data));
    }, []);

    const onSelectionChanged = (event) => {
       setSelectedRows(event.api.getSelectedRows());
      
    }
    
    const handleDeleteComments = async () => {
      console.log('Selected rows:', selectedRows);
      if(window.confirm("Do you sure delete these comments of users?") === true){
        if(selectedRows.length > 0){
          await selectedRows.forEach((element)=> {
              axiosAuth.post(`http://127.0.0.1:8000/api/manager/delete_comment/${element.id}`)
              .then(response => {
                if(response.status === 200){
                  setAnnoucement({status: "success", message: `Delete comment with id ${element.id} successfully`});
                  
                }
                else{
                  setAnnoucement({status: "error", message: `Delete comment with id ${element.id} failed`});

                }

              })
          });
          axiosAuth.get("http://127.0.0.1:8000/api/manager/list_comment/")
          .then((resp) => {return resp.data})
          .then((data) => setRowData(data));
        }
      }
    }

    
    return(
        <main>
            <h1 className="title">Comment</h1>
            <div className='d-flex justify-content-between'>
              <ul className="breadcrumbs">
                  <li><a href="#">Home</a></li>
                  <li className="divider"></li>
                  <li><a href="#" className="active">Comment</a></li>
              </ul>
              {
                selectedRows.length > 0 ? <div className='btn btn-danger' onClick={handleDeleteComments}>
                        Delete
                      </div> : <div className='btn btn-danger opacity-50'>
                        Delete
                      </div>
              }
              
            </div>
          
            <div className="info-data">
                <div style={{minHeight: 600}}>
                <div style={containerStyle}>
                    <div style={gridStyle} className="ag-theme-alpine">
                        <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        // autoGroupColumnDef={autoGroupColumnDef}
                        defaultColDef={defaultColDef}
                        suppressRowClickSelection={true}
                        groupSelectsChildren={true}
                        rowSelection={'multiple'}
                        rowGroupPanelShow={'always'}
                        pivotPanelShow={'always'}
                        pagination={true}
                        onGridReady={onGridReady}
                        onRowDoubleClicked ={onRowClicked}
                        onSelectionChanged={onSelectionChanged}
                        ></AgGridReact>
                    </div>
                    </div>
                </div>
            </div>
            {selectedProduct && (
                <CommentDetail data={selectedProduct} setSelectedProduct={setSelectedProduct} setAnnoucement={setAnnoucement}/>
              )}
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                {/* Same as */}
            <ToastContainer />
            </main>
    )
}
export default AdminComment;
