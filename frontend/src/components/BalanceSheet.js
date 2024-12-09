import React from "react";

// TableRow Component: Used for both regular and summary rows.
const TableRow = ({ row, depth }) => {
  const rowStyle = {
    paddingLeft: `${depth * 20}px`,
    fontWeight: row.RowType === "SummaryRow" ? "bold" : "normal",
    textAlign: "center",
  };

  return (
    <tr className="table-success">
      {row.Cells.map((cell, index) => (
        <td key={index} style={rowStyle}>
          {cell.Value}
        </td>
      ))}
    </tr>
  );
};

// TableSection Component: Used to render a section of the balance sheet.
const TableSection = ({ section }) => (
  <>
    {section.Title && (
      <tr>
        <th colSpan={3} className="section-title">
          {section.Title}
        </th>
      </tr>
    )}
    {section.Rows.length > 0 ? (
      section.Rows.map((row) => <TableRow key={row.Title || row.Cells[0].Value} row={row} depth={1} />)
    ) : (
      <tr className="table-bordered">
        <td colSpan={3} className="table-danger text-center">
          No values
        </td>
      </tr>
    )}
  </>
);

const BalanceSheet = ({ data }) => {
  const report = data?.Reports?.[0];

  if (!report) {
    return <div>Report is not present</div>;
  }

  return (
    <div>
      <h2>Report Name: {report.ReportName}</h2>
      <h4>{report.ReportTitles.join(" - ")}</h4>
      <table className="table table-bordered" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead className="table-primary">
          <tr>
            {report?.Rows?.[0]?.Cells?.map((cell, index) => (
              <th key={index}>{cell.Value}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table-light">
          {report?.Rows?.slice(1).map((section) => (
            <TableSection key={section.Title} section={section} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BalanceSheet;
