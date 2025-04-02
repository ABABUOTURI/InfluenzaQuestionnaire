// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const InsightsPage = () => {
//   const [insights, setInsights] = useState([]);

//   useEffect(() => {
//     // Fetch insights from the backend
//     axios.get("http://127.0.0.1:5000/insights")
//       .then((response) => {
//         setInsights(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching insights:", error);
//       });
//   }, []);

//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h2>Cluster Insights</h2>
//       {insights.length === 0 ? (
//         <p>Loading insights...</p>
//       ) : (
//         <table style={{ margin: "20px auto", borderCollapse: "collapse", width: "60%" }}>
//           <thead>
//             <tr style={{ background: "#007bff", color: "#fff" }}>
//               <th style={{ padding: "10px", border: "1px solid #ddd" }}>Cluster</th>
//               <th style={{ padding: "10px", border: "1px solid #ddd" }}>Feature1 Avg</th>
//               <th style={{ padding: "10px", border: "1px solid #ddd" }}>Feature2 Avg</th>
//             </tr>
//           </thead>
//           <tbody>
//             {insights.map((cluster, index) => (
//               <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
//                 <td style={{ padding: "10px", border: "1px solid #ddd" }}>{cluster.cluster}</td>
//                 <td style={{ padding: "10px", border: "1px solid #ddd" }}>{cluster.Feature1.toFixed(2)}</td>
//                 <td style={{ padding: "10px", border: "1px solid #ddd" }}>{cluster.Feature2.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default InsightsPage;


import { useState, useEffect } from "react";
import axios from "axios";

function InsightsPage() {
    const [clusters, setClusters] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/clusters/")
             .then(response => setClusters(response.data.clusters))
             .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Clustering Results</h2>
            <ul>
                {clusters.map((item, index) => (
                    <li key={index}>
                        Age: {item.age}, Family Size: {item.family_size}, Cluster: {item.cluster}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InsightsPage;
