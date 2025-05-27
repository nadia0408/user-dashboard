const TableView = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  const columns = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => <th key={col}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            {columns.map(col => (
              <td key={col}>{item[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
