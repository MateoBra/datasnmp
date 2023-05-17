import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState(null);
  const [stations, setStations] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  function handleClick() {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data[0]);
        const ar = data[0].map((x) => x.Subsys);

        setStations([...new Set(ar)]); //iz array ar uklanja duplikate
      });
  }
  function getKey(x) {
    setSelectedData(x);
  }

  return (
    <div>
      <div onClick={handleClick}>Click for Data</div>
      <br></br>

      <div onClick={() => setSelectedData(null)}>Reset Selected Data</div>

      <div>{selectedData != null ? selectedData : <></>}</div>
      <div>
        <ul>
          {stations != null ? (
            stations.map((x) => (
              <li key={x} onClick={() => getKey(x)}>
                {x}
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
        <table>
          <tbody>
            <tr>
              <th>Station</th>
              <th>IdentObject</th>
              <th>IdentData</th>
              <th>Complex</th>
              <th>ValueType</th>
              <th>Value</th>
              <th>Time</th>
            </tr>

            {data != null ? (
              data[0].map((x) =>
                selectedData === null ? (
                  <tr key={x.Id}>
                    <td>{x.Subsys}</td>
                    <td>{x.IdentObject}</td>
                    <td>{x.IdentData}</td>
                    <td>{x.Complex}</td>
                    <td>{x.ValueType}</td>
                    <td>{x.EventText}</td>
                    <td>{x.Time.replace("T", " ").split(".")[0]}</td>
                  </tr>
                ) : x.Subsys === selectedData ? (
                  <tr key={x.Id}>
                    <td>{x.Subsys}</td>
                    <td>{x.IdentObject}</td>
                    <td>{x.IdentData}</td>
                    <td>{x.Complex}</td>
                    <td>{x.ValueType}</td>
                    <td>{x.EventText}</td>
                    <td>{x.Time.replace("T", " ").split(".")[0]}</td>
                  </tr>
                ) : (
                  <></>
                )
              )
            ) : (
              <div>No data</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
