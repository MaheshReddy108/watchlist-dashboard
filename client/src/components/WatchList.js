import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import "./WatchList.css";
import axios from "axios";
import Swal from "sweetalert2";
import QuoteDetails from "./QuoteDetails";

const Watchlist = () => {
  const [symbols, setSymbols] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isRowClicked, setIsRowClicked] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/watchlist/user1");
      setSymbols(response.data);
    } catch (error) {
      showSweetAlert(error.response.data.error);
    }
  };

  const handleDelete = async symbol => {
    try {
      await axios.delete("http://localhost:3001/watchlist/user1/remove", {
        data: {
          symbol
        }
      });
      fetchData();
    } catch (error) {
      showSweetAlert(error.response.data.error);
    }
  };

  const handleAdd = async () => {
    console.log("here 1");

    if (inputValue.trim() === "") {
      showSweetAlert("Enter a Valid Symbol");
      return;
    }
    try {
      await axios.post("http://localhost:3001/watchlist/user1/add", {
        symbol: inputValue.toUpperCase()
      });
      fetchData();
      setInputValue("");
    } catch (error) {
      showSweetAlert(error.response.data.error);
      setInputValue("");
    }
  };

  const handleRowClick = symbol => {
    setIsRowClicked(true);
    setSelectedSymbol(symbol);
  };

  const handleUpdate = symbol => {
    // Do something with the updated symbol data
  };

  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: text => <a onClick={() => handleRowClick(text)}>{text}</a>
    },
    {
      title: "Bid",
      dataIndex: "bid",
      key: "bid"
    },
    {
      title: "Ask",
      dataIndex: "ask",
      key: "ask"
    },
    {
      title: "Bid Size",
      dataIndex: "bidSize",
      key: "bidSize"
    },
    {
      title: "Ask Size",
      dataIndex: "askSize",
      key: "askSize"
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume"
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            style={{ backgroundColor: "#52c41a" }}
            onClick={() => handleUpdate(record.symbol)}
          >
            Update
          </Button>
          <Button type="text" onClick={() => handleDelete(record.symbol)}>
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ];

  const data = Object.keys(symbols).map(symbol => ({
    key: symbol,
    symbol,
    ...symbols[symbol]
  }));

  const showSweetAlert = message => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message
    });
  };
  return (
    <div>
      <div className="watchlist-header">Watchlist Dashboard</div>
      <div className="watchlist-table-container">
        {isRowClicked ? (
          <div style={{ marginBottom: "20px" }}>
            <QuoteDetails selectedSymbol={selectedSymbol} />
          </div>
        ) : (
          <div style={{ marginBottom: "12px" }}>Please select a symbol from the watchlist.</div>
        )}
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={record => ({ onClick: () => handleRowClick(record.symbol) })}
        />
      </div>
      <div className="watchlist-input-container">
        <div className="watchlist-input-label">Add Symbol to Watchlist:</div>
        <Input
          placeholder="Enter Symbol"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onPressEnter={handleAdd}
        />
        <Button
          type="primary"
          onClick={handleAdd}
          style={{ marginLeft: "10px" }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default Watchlist;
