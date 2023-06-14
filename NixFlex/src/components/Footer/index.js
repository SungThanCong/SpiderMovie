import React from "react";
import mova from'../../assets/images/mova.png';
import android from'../../assets/images/android-app.webp';
import ios from'../../assets/images/ios-app.webp';
import styled from "styled-components";

function Footer(props) {
  
  return (
     <FooterContainer>
       <img src={mova} alt=""></img>
        <div className="footer">
           <div className="footer-mova">
          
           <div className="footer-mova-content">
                  <span>Galaxy Play là dịch vụ được cung cấp bởi Công ty Cổ Phần Galaxy Play, thành viên của Công ty Cổ Phần Giải Trí và Giáo Dục Galaxy (GEE.,JSC)</span>
                  <span>Địa chỉ: 59 Xa Lộ Hà Nội, Phường Thảo Điền, Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh, Việt Nam.</span>
                  <span>Mã số doanh nghiệp: 0106539659.</span>
                  <span>Ngày cấp mã số doanh nghiệp: 15/5/2014.</span>
                  <span>Nơi cấp: Sở kế hoạch và đầu tư thành phố Hà Nội.</span>
           </div>
           </div>
           <div className="footer-introduce">
            <h3>Giới thiệu</h3>
            <span>Quy chế sử dụng dịch vụ</span>
            <span>Chính sách bảo mật</span>
            <span>Khuyến mãi</span>
           </div>
           <div className="footer-support">
           <h3>Hỗ trợ</h3>
            <span>1800 9090 (24/7)</span>
            <span>play@galaxy.com.vn</span>
            <span>https://galaxyplay.vn/help</span>
           </div>
           <div className="footer-app">
           <h3>Tải ứng dụng</h3>
           <img src={android} alt=""></img>
           <img src={ios} alt=""></img>
           </div>

          </div> 
       
     </FooterContainer>

  );
}

export default React.memo(Footer);

const FooterContainer = styled.div`
  width: 100%;
  height: 100%;
  
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: var(--color-white);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.9) 40%,
    rgba(0, 0, 0, 0.99) 100%,
    transparent
  );
  padding: 2.5rem 0;
  img{
    width:128px;
    height:64px;
    margin-bottom: 1rem;
    margin-left:20px;
  }

  .footer{
    display:flex;
    flex-wrap:wrap;
    
  justify-content: center;

    .footer-mova{
      width:492px;
      flex-basis:33.3333%;
      padding:0px 12px;
      
      span{
        margin-bottom: 0.5rem;
        display: block;
        font-size: 1rem;
        color: #ffffff;
        
        font-style: initial;
      }
    }
    .footer-introduce{
      flex-basis:16.6667%;
      padding:0px 12px;
      
      h3{
        font-weight:700;
       margin:0px 0px 16px;
      }
      span{
        margin-bottom: 0.5rem;
        display: block;
        font-size: .875rem;
        color: #9ea0a8;
        
        font-style: initial;
      }
    }
    .footer-support{
      flex-basis:16.6667%;
      padding:0px 12px;

      h3{
        font-weight:700;
       margin:0px 0px 16px;
      }
      span{
        margin-bottom: 0.5rem;
        display: block;
        font-size: .875rem;
        color: #9ea0a8;
        
        font-style: initial;
      }
    }
    .footer-app{
      flex-basis:33.3333%;
       padding:0px 12px;
       h3{
        font-weight:700;
       margin:0px 0px 16px;
      }

       img{
        width:136px;
        height:40px;
        margin-right:8px;
       }
    }
  }
`;
