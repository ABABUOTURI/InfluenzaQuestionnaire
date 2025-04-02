import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import Chart from "chart.js/auto";

const ClusterVisualization = () => {
    const [clusters, setClusters] = useState([]);

    useEffect(() => {
        // Fetch clustering results from the backend
        fetch("http://127.0.0.1:8000/api/clusters") 
            .then(response => response.json())
            .then(data => setClusters(data))
            .catch(error => console.error("Error fetching clusters:", error));
    }, []);

    const scatterData = {
        datasets: [
            {
                label: "Clusters",
                data: clusters.map(item => ({
                    x: item.age,
                    y: item.family_size
                })),
                backgroundColor: clusters.map(item =>
                    item.cluster === 0 ? "red" :
                    item.cluster === 1 ? "blue" :
                    "green"
                ),
                pointRadius: 5
            }
        ]
    };

    return (
        <div>
            <h2>Cluster Visualization</h2>
            <Scatter data={scatterData} />
        </div>
    );
};

export default ClusterVisualization;
