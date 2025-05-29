import { AgGridReact } from "ag-grid-react";

import { generateColDefs } from "./utils/generateColDefs";
import { usePromise } from "./hooks/usePromise";
import { promises } from "./utils/promises";

export default function App() {
  const table1 = usePromise(promises.table1);

  const table2 = usePromise(promises.table2);

  const glossary = usePromise(promises.glossary);

  const grids = [table1, table2, glossary].map((rowData, index) => (
    <div className="pt-3" key={index}>
      <AgGridReact
        columnDefs={generateColDefs(rowData)}
        domLayout="autoHeight"
        rowData={rowData}
      />
    </div>
  ));

  return (
    <main className="container">
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">
          Eastern Kentucky University Metrics Scorecard
        </h6>
        {grids}
      </div>
    </main>
  );
}
