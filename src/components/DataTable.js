import { useEffect, useState } from 'react';

const DataTable = ({ endpoint }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${endpoint}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [endpoint]);

  if (data.length === 0) return <p>Loading...</p>;

  const columns = Object.keys(data[0]);

  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col) => (
            <th key={col} className="p-2 border">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 10).map((item, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col} className="p-2 border">{item[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
