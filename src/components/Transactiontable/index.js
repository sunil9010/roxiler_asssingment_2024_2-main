import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import { BiSearch } from "react-icons/bi";
import Sales from "../Sales";
import "./index.css";
import Barchart from "../Barchart";

import Piechart from "../Piechart";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Transactontable() {
  const [data, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("Mar");
  const [search, setSearch] = useState("");

  const getProductsData = async () => {
    const url = `https://roxiler-apis.onrender.com/combined-data?month=${selectedMonth}&search=${search}`;
    const options = {
      method: "GET",
    };

    const apiCall = await fetch(url, options);

    if (apiCall.ok === true) {
      const result = await apiCall.json();
      setProducts(result);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsData();
  }, [selectedMonth, search]);

  const renderSales = () => (
    <div>
      <Sales statisticsData={data.statisticsData} month={selectedMonth} />
    </div>
  );

  function renderBarchart(barchart) {
    const { barChartData } = barchart;

    const chartData = Object.keys(barChartData).map((range) => ({
      range,
      itemCount: barChartData[range],
    }));
    return (
      <div>
        <Barchart data={chartData} month={selectedMonth} />
      </div>
    );
  }

  const renderLoading = () => (
    <div className="loders">
      <ThreeDots
        height="50"
        width="90"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
      />
    </div>
  );

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedMonth(selectedValue, getProductsData());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getProductsData();
    }
  };

  const errorView = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png "
        alt="not found"
        className="error"
      />
      <h2 className="error-msg">Sorry We Couldn't found any matches</h2>
      <p className="error-para">Try again with another words</p>
    </div>
  );
  const TransactionTable = ({ transactionsData }) =>
    transactionsData.length === 0 ? (
      errorView()
    ) : (
      <div className="">
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.title}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.sold ? "Yes" : "No"}</td>
                  <td>
                    <img
                      src={transaction.image}
                      alt={transaction.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

  const renderPiechart = () => (
    <div>
      <Piechart chartData={data.pieChartData} />
    </div>
  );

  return (
    <div className="graps-container">
      <div className="main-graps">
        <div className="table">
          <div>
            <h2>
              Transaction Dashboard -{" "}
              <span className="span">{selectedMonth}</span>
            </h2>
            <div className="align">
              <select
                value={selectedMonth}
                onChange={handleChange}
                className="drop"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <div className="search-container">
                <input
                  className="Search"
                  type="search"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  className="button"
                  onClick={() => getProductsData()}
                >
                  <BiSearch className="search-icon" />
                </button>
              </div>
            </div>
          </div>
          {loading ? renderLoading() : TransactionTable(data)}
        </div>
        <div className="barchart">
          <h1 className="heading-bar">Bar Chart Stats - {selectedMonth}</h1>
          {loading ? renderLoading() : renderBarchart(data)}
        </div>
        <div className="pie-sales">
          <div className="sales">
            <div>
              <h1 className="heading">Statistics - {selectedMonth}</h1>
              {loading ? renderLoading() : renderSales()}
            </div>
          </div>
          <div className="pie">
            <div>
              <h1 className="pie-head heading">Pie chart -{selectedMonth}</h1>
              {loading ? renderLoading() : renderPiechart()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactontable;
