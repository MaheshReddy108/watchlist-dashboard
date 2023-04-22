import React, { useEffect } from "react";
import { Table, Input, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { observer } from "mobx-react-lite";
import "./WatchList.css";
import QuoteDetails from "./QuoteDetails";
import watchlistStore from "../store/WatchlistStore";

const Watchlist = observer(() => {
  // Wrap the component with observer
  const {
    symbols,
    inputValue,
    isRowClicked,
    selectedSymbol,
    symbolsInfo,
    fetchData,
    fetchSymbolsInfo,
    handleDelete,
    handleAdd,
    handleRowClick,
    handleUpdate
  } = watchlistStore; // Destructure the store's properties and methods

  useEffect(() => {
    fetchData();
    fetchSymbolsInfo();
  }, []);

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

  return (
    <div>
      <div className="watchlist-header">Watchlist Dashboard</div>
      <div className="watchlist-table-container">
        {isRowClicked ? (
          <div style={{ marginBottom: "20px" }}>
            <QuoteDetails selectedSymbol={selectedSymbol} />
          </div>
        ) : (
          <div style={{ marginBottom: "12px" }}>
            Please select a symbol from the watchlist.
          </div>
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
          onChange={e => (inputValue = e.target.value)}
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
      <p>Available Symbols: {symbolsInfo.join(", ")}</p>
    </div>
  );
});

export default Watchlist;
