import React from "react";
const { shallow } = require("enzyme");
const { expect } = require("chai");
const sinon = require("sinon");
const Watchlist = require("../components/WatchList.js").default;

describe("<Watchlist />", () => {
  it("should render the correct header", () => {
    const wrapper = shallow(<Watchlist />);
    expect(wrapper.find(".watchlist-header").text()).to.equal("Watchlist Dashboard");
  });

  it("should call handleAdd when the 'Add' button is clicked", () => {
    const handleAddSpy = sinon.spy();
    const wrapper = shallow(<Watchlist handleAdd={handleAddSpy} />);
    wrapper.find(".watchlist-add-btn").simulate("click");
    expect(handleAddSpy.calledOnce).to.equal(true);
  });

  it("should update the input value when the input changes", () => {
    const wrapper = shallow(<Watchlist />);
    wrapper.find(".watchlist-input").simulate("change", { target: { value: "AAPL" } });
    expect(wrapper.find(".watchlist-input").prop("value")).to.equal("AAPL");
  });
});
