import { AgGridReact } from "ag-grid-react";

import { generateColDefs } from "./utils/generateColDefs";
import { splitAtFirst } from "./utils/splitAtFirst";
import { usePromise } from "./hooks/usePromise";
import { isNumeric } from "./utils/isNumeric";
import { promises } from "./utils/promises";

// * shift money sign left
// * auto-size
// * center headers that are not "Metric"
// template
// * top note from glossary

export default function App() {
  const table1 = usePromise(promises.table1);

  const table2 = usePromise(promises.table2);

  const glossary = usePromise(promises.glossary);

  const notes = Object.fromEntries(
    (Array.isArray(glossary) ? glossary : []).map(
      (row) =>
        [splitAtFirst(Object.values(row)[0], ":")].map(
          ([metric, note = ""]) => [metric, note.trim()]
        )[0]
    )
  );

  const asteriskNote = Object.entries(notes).find(([, note]) => !note)?.[0];

  const defaultColDef = {
    cellClassRules: {
      "text-center": ({ colDef: { field }, value }) =>
        field !== "Metric" &&
        !isNumeric(
          `${value}`
            .trim()
            .replaceAll("$", "")
            .replaceAll(",", "")
            .replaceAll("%", "")
        ),
      "text-end": ({ value }) =>
        isNumeric(
          `${value}`
            .trim()
            .replaceAll("$", "")
            .replaceAll(",", "")
            .replaceAll("%", "")
        ),
      "fw-bold": ({ colDef: { field }, data }) => {
        if (field === "Metric") return data[field] in notes;
      },
      dollar: ({ colDef: { field }, value }) =>
        field !== "Metric" && value.includes("$"),
    },
    headerClass: ({ colDef: { field } }) => {
      return field === "Metric"
        ? ""
        : "ag-header-cell-label-justify-content-center";
    },
    valueFormatter: ({ value }) =>
      `${value}`.trim().startsWith("$")
        ? `${value}`.trim().substring(1)
        : value,
    tooltipValueGetter: ({ colDef: { field }, data }) => {
      if (field === "Metric") return notes[data[field]];
    },
    sortable: false,
  };

  const grids = [table1, table2].map((rowData, index) => (
    <div key={index}>
      <AgGridReact
        autoSizeStrategy={{ type: "fitCellContents" }}
        columnDefs={generateColDefs(rowData)}
        defaultColDef={defaultColDef}
        domLayout="autoHeight"
        tooltipShowDelay={0}
        rowData={rowData}
      />
    </div>
  ));

  const children = [<h6 className="mb-0">{asteriskNote}</h6>, ...grids];

  return <>{children}</>;
}
