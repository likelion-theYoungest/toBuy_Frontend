import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  //   background-color: #f5f0e4;
  -ms-overflow-style: none;
  overflow: hidden;

  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BodyWrapper = styled.div`
  flex: 1;
  overflow: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 60px;
`;

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 10px;
  align-items: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Back = styled.div`
  width: 30px;
  cursor: pointer;
`;

const Logo = styled.div`
  cursor: pointer;
`;

const Video = styled.div`
  cursor: pointer;
  width: 30px;
`;

const Body = styled.div`
  height: 752px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
`;
const ProductWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  padding-top: 2px;
  height: 78px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.25);
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 22px;
`;
const ProductImg = styled.div`
  margin-top: 2px;
`;
const ProductInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-left: 9px;
  width: 70%;
  margin-left: 12px;
`;
const ProductName = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 256px;
  // margin-right: auto;
  text-align: left;
`;
const PriceWrapper = styled.div`
color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-right: auto;    
    margin-top: 3px;
}`;
const Price = styled.span``;
const Won = styled.span``;
const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  padding: 0 18px;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const QuantityWrapper = styled.div`
  color: #60716f;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Whole = styled.span``;
const Quantity = styled.span``;
const Count = styled.span``;
const TotalPrice = styled.span``;

const TotalPrice2 = styled.span`
  margin-left: 160px;
`;

const PriceWrapper2 = styled.div`
color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;
}`;

const Gra = styled.div`
  position: relative;
  background: linear-gradient(to right, #e02d11, #05bba2);
  width: 100%;
  height: 2px;
  border: none; /* 선 없애기 */
`;
const HowHeader = styled.div`
  height: 70px;
  position: relative;
  margin-bottom: 1px;
`;
const HowHeaderContent = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  top: 21px;
  left: 29px;
`;
const MyCardWrapper = styled.div`
  position: absolute;
  top: 29.5px;
  right: 15px;
  color: #05bba2;
  font-size: 10px;
  font-weight: 300;
  display: flex;
  border-bottom: 1px solid #05bba2;
  height: 15px;
`;
const MyCard = styled.div``;
const MyCardImg = styled.div`
  display: inline;
  margin-left: 3px;
`;
const Content = styled.div`
  height: auto;
`;
const PayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 46px;
`;
const PayHeader = styled.div`
  margin-right: auto;
`;
const PayBtn = styled.div`
  display: inline;
`;

const CardinfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-left: 12px;
  margin-top: 14px;
`;
const NumWrapper = styled.div`
  text-align: left;
  width: auto;
  margin-right: auto;
  color: #000;
  font-size: 10px;
  font-style: normal;
  line-height: normal;
`;
const PwWrapper = styled.div`
  text-align: left;
  width: 100%;
  margin-right: auto;
  margin-top: 4px;
`;
const CVCWrapper = styled.div`
  text-align: left;
  margin-right: auto;
  display: inline-block;
  margin-top: 4px;
`;
const DateWrapper = styled.div`
  text-align: left;
  margin-right: auto;
  display: inline-block;
  margin-top: 4px;
`;
const Num = styled.span`
  font-weight: 500;
  text-align: left;
  display: inline-block;
`;
const Unum = styled.span`
  font-weight: 300;
  margin-left: 5px;
`;
const Pw = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  display: inline-block;
`;
const Upw = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 5px;
`;
const CVC = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  display: inline-block;
`;
const Ucvc = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 2px;
`;
const Date = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  display: inline-block;
`;
const Udate = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  position: relative;
  margin-left: 2px;
`;
const Stroke = styled.div`
  display: inline;
`;
const QuickPayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
  margin-top: 20px;
`;
const QuickPayHeader = styled.div`
  margin-right: auto;
  margin-left: 47px;
`;
const QuickPayBtn = styled.div``;
const QuickPayImg = styled.div`
  display: flex;
  width: 266px;
  height: 156px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  margin-top: 16px;
  flex-direction: column;
`;
const Cardinfo = styled.div`
  color: #000;
  font-size: 9.452px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-right: auto;
  margin-bottom: 11px;
`;
const CoachMark = styled.div`
  position: fixed;
  bottom: 80px;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }
`;
const BottomBar = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
  position: fixed;
  bottom: 0;
  background: white;
  width: 100%;
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }
`;

const Menu = styled.div`
  width: 30px;
  cursor: pointer;
`;

const Search = styled.div`
  width: 30px;
  cursor: pointer;
`;

const Home = styled.div`
  width: 30px;
  cursor: pointer;
`;

const My = styled.div`
  width: 30px;
  cursor: pointer;
`;
const None = styled.div``;

export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;
export const ExitBtn = styled(ModalBtn)`
  background-color: #e22d11;
  border-radius: 6px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  text-decoration: none;
  height: 40px;
  display: flex;
  width: 102px;
  padding: 9px 0px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  bottom: 22px;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: "dialog",
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 322px;
  height: 220px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  > div.desc {
    color: #000;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const Card = styled.div``;
const CardHeader = styled.div`
  height: 45px;
  position: relative;
  margin-bottom: 1px;
`;

const CardHeaderContent = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  top: 12px;
  left: 29px;
`;

const Uname = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 125px;
  text-align: left;
  display: inline;
`;
const CardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 87px;
  margin-left: 17px;
  margin-top: 14px;
  padding-bottom: 14px;
`;

const CardImg = styled.div``;

const MCardinfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-left: 16px;
`;
const CardBalanceWrapper = styled.div`
  text-align: left;
  width: 120px;
  margin-right: auto;
  display: inline-block;
`;
const Balance = styled.span`
  color: #60716f;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const UbalanceWrapper = styled.div`
  display: inline-block;
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 8px;
`;
const Ubalance = styled.span``;

const Submit = styled.button`
  width: 222px;
  height: 53px;
  padding: 10px;
  border-radius: 6px;
  background: #05bba2;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  color: white;
  margin-top: 10px;
`;

const Payment = () => {
  const UnumStyle = {
    width: "150px",
    height: "20px",
    display: "inline",
    marginLeft: "4px",
    borderRadius: "6px",
    border: "1px solid #60716F",
    boxSizing: "border-box",
    paddingLeft: "10px",
    paddingTop: "3px",
  };
  const UpwStyle = {
    width: "104px",
    height: "20px",
    display: "inline",
    marginLeft: "4px",
    borderRadius: "6px",
    border: "1px solid #60716F",
    boxSizing: "border-box",
  };
  const UcvcStyle = {
    width: "104px",
    height: "20px",
    display: "inline",
    marginLeft: "10px",
    borderRadius: "6px",
    border: "1px solid #60716F",
    boxSizing: "border-box",
  };
  const UdateStyle = {
    width: "45px",
    height: "20px",
    display: "inline",
    marginLeft: "14px",
    borderRadius: "6px",
    border: "1px solid #60716F",
    textAlign: "center",
    boxSizing: "border-box",
  };
  const stroke = {
    position: "absolute",
    top: "-5px",
    left: "62px",
  };
  const NoneStyle = {
    color: "#E22D11",
    fontFamily: "S-Core Dream",
    fontSize: "8px",
    fontWeight: "300",
    textAlign: "left",
    marginTop: "5px",
    marginLeft: "10px",
  };

  const navigate = useNavigate();
  const navigateToBack = () => {
    window.history.back();
  };
  const [inputStatus, setInputStatus] = useState("");

  const handleClickRadioButton = (radioBtnName) => {
    setInputStatus(radioBtnName);
  };

  const filterStyle = {
    filter:
      "invert(56%) sepia(93%) saturate(2412%) hue-rotate(133deg) brightness(95%) contrast(96%)",
  };
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  const openModalHandler1 = () => {
    setIsModal1Open(!isModal1Open);
  };

  const openModalHandler2 = () => {
    console.log("간편등록창 엽니다");
    setIsModal2Open(!isModal2Open);
  };

  const goMenu = () => {
    navigate("/Category");
  };
  const goSearch = () => {
    navigate("/Main");
  };
  const goMain = () => {
    navigate("/Main");
  };
  const goMyPage = () => {
    navigate("/MypageMain");
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productName = queryParams.get("productName");
  const unitPrice = queryParams.get("unitPrice");
  const quantity = queryParams.get("quantity");
  const imagePath = queryParams.get("imagePath");

  // 총 가격 계산
  const totalPrice = unitPrice * quantity;

  const pay = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("productName", productName);
    queryParams.append("unitPrice", unitPrice);
    queryParams.append("quantity", quantity);
    queryParams.append("imagePath", imagePath);

    // URL 쿼리 파라미터로 데이터를 전달하면서 페이지 이동
    navigate(`/Complete?${queryParams.toString()}`);
  };

  const [card, setCard] = useState({
    num: "",
    pw: "",
    cvc: "",
    validDate: "",
    balance: "",
  });
  const [register, setRegister] = useState("");
  useEffect(function () {
    axios
      .get("http://127.0.0.1:8000/cards/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`, // 토큰을 헤더에 추가
        },
      })
      .then(function (result) {
        setCard(result.data[0]);
        console.log("카드 상세정보 입니다", result);
        IsRegister();
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });
  }, []);

  const [showCard, setShowCard] = useState("false");
  const IsRegister = async (e) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/purchase/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`, // 토큰을 헤더에 추가
        },
      });
      const registerValue = response.data[0].register;
      setRegister(registerValue);
      console.log("register 값:", registerValue);
      if (registerValue) {
        setShowCard(true);
      }
      setShowCard(true);
      if (!registerValue) {
        setShowCard(false);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (inputStatus === "paybtn") {
      PaymentonClick();
    } else if (inputStatus === "quickpaybtn") {
      QuickPaymentonClick();
    }
  };

  const [email, setEmail] = useState("");
  const [count, setCount] = useState(""); // 여기서 count는 변수로 제공되어야 합니다.
  const [product, setProduct] = useState("");
  const [cvc, setCVC] = useState("");
  const [num, setNum] = useState("");
  const [validDate, setValidDate] = useState("");
  const [pw, setPw] = useState("");

  const [divs1, setDivs1] = useState([]);
  const [failDivAdded1, setFailDivAdded1] = useState(false);

  const [divs2, setDivs2] = useState([]);
  const [failDivAdded2, setFailDivAdded2] = useState(false);
  const PaymentonClick = () => {
    console.log("일반결제 된당");
    const userData = {
      purchase_type: "type1",
      cvc: cvc,
      num: num,
      validDate: validDate,
      pw: pw,
      count: "1",
      product: "clo1",
    };

    axios
      .post("http://127.0.0.1:8000/purchase/", userData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`, // 토큰을 헤더에 추가
        },
      })
      .then((response) => {
        console.log("결제 성공:", response.id);
        // navigate("/ProductDetail");
      })

      .catch((error) => {
        console.error("결제 실패:", error);

        if (!failDivAdded1) {
          const newFailDiv = (
            <div key={divs1.length} className="failDiv" style={NoneStyle}>
              카드정보가 존재하지 않습니다.
            </div>
          );
          setDivs1([...divs1, newFailDiv]);
          setFailDivAdded1(true);
        }
      });
  };

  const QuickPaymentonClick = () => {
    console.log("간편결제 된당");
  };
  const QuickPaymentRegister = () => {
    console.log("간편결제 등록창 떠요");
    const userData = {
      purchase_type: "type2",
      cvc: cvc,
      num: num,
      validDate: validDate,
      pw: pw,
      count: "1",
      product: "clo1",
      input_register: "yes",
    };

    axios
      .post("http://127.0.0.1:8000/purchase/", userData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`, // 토큰을 헤더에 추가
        },
      })
      .then((response) => {
        console.log("간편결제 등록 성공:", response.data);
        IsRegister();
        // navigate("/ProductDetail");
      })

      .catch((error) => {
        console.error("결제 실패:", error);
        console.log("userData:", userData);

        if (!failDivAdded2) {
          const newFailDiv = (
            <div key={divs2.length} className="failDiv" style={NoneStyle}>
              카드정보가 존재하지 않습니다.
            </div>
          );
          setDivs2([...divs2, newFailDiv]);
          setFailDivAdded2(true);
        }
      });
  };

  return (
    <Container>
      <BodyWrapper>
        <Topbar>
          <Back onClick={navigateToBack}>
            <img
              src={`${process.env.PUBLIC_URL}/images/left.png`}
              alt="back"
              width="12px"
            />
          </Back>
          <Logo>
            <img
              src={`${process.env.PUBLIC_URL}/images/로고3.png`}
              alt="logo"
              width="90px"
            />
          </Logo>
          <Video>
            <img
              src={`${process.env.PUBLIC_URL}/images/carousel-video.png`}
              width="30px"
              alt="video"
            />
          </Video>
        </Topbar>

        <Body>
          <ProductWrapper>
            <ProductImg>
              <img
                src={`http://127.0.0.1:8000${imagePath}`}
                alt={productName}
                width="70px"
              ></img>
            </ProductImg>
            <ProductInfoWrapper>
              <ProductName>{productName}</ProductName>
              <PriceWrapper>
                <Price>{unitPrice}</Price>
                <Won> 원</Won>
              </PriceWrapper>
            </ProductInfoWrapper>
          </ProductWrapper>

          <TotalWrapper>
            <QuantityWrapper>
              <Whole>총 </Whole>
              <Quantity>{quantity}</Quantity>
              <Count> 개</Count>
            </QuantityWrapper>
            <PriceWrapper2>
              <Whole>총 </Whole>
              <TotalPrice>{totalPrice}</TotalPrice>
              <Won> 원</Won>
            </PriceWrapper2>
          </TotalWrapper>
          <Gra></Gra>
          <HowHeader>
            <HowHeaderContent>결제수단</HowHeaderContent>
            <MyCardWrapper onClick={openModalHandler1}>
              <MyCard>내 카드 정보 확인하기</MyCard>
              <MyCardImg>
                <img
                  src={`${process.env.PUBLIC_URL}/images/charge.png`}
                  width="16px"
                  height="16px"
                  style={filterStyle}
                ></img>
              </MyCardImg>
            </MyCardWrapper>
            {isModal1Open ? (
              <ModalBackdrop onClick={openModalHandler1}>
                <ModalView onClick={(e) => e.stopPropagation()}>
                  <div className="desc">
                    <Card>
                      <CardHeader>
                        <CardHeaderContent>카드 정보 확인</CardHeaderContent>
                      </CardHeader>
                      <Gra></Gra>
                      <CardWrapper>
                        <CardImg>
                          <img
                            src={`${process.env.PUBLIC_URL}/images/card.png`}
                            width="110px"
                            height="65px"
                          />
                        </CardImg>
                        <MCardinfoWrapper>
                          <NumWrapper>
                            <Num>카드번호</Num>
                            <Unum>{card.num}</Unum>
                          </NumWrapper>
                          <PwWrapper>
                            <Pw>비밀번호</Pw>
                            <Upw>{card.pw}</Upw>
                          </PwWrapper>
                          <CVCWrapper>
                            <CVC>CVC</CVC>
                            <Ucvc>{card.cvc}</Ucvc>
                          </CVCWrapper>
                          <DateWrapper>
                            <Date>유효기간 년/월</Date>
                            <Udate>{card.validDate}</Udate>
                          </DateWrapper>
                          <CardBalanceWrapper>
                            <Balance>카드 잔액</Balance>
                            <UbalanceWrapper>
                              <Ubalance>
                                {card.balance.toLocaleString()}
                              </Ubalance>
                              <Won>원</Won>
                            </UbalanceWrapper>
                          </CardBalanceWrapper>
                        </MCardinfoWrapper>
                      </CardWrapper>
                    </Card>
                  </div>
                  <ExitBtn onClick={openModalHandler1}>확인</ExitBtn>
                </ModalView>
              </ModalBackdrop>
            ) : null}
          </HowHeader>
          <form>
            <Content>
              <PayWrapper>
                <PayHeader>
                  <PayBtn>
                    <input
                      type="radio"
                      id="paybtn"
                      name="paymentMethod"
                      checked={inputStatus === "paybtn"}
                      onChange={() => handleClickRadioButton("paybtn")}
                    />
                  </PayBtn>
                  <label htmlFor="paybtn">일반 카드결제</label>
                </PayHeader>
                {inputStatus === "paybtn" && (
                  <>
                    <CardinfoWrapper>
                      <NumWrapper>
                        <Num>카드번호</Num>
                        <Unum>
                          <input
                            id="num"
                            value={num}
                            onChange={(e) => setNum(e.target.value)}
                            style={UnumStyle}
                          />
                        </Unum>
                      </NumWrapper>
                      <PwWrapper>
                        <Pw>카드 비밀번호</Pw>
                        <input
                          style={UpwStyle}
                          maxLength={4}
                          id="pw"
                          value={pw}
                          onChange={(e) => setPw(e.target.value)}
                        />
                      </PwWrapper>
                      <CVCWrapper>
                        <CVC>CVC</CVC>
                        <input
                          style={UcvcStyle}
                          maxLength={3}
                          id="cvc"
                          value={cvc}
                          onChange={(e) => setCVC(e.target.value)}
                        />
                      </CVCWrapper>
                      <DateWrapper>
                        <Date>유효기간</Date>
                        <Udate>
                          <input
                            style={UdateStyle}
                            maxLength={2}
                            placeholder="MM"
                            id="validDate"
                            value={validDate}
                            onChange={(e) => setValidDate(e.target.value)}
                          />
                          <Stroke>
                            <img
                              src={`${process.env.PUBLIC_URL}/images/stroke.png`}
                              width="9px"
                              height="21.5px"
                              style={stroke}
                            ></img>
                          </Stroke>
                          <input
                            style={UdateStyle}
                            maxLength={2}
                            placeholder="YY"
                          />
                        </Udate>
                      </DateWrapper>
                    </CardinfoWrapper>
                    {/* <None style={NoneStyle}>카드정보가 존재하지 않습니다.</None> */}
                    {divs1}
                  </>
                )}
              </PayWrapper>
              <QuickPayWrapper>
                <QuickPayHeader>
                  <PayBtn>
                    <input
                      type="radio"
                      id="quickpaybtn"
                      name="paymentMethod"
                      checked={inputStatus === "quickpaybtn"}
                      onChange={() => handleClickRadioButton("quickpaybtn")}
                    />
                  </PayBtn>
                  <label htmlFor="quickpaybtn">간편 카드결제</label>
                </QuickPayHeader>
                {inputStatus === "quickpaybtn" && (
                  <>
                    <QuickPayImg onClick={openModalHandler2}>
                      {!showCard && (
                        <img
                          src={`${process.env.PUBLIC_URL}/images/plus2.png`}
                          width="22px"
                          height="22px"
                        ></img>
                      )}
                      {showCard && (
                        <Card>
                          <Cardinfo>등록된 카드</Cardinfo>

                          <img
                            src={`${process.env.PUBLIC_URL}/images/card.png`}
                            width="174px"
                            height="103px"
                          ></img>
                        </Card>
                      )}
                    </QuickPayImg>
                    {isModal2Open ? (
                      <ModalBackdrop onClick={openModalHandler2}>
                        <ModalView onClick={(e) => e.stopPropagation()}>
                          <div className="desc">
                            <CardHeader>
                              <CardHeaderContent>카드 등록</CardHeaderContent>
                            </CardHeader>
                            <Gra></Gra>
                            <CardinfoWrapper>
                              <NumWrapper>
                                <Num>카드번호</Num>
                                <Unum>
                                  <input
                                    id="num"
                                    value={num}
                                    onChange={(e) => setNum(e.target.value)}
                                    style={UnumStyle}
                                  />
                                </Unum>
                              </NumWrapper>
                              <PwWrapper>
                                <Pw>카드 비밀번호</Pw>
                                <input
                                  style={UpwStyle}
                                  maxLength={4}
                                  id="pw"
                                  value={pw}
                                  onChange={(e) => setPw(e.target.value)}
                                />
                              </PwWrapper>
                              <CVCWrapper>
                                <CVC>CVC</CVC>
                                <input
                                  style={UcvcStyle}
                                  maxLength={3}
                                  id="cvc"
                                  value={cvc}
                                  onChange={(e) => setCVC(e.target.value)}
                                />
                              </CVCWrapper>
                              <DateWrapper>
                                <Date>유효기간</Date>
                                <Udate>
                                  <input
                                    style={UdateStyle}
                                    maxLength={2}
                                    placeholder="MM"
                                    id="validDate"
                                    value={validDate}
                                    onChange={(e) =>
                                      setValidDate(e.target.value)
                                    }
                                  />
                                  <Stroke>
                                    <img
                                      src={`${process.env.PUBLIC_URL}/images/stroke.png`}
                                      width="9px"
                                      height="21.5px"
                                      style={stroke}
                                    ></img>
                                  </Stroke>
                                  <input
                                    style={UdateStyle}
                                    maxLength={2}
                                    placeholder="YY"
                                  />
                                </Udate>
                              </DateWrapper>
                            </CardinfoWrapper>
                            {divs2}
                          </div>
                          <ExitBtn
                            onClick={() => {
                              QuickPaymentRegister();
                              openModalHandler2();
                            }}
                          >
                            확인
                          </ExitBtn>
                        </ModalView>
                      </ModalBackdrop>
                    ) : null}
                  </>
                )}
              </QuickPayWrapper>
            </Content>
            <Gra></Gra>
            <TotalWrapper>
              <Whole>총 결제금액</Whole>
              <PriceWrapper>
                <TotalPrice2>{totalPrice}</TotalPrice2>
                <Won> 원</Won>
              </PriceWrapper>
            </TotalWrapper>
            {/* <Submit onClick={pay}>결제하기</Submit> */}
          </form>
          <CoachMark>
            <img
              src={`${process.env.PUBLIC_URL}/images/coachmark.png`}
              width="48px"
            />
          </CoachMark>
        </Body>

        <BottomBar>
          <Menu onClick={goMenu}>
            <img
              src={`${process.env.PUBLIC_URL}/images/menu.png`}
              width="26px"
            />
          </Menu>
          <Search onClick={goSearch}>
            <img
              src={`${process.env.PUBLIC_URL}/images/search.png`}
              width="26px"
            />
          </Search>
          <Home onClick={goMain}>
            <img
              src={`${process.env.PUBLIC_URL}/images/home.png`}
              width="26px"
            />
          </Home>
          <My onClick={goMyPage}>
            <img src={`${process.env.PUBLIC_URL}/images/me.png`} width="26px" />
          </My>
        </BottomBar>
      </BodyWrapper>
    </Container>
  );
};

export default Payment;
