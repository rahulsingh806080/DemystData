
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BalanceSheet from "./BalanceSheet"; // Adjust the import based on actual file structure

describe("BalanceSheet Component", () => {
  const mockDataWithReport = {
    Reports: [
      {
        ReportName: "Annual Balance Sheet",
        ReportTitles: ["2021", "2022"],
        Rows: [
          { Cells: [{ Value: "Heading 1" }, { Value: "Heading 2" }, { Value: "Heading 3" }] },
          {
            Title: "Assets",
            Rows: [
              {
                Title: "Cash",
                RowType: "Normal",
                Cells: [{ Value: "100" }, { Value: "200" }, { Value: "300" }],
              },
              {
                Title: "Summary",
                RowType: "SummaryRow",
                Cells: [{ Value: "Total" }, { Value: "600" }, { Value: "900" }],
              },
            ],
          },
        ],
      },
    ],
  };

  it("renders the component with a valid report", () => {
    render(<BalanceSheet data={mockDataWithReport} />);
    expect(screen.getByText("Report Name: Annual Balance Sheet")).toBeInTheDocument();
    expect(screen.getByText("2021 - 2022")).toBeInTheDocument();
    expect(screen.getByText("Heading 1")).toBeInTheDocument();
    expect(screen.getByText("Heading 2")).toBeInTheDocument();
    expect(screen.getByText("Heading 3")).toBeInTheDocument();
    expect(screen.getByText("Assets")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("300")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("600")).toBeInTheDocument();
    expect(screen.getByText("900")).toBeInTheDocument();
  });

  it("renders Report is not present when data is undefined", () => {
    render(<BalanceSheet data={undefined} />);
    expect(screen.getByText("Report is not present")).toBeInTheDocument();
  });

  it("renders Report is not present when no reports are present", () => {
    render(<BalanceSheet data={{}} />);
    expect(screen.getByText("Report is not present")).toBeInTheDocument();
  });

  it("renders message No values for empty Rows", () => {
    const dataWithEmptyRows = {
      Reports: [
        {
          ReportName: "Balance Sheet",
          ReportTitles: ["2021", "2022"],
          Rows: [
            { Cells: [{ Value: "Heading 1" }, { Value: "Heading 2" }, { Value: "Heading 3" }] },
            { Title: "Liabilities", Rows: [] },
          ],
        },
      ],
    };
    render(<BalanceSheet data={dataWithEmptyRows} />);
    expect(screen.getByText("Liabilities")).toBeInTheDocument();
    expect(screen.getByText("No values")).toBeInTheDocument();
  });

  it("renders rows with correct styles based on RowType", () => {
    render(<BalanceSheet data={mockDataWithReport} />);
    const normalCells = screen.getAllByText("100");
    const summaryCells = screen.getAllByText("Total");
    expect(normalCells[0]).toHaveStyle("font-weight: normal");
    expect(summaryCells[0]).toHaveStyle("font-weight: bold");
  });
});
