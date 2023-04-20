import React, { useState } from "react";
import symbolsData from "../data/symbols.json";
import { Table, Input, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import "./Watchlist.css";

const Watchlist = () => {
  const [symbols, setSymbols] = useState(Object.entries(symbolsData));
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleDelete = (symbol) => {
    setSymbols((prevSymbols) =>
      prevSymbols.filter((sym) => sym[0] !== symbol)
    );
  };

  const handleAdd = () => {
    if (inputValue.trim() === "") {
      setErrorMessage("Enter valid symbol");
      return;
    }
    setSymbols((prevSymbols) => [...prevSymbols, [inputValue.toUpperCase(), {}]]);
    setInputValue("");
    setErrorMessage("");
  };

  const handleUpdate = (symbol) => {
    // Do something with the updated symbol data
  };

  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Bid",
      dataIndex: "bid",
      key: "bid",
    },
    {
      title: "Ask",
      dataIndex: "ask",
      key: "ask",
    },
    {
      title: "Bid Size",
      dataIndex: "bidSize",
      key: "bidSize",
    },
    {
      title: "Ask Size",
      dataIndex: "askSize",
      key: "askSize",
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
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
      ),
    },
  ];

  const data = symbols.map(([symbol, data]) => ({
    key: symbol,
    symbol: symbol,
    bid: data.bid,
    ask: data.ask,
    bidSize: data.bidSize,
    askSize: data.askSize,
    volume: data.volume,
  }));

  return (
    <div>
      <div className="watchlist-header">Watchlist Dashboard</div>
      <div className="watchlist-table-container">
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </div>
      <div className="watchlist-input-container">
        <Input
          placeholder="Enter Symbol"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleAdd}
        />
        <Button type="primary" onClick={handleAdd}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default Watchlist;
