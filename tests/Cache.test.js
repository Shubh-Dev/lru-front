import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cache from "../src/Cache";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ key1: "value1", key2: "value2" }),
  })
);

describe("Cache component", () => {
  test("renders loading message and then cache data", async () => {
    render(<Cache />);
    expect(screen.getByText("Loading cache data...")).toBeInTheDocument();
    await screen.findByText("Key: key1, Value: value1");
    expect(screen.queryByText("Loading cache data...")).not.toBeInTheDocument();
    expect(screen.getByText("Key: key1, Value: value1")).toBeInTheDocument();
    expect(screen.getByText("Key: key2, Value: value2")).toBeInTheDocument();
  });

  test("displays selected cache item when clicked", async () => {
    render(<Cache />);
    await screen.findByText("Key: key1, Value: value1");
    const cacheItem = screen.getByText("Key: key1, Value: value1");
    userEvent.click(cacheItem);
    expect(screen.getByText("Selected Cache Item")).toBeInTheDocument();
    expect(screen.getByText("Key: key1, Value: value1")).toBeInTheDocument();
  });

  test('clears selected cache item when "Clear" button is clicked', async () => {
    render(<Cache />);
    await screen.findByText("Key: key1, Value: value1");
    const cacheItem = screen.getByText("Key: key1, Value: value1");
    userEvent.click(cacheItem);
    expect(screen.getByText("Selected Cache Item")).toBeInTheDocument();
    userEvent.click(screen.getByText("Clear"));
    expect(screen.getByText("No cache item selected")).toBeInTheDocument();
  });
});
