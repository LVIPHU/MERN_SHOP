import React from "react";

const Chart10 = (URL) => {
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
            src="https://charts.mongodb.com/charts-e-commerce-jqkjl/embed/charts?id=631c5580-2840-4a0f-8927-8634b931ee84&maxDataAge=10&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default Chart10;
