import React from "react";

const Chart5 = (URL) => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <iframe
            style={{
              background: "#FFFFFF", 
              border: "none",
              borderRadius: "2px", 
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height:"480px"
            }}
            src="https://charts.mongodb.com/charts-e-commerce-jqkjl/embed/charts?id=6306e9d0-5b7d-4705-80b2-63982569930d&maxDataAge=10&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default Chart5;
