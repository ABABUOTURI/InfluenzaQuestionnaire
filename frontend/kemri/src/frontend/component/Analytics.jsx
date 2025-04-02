import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const submissionsData = [
  { date: "2024-07-01", submissions: 10 },
  { date: "2024-07-02", submissions: 15 },
  { date: "2024-07-03", submissions: 8 },
  { date: "2024-07-04", submissions: 20 },
  { date: "2024-07-05", submissions: 12 },
  { date: "2024-07-06", submissions: 18 },
  { date: "2024-07-07", submissions: 25 },
];



  const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD700", "#A833FF", "#FF8C33", "#00C49F", "#FF4500", "#0088FE"];

  const Analytics = () => {
    //barchart
    const [ageDistribution, setAgeDistribution] = useState([]);
    const [educationData, setEducationData] = useState([]);
    const [religionData, setReligionData] = useState([]);
    const [familySizeData, setFamilyData] = useState([]);
    const [alternativeVisitorData, setVisitorData] = useState([]);
    const [financialSupportData, setFinancialData] = useState([]);
    const [educatorData, setEducatorData] = useState([]);
    const [topicData, setTopicData] = useState([]);

    //pie chart
    const [relationshipData, setRelationshipData] = useState([]);
    const [occupationData, setOccupationData] = useState([]);
    const [siblingsData, setSiblingsData] = useState([]);
    const [siblingspartnerData, setSiblingspartnerData] = useState([]);
    const [pocketmoneyData, setPocketmoneyData] = useState([]);
    const [pocketmoneyadequateData, setPocketadequateData] = useState([]);
    const [guardianvisitData, setVisitData] = useState([]);
    const [accessData, setAccessData] = useState([]);
    const [infoadequateData, setInfoData] = useState([]);
  
    // Function to group family sizes into bins
    const groupFamilySize = (data) => {
      const bins = {
        "1-5": 0,
        "6-10": 0,
        "11-15": 0,
        "16-20": 0,
        "21-25": 0,
        "26-30": 0,
        "31-35": 0,
        "36-40": 0,
        "41-45": 0,
        "46-50": 0,
      };
  
      data.forEach((item) => {
        const size = item.family_size;
        if (size >= 1 && size <= 5) bins["1-5"]++;
        else if (size >= 6 && size <= 10) bins["6-10"]++;
        else if (size >= 11 && size <= 15) bins["11-15"]++;
        else if (size >= 16 && size <= 20) bins["16-20"]++;
        else if (size >= 21 && size <= 25) bins["21-25"]++;
        else if (size >= 26 && size <= 30) bins["26-30"]++;
        else if (size >= 31 && size <= 35) bins["31-35"]++;
        else if (size >= 36 && size <= 40) bins["36-40"]++;
        else if (size >= 41 && size <= 45) bins["41-45"]++;
        else if (size >= 46 && size <= 50) bins["46-50"]++;
      });
  
      return Object.keys(bins).map((range) => ({
        range: range,
        count: bins[range],
      }));
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [ageRes, eduRes, relRes, famRes, finRes, visRes, educRes, topRes, relaRes, occupRes, sibRes, partnRes, pmonRes, monadqRes, gurdRes, acceRes, infRes] = await Promise.all([
            axios.get("http://127.0.0.1:8000/api/age-distribution/"),
            axios.get("http://127.0.0.1:8000/api/education-distribution/"),
            axios.get("http://127.0.0.1:8000/api/religion-distribution/"),
            axios.get("http://127.0.0.1:8000/api/family-distribution/"),
            axios.get("http://127.0.0.1:8000/api/financial-distribution/"),
            axios.get("http://127.0.0.1:8000/api/visitor-distribution/"),
            axios.get("http://127.0.0.1:8000/api/educator-distribution/"),
            axios.get("http://127.0.0.1:8000/api/topic-distribution/"),

            //piechart
            axios.get("http://127.0.0.1:8000/api/relationship-distribution/"),
            axios.get("http://127.0.0.1:8000/api/occupation-distribution/"),
            axios.get("http://127.0.0.1:8000/api/siblings-distribution/"),
            axios.get("http://127.0.0.1:8000/api/partners-distribution/"),
            axios.get("http://127.0.0.1:8000/api/pocketmoney-distribution/"),
            axios.get("http://127.0.0.1:8000/api/moneyadequate-distribution/"),
            axios.get("http://127.0.0.1:8000/api/guardianvisits-distribution/"),
            axios.get("http://127.0.0.1:8000/api/access-distribution/"),
            axios.get("http://127.0.0.1:8000/api/info-distribution/"),
          ]);
  
          setAgeDistribution(ageRes.data);
          setEducationData(eduRes.data);
          setReligionData(relRes.data);
          setFinancialData(finRes.data);
          setVisitorData(visRes.data);
          setEducatorData(educRes.data);
          setTopicData(topRes.data);

          setRelationshipData(relaRes.data);
          setOccupationData(occupRes.data);
          setSiblingsData(sibRes.data);
          setSiblingspartnerData(partnRes.data);
          setPocketmoneyData(pmonRes.data);
          setPocketadequateData(monadqRes.data);
          setVisitData(gurdRes.data);
          setAccessData(acceRes.data);
          setInfoData(infRes.data);
  
          // Process and set grouped family size data
          const groupedFamilyData = groupFamilySize(famRes.data);
          setFamilyData(groupedFamilyData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }, []);
    

  return (
    <div style={{ padding: "50px", marginLeft: "60px" }}>
      <Grid container spacing={3}>
        {/* Submissions Over Time */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Submissions Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={submissionsData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="submissions" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Age Distribution */}
        <Grid item xs={12} md={6}>
        <Card className="p-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Age Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ageDistribution}>
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {ageDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
        </Grid>

        {/* Relationship Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Relationship Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={relationshipData} 
              dataKey="count" 
              nameKey="relationship" 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
              label
            >
              {relationshipData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Guardian Occupation Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Guardian Occupation Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={occupationData} 
              dataKey="count" 
              nameKey="guardian_occupation" 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
              label
            >
              {occupationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Guardian Education Level */}
        <Grid item xs={12} md={6}>
        <Card className="p-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Guardian Education Level</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={educationData}>
            <XAxis dataKey="guardian_education" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {educationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
        </Grid>

        {/* Guardian Education Level */}
        <Grid item xs={12} md={6}>
        <Card className="p-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Religion</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={religionData}>
            <XAxis dataKey="respondent_religion" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {religionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Family Size</h2>
              <ResponsiveContainer width="100%" height={300}>
          <BarChart data={familySizeData}>
          <XAxis dataKey="range" tick={{ angle: -45, textAnchor: "end" }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {familySizeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Has Siblings</h2>
              <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={siblingsData} 
              dataKey="count" 
              nameKey="has_siblings" 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
              label
            >
              {siblingsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Siblings Have Partners</h2>
              <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={siblingspartnerData} 
              dataKey="count" 
              nameKey="siblings_have_partners" 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
              label
            >
              {siblingspartnerData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Gets Pocket Money</h2>
              <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={pocketmoneyData} 
              dataKey="count" 
              nameKey="gets_pocket_money" 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
              label
            >
              {pocketmoneyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Pocket Money Adequate</h2>
              <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={pocketmoneyadequateData} 
              dataKey="count" 
              nameKey="pocket_money_adequate" 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
              label
            >
              {pocketmoneyadequateData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Guardian Education Level */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Financial Support</h2>
              <ResponsiveContainer width="100%" height={300}>
          <BarChart data={financialSupportData}>
            <XAxis dataKey="financial_support" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {financialSupportData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Guardian Visit </h2>
              <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={guardianvisitData} 
              dataKey="count" 
              nameKey="guardian_visits" 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
              label
            >
              {guardianvisitData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Alternative Visistor</h2>
              <ResponsiveContainer width="100%" height={300}>
          <BarChart data={alternativeVisitorData}>
            <XAxis dataKey="alternative_visitor" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {alternativeVisitorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Access To Reproductive Health Information</h2>
              <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={accessData} 
              dataKey="count" 
              nameKey="access_to_reproductive_health_info" 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
              label
            >
              {accessData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Information Adequate</h2>
              <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={infoadequateData} 
              dataKey="count" 
              nameKey="information_adequate" 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
              label
            >
              {infoadequateData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Educator</h2>
              <ResponsiveContainer width="100%" height={300}>
          <BarChart data={educatorData}>
            <XAxis dataKey="educator_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {educatorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Topic</h2>
              <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topicData}>
            <XAxis dataKey="topic_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {topicData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
};

export default Analytics;
