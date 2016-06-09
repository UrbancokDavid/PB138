const tools = require('../tools');
const _ = require("chai");

describe("is_event_in_range", function() {
  it("--S-+++++++-E--", function() {
    _.assert.isTrue(tools.is_event_in_range(1, 4, 2, 3));
  });
  it("--S-++++E+++---", function() {
    _.assert.isTrue(tools.is_event_in_range(1, 3, 2, 4));
  });
  it("---++S+++++-E--", function() {
    _.assert.isTrue(tools.is_event_in_range(2, 4, 1, 3));
  });
  it("---+S+++++E+---", function() {
    _.assert.isTrue(tools.is_event_in_range(2, 3, 1, 4));
  });
  it("---S+++++++-E--", function() {
    _.assert.isTrue(tools.is_event_in_range(1, 4, 1, 3));
  });
  it("--S-+++++++E---", function() {
    _.assert.isTrue(tools.is_event_in_range(1, 3, 2, 3));
  });
  it("--S-++++E+++---", function() {
    _.assert.isTrue(tools.is_event_in_range(1, 3, 2, 4));
  });
  it("---++S+++++-E--", function() {
    _.assert.isTrue(tools.is_event_in_range(2, 4, 1, 3));
  });
  it("---+S+++++E+---", function() {
    _.assert.isTrue(tools.is_event_in_range(2, 3, 1, 4));
  });
  it("S--E-+++++++---", function() {
    _.assert.isFalse(tools.is_event_in_range(1, 2, 3, 4));
  });
  it("S---E+++++++---", function() {
    _.assert.isTrue(tools.is_event_in_range(1, 2, 2, 4));
  });
  it("---+++++++-S-E-", function() {
    _.assert.isFalse(tools.is_event_in_range(3, 4, 1, 2));
  });
  it("---+++++++S--E-", function() {
    _.assert.isTrue(tools.is_event_in_range(2, 3, 1, 2));
  });
});


describe("get_event_instances_in_dates", () => {
  it("plain_event", () => {
    var event = {
      id: "1",
      start_date: 2,
      end_date: 3
    };
    _.assert.deepEqual(
      [{
        id: "1",
        start_date: 2,
        end_date: 3
      }],
      tools.get_event_instances_in_dates(event, 1, 4)
    )
  });
  it("all_day_event", () => {
    _.assert.fail();
  });
});
