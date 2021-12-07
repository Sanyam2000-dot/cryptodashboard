import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { Bar, Line, Radar } from "react-chartjs-2";
import axios from "axios";
import NavbarComp from "./components/NavbarComp";
import Chart from "chart.js/auto";

const DashBoard = () => {
  // for storing selected symbol value
  const [currency1, setCurrency1] = useState("BTC");
  const [currency2, setCurrency2] = useState("ETH");

  // for storing the value of crypto we are comparing
  const [graphState, setGraphState] = useState([]);

  const [forUSD, setForUSD] = useState([]);
  const [forEUR, setForEUR] = useState([]);

  // for storing symbol data
  const [data, setData] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;
  const serverAdd = process.env.REACT_APP_SERVER_ADD;

  // api for mapping all the symbols
  const symbolAPI = `https://min-api.cryptocompare.com/data/blockchain/list?api_key=${apiKey}`;

  // api for getting multiple symbol comparision
  const compareAPI = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${currency1},${currency2}&tsyms=USD,EUR&api_key=${apiKey}`;

  const stateForBar = {
    labels: graphState,
    datasets: [
      {
        label: "USD",
        backgroundColor: "rgba(255,69,0,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: forUSD,
      },
      {
        label: "EUR",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: forEUR,
      },
    ],
  };

  const stateForLine = {
    labels: graphState,
    datasets: [
      {
        label: "USD",
        data: forUSD,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "EUR",
        data: forEUR,
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  const stateForRadar = {
    labels: graphState,
    datasets: [
      {
        label: "USD",
        backgroundColor: "rgba(220,220,220,0.2)",
        pointBackgroundColor: "rgba(220,220,220,1)",
        data: forUSD,
      },
      {
        label: "EUR",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        data: forEUR,
      },
    ],
  };
  // setting the state for symbol
  const changeHandlerSymbol1 = (e) => {
    // console.log(e.target.value);
    setCurrency1(e.target.value, console.log(currency1));
  };

  // setting the state for symbol
  const changeHandlerSymbol2 = (e) => {
    console.log(currency2);
    setCurrency2(e.target.value);
  };

  // calling api for getting all the symbols
  const getOptions = async () => {
    const res = await axios.get(symbolAPI);
    const data = res.data;
    const arraydata = Object.keys(data.Data);

    setData(arraydata);
  };
  // calling api for getting the comaprision

  const getComparsionData = async () => {
    const result = await axios.get(compareAPI);
    const saveRes = axios
      .post(`${serverAdd}/history`, {
        c1: currency1,
        c2: currency2,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    const finalData = result.data;
    // getting the currencies to compare in array
    const finalArray = Object.keys(finalData);

    // setting the state for bargraph
    setGraphState(finalArray);
    const innerArray = Object.values(finalData);

    // storing the value in USD and EUR in separate arrays
    let forUSDarr = [];
    innerArray.map((value) => {
      forUSDarr.push(value.USD);
      setForUSD(forUSDarr);
    });

    let forEURarr = [];
    innerArray.map((value) => {
      forEURarr.push(value.EUR);
      setForEUR(forEURarr);
    });
  };

  // component did mount and avoid infinte loop with dependency array
  useEffect(
    () => {
      getOptions();
    },
    //  empty dependency array
    []
  );

  return (
    <div>
      <NavbarComp />

      <Container>
        <h1 className="p-3">Select the currencies to compare</h1>
        <Row>
          <Col>
            <Form.Select
              aria-label="Default select example"
              onChange={changeHandlerSymbol1}
              value={currency1}
            >
              {/* mapping symbol */}
              {data.map((value, key) => (
                <option key={key}>{value}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              aria-label="Default select example"
              onChange={changeHandlerSymbol2}
              value={currency2}
            >
              {/* mapping symbol */}
              {data.map((value, key) => (
                <option key={key}>{value}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Button
          variant="info"
          style={{ width: "200px", margin: "2rem" }}
          onClick={() => getComparsionData()}
        >
          Compare Now
        </Button>
        <Row>
          <Col>
            <h3 className="p-2">Bar Chart</h3>
            <Bar data={stateForBar} />
          </Col>
          <Col>
            <h3 className="p-2">Line Chart</h3>
            <Line data={stateForLine} />
          </Col>
          <Col>
            <h3 className="p-2">Radar Chart</h3>
            <Radar data={stateForRadar} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashBoard;
