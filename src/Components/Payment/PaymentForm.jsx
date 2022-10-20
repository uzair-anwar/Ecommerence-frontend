import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount } from "../../app/features/cart/cartAction";
import { addCardInfo } from "../../app/features/cart/cartSlice";
import Cleave from "cleave.js/react";
import "../../StyleSheets/payment-style.css";

const imageUrls = [
  "https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png",
  "https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_rev_92px_2x.png",
  "https://www.discover.com/company/images/newsroom/media-downloads/discover.png",
  "https://s1.q4cdn.com/692158879/files/design/svg/american-express-logo.svg",
  "https://cdn4.iconfinder.com/data/icons/simple-peyment-methods/512/diners_club-512.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/1280px-JCB_logo.svg.png",
];

const PaymentForm = () => {
  const [creditCardNum, setCreditCardNum] = useState("#### #### #### ####");
  const [cardType, setCardType] = useState("");
  const [cardHolder, setCardHolder] = useState("Your Full Name");
  const [expireMonth, setExpireMonth] = useState("MM");
  const [expireYear, setExpireYear] = useState("YYYY");
  const [cvc, setCVC] = useState();
  const [cardTypeUrl, setCardTypeUrl] = useState(
    "https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png"
  );
  const dispatch = useDispatch();

  const HandleSubmit = async () => {
    try {
      dispatch(
        createAccount({
          number: creditCardNum,
          exp_month: expireMonth,
          exp_year: expireYear,
          cvc,
        })
      );
      const card = {
        number: creditCardNum,
        name: cardHolder,
        cardType,
        exp_month: expireMonth,
        exp_year: expireYear,
        cvc,
      };
      dispatch(addCardInfo(card));
    } catch (error) {
      console.log(error);
    }
  };

  const handleType = (type) => {
    setCardType(type);

    if (type === "visa") {
      setCardTypeUrl(imageUrls[0]);
    } else if (type === "mastercard") {
      setCardTypeUrl(imageUrls[1]);
    } else if (type === "discover") {
      setCardTypeUrl(imageUrls[2]);
    } else if (type === "amex") {
      setCardTypeUrl(imageUrls[3]);
    } else if (type === "diners") {
      setCardTypeUrl(imageUrls[4]);
    } else if (type === "jcb") {
      setCardTypeUrl(imageUrls[5]);
    }
  };

  return (
    <div className="main">
      <div id="form">
        <div id="card">
          <div className="header">
            <div className="sticker"></div>
            <div>
              <img className="logo" src={cardTypeUrl} alt="Card logo" />
            </div>
          </div>
          <div className="body">
            <h2 id="creditCardNumber">{creditCardNum}</h2>
          </div>
          <div className="footer">
            <div>
              <h5>Card Holder</h5>
              <h3>{cardHolder}</h3>
            </div>
            <div>
              <h5>Expires</h5>
              <h3>
                {expireMonth} / {expireYear}
              </h3>
            </div>
          </div>
        </div>

        <div className="input-container mt">
          <h4>Enter card number</h4>
          <Cleave
            delimiter="-"
            options={{
              creditCard: true,
              onCreditCardTypeChanged: handleType,
            }}
            onChange={(e) => setCreditCardNum(e.target.rawValue)}
            placeholder="Please enter your credit card number"
          />
        </div>

        <div className="input-container">
          <h4>Card Holder</h4>
          <input
            onChange={(e) => setCardHolder(e.target.value)}
            type="text"
            placeholder="Please enter your full name"
            required
          />
        </div>

        <div className="input-grp">
          <div className="input-container">
            <h4>Month</h4>
            <select
              value={expireMonth}
              onChange={(e) => setExpireMonth(e.target.value)}
            >
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div className="input-container">
            <h4>Expiration Year</h4>
            <select
              value={expireYear}
              onChange={(e) => setExpireYear(e.target.value)}
            >
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
          <div className="input-container">
            <h4>CVV</h4>
            <input
              type="password"
              placeholder="CVV"
              required
              onChange={(e) => setCVC(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={HandleSubmit}
        >{`Submit ${cardType} Information`}</button>
      </div>
    </div>
  );
};
export default PaymentForm;
