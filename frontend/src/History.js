import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const serverAdd = process.env.REACT_APP_SERVER_ADD;

  useEffect(() => {
    axios.get(`${serverAdd}/history`).then((res) => {
      console.log(res.data);
      setHistoryData(res.data);
    });
  }, []);

  return (
    // <div>
    //   {historyData.map((final) => (
    //     <code>{final.c1}</code>
    //   ))}
    // </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Currency 1</th>
          <th>Currency 2</th>
          <th>Time of comparison</th>
        </tr>
      </thead>
      <tbody>
        {historyData.map((final) => (
          <tr>
            <td>{final._id}</td>
            <td>{final.c1}</td>
            <td>{final.c2}</td>
            <td>{final.time}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default History;
