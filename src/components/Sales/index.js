import "./index.css";

function Sales({ statisticsData }) {
  const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = statisticsData;
  return (
    <div className="container">
      <div className="sub-container">
        <div>
          <p className="msg">
            Total Sale : <strong className="strong">{totalSaleAmount}</strong>
          </p>
          <p className="msg">
            Total sold item : <strong>{totalSoldItems}</strong>
          </p>
          <p className="msg">
            Total not sold item : <strong>{totalNotSoldItems}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sales;
