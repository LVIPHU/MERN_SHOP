import React from "react";

const Chart1 = (URL) => {
  return (
    <div className="col-xl-3 col-lg-6">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <iframe
            style={{
              background: "#FFFFFF", 
              border: "none",
              borderRadius: "2px", 
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height:"300px"
            }}
            src="https://charts.mongodb.com/charts-e-commerce-jqkjl/embed/charts?id=6306f4c3-5045-4c14-8636-660c23561b22&maxDataAge=10&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default Chart1;
