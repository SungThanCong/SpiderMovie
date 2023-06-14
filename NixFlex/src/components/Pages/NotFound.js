import { useEffect } from "react";
import React from "react";
import styled from "styled-components";

const NotFound = (props) => {
    useEffect(() => {
        props.onShowNavbar(false);
        props.onShowFooter(false);

      }, []);

    return (
        <MainStyle>
            <div id="main">
                <div className="fof">
                        <h1>Error 404</h1>
                </div>
            </div>
        </MainStyle>
        
    );

};
const MainStyle = styled.div`
*{
    transition: all 0.6s;
}

html {
    height: 100%;
}

body{
    font-family: 'Lato', sans-serif;
    color: #888;
    margin: 0;
}

#main{
    display: table;
    width: 100%;
    height: 100vh;
    text-align: center;
    .fof{
	  display: table-cell;
	  vertical-align: middle;
    }

    .fof h1{
        font-size: 50px;
        display: inline-block;
        padding-right: 12px;
        animation: type .5s alternate infinite;
    }

    @keyframes type{
        from{box-shadow: inset -3px 0px 0px #888;}
        to{box-shadow: inset -3px 0px 0px transparent;}
    } 
}`




export default NotFound;