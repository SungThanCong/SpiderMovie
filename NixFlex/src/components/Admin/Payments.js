import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axiosAuth from '../../utils/axiosAuth';
import { UserDetail } from './UserDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function AdminPayments(props)
{
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    const [columnDefs, setColumnDefs] = useState([
        {
          field: 'id',
          minWidth: 170,
          checkboxSelection: checkboxSelection,
          headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'time' , cellRenderer: dateTimeFormatter },
        { field: 'price' },
        { field: 'user.username', headerName: "User" },
        { field: 'movie.title', headerName: "Movie" },
      ]);
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
        axiosAuth.get("http://127.0.0.1:8000/api/manager/list_payment/")
        .then((resp) => {return resp.data})
        .then((data) => setRowData(data));
    }, []);

    const onRowClicked = (event) => {
        setSelectedProduct(event.data);
        console.log(event.data);
      };

    return(
            <main>
                <h1 className="title">Payment</h1>
                <ul className="breadcrumbs">
                    <li><a href="#">Home</a></li>
                    <li className="divider"></li>
                    <li><a href="#" className="active">Payment</a></li>
                </ul>
                <div className="info-data">
                    <div style={{minHeight: 600}}>
                        <div style={containerStyle}>
                        <div style={gridStyle} className="ag-theme-alpine">
                            <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            suppressRowClickSelection={true}
                            groupSelectsChildren={true}
                            rowSelection={'multiple'}
                            rowGroupPanelShow={'always'}
                            pivotPanelShow={'always'}
                            pagination={true}
                            onGridReady={onGridReady}
                            onRowClicked={onRowClicked}
                            ></AgGridReact>
                        </div>
                    </div>
                </div>
            </div>
                    

            </main>
    )
}
export default AdminPayments;
