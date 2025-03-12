import React from 'react';
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

const ageDistribution = [
  { age: "15", count: 5 },
  { age: "16", count: 15 },
  { age: "17", count: 8 },
  { age: "18", count: 12 },
  { age: "19", count: 10 },
];

const relationshipData = [
  { type: "Father and Mother", count: 25 },
  { type: "Mother only", count: 15 },
  { type: "Father only", count: 10 },
  { type: "Relative", count: 5 },
];

const guardianOccupation = [
  { name: "Farm Worker", value: 10 },
  { name: "Self Employed", value: 20 },
  { name: "Employed by someone", value: 15 },
  { name: "Professional", value: 8 },
  { name: "Other", value: 5 },
];

const educationData = [
  { level: "None", count: 5 },
  { level: "Primary", count: 15 },
  { level: "Secondary", count: 20 },
  { level: "Tertiary", count: 12 },
];

const religionData = [
    { level: "Catholic", count: 5 },
    { level: "Protestant", count: 15 },
    { level: "Muslim", count: 20 },
    { level: "SDA", count: 12 },
    { level: "None", count: 12 },
  ];
  const familySizeData = [
    { size: "1-5", count: 10 },
    { size: "6-10", count: 20 },
    { size: "11-15", count: 15 },
    { size: "16-20", count: 8 },
    { size: "21-30", count: 5 },
    { size: "31-50", count: 2 },
];
const siblingsData = [
    { option: "Yes", count: 30 }, 
    { option: "No", count: 10 }, 
];
const siblingspartnerData = [
    { option: "Yes", count: 60 }, 
    { option: "No", count: 10 }, 
];
const getspocketmoneyData = [
    { option: "Yes", count: 30 }, 
    { option: "No", count: 80 }, 
];
const pocketmoneyadequateData = [
    { option: "Yes", count: 40 }, 
    { option: "No", count: 60 }, 
];
const financialsupportData = [
    { level: "Relative", count: 5 },
    { level: "Boyfriend", count: 15 },
    { level: "Grandparents", count: 20 },
    { level: "Other friends", count: 12 },
   
  ];
  const guardianvisitData = [
    { option: "Yes", count: 40 }, 
    { option: "No", count: 20 }, 
];
const alternativevisitorData = [
    { level: "Boyfriend", count: 15 },
    { level: "'Relatives", count: 5 },
    { level: "Brothers/Sisters", count: 20 },
    { level: "Man friend", count: 12 },
    { level: "None", count: 12 },
   
  ];
const accessinfoData = [
    { option: "Yes", count: 460 }, 
    { option: "No", count: 60 }, 
];
const informationadequateData = [
    { option: "Yes", count: 40 }, 
    { option: "No", count: 610 }, 
];
const educatorData = [
    { level: "Teacher", count: 5 },
    { level: "Parents", count: 15 },
    { level: "Health worker", count: 20 },
    { level: "Friends", count: 12 },
    { level: "Radio/Magazine/TV", count: 12 },
  ];
  const topicData = [
    { level: "Sexuality", count: 5 },
    { level: "Abstinence", count: 15 },
    { level: "Condoms", count: 20 },
    { level: "HIV/STI", count: 12 },
    { level: "Relationships", count: 12 },
  ];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Analytics = () => {
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
          <Card>
            <CardContent>
              <h2>Age Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageDistribution}>
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF5733" />
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
                  <Pie data={relationshipData} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={100} label>
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
                  <Pie data={guardianOccupation} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {guardianOccupation.map((entry, index) => (
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
              <h2>Guardian Education Level</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={educationData}>
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF5733" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Guardian Education Level */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Religion</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={religionData}>
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF5733" />
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
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF5733" />
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
                    <Pie data={siblingsData} dataKey="count" nameKey="option" cx="50%" cy="50%" outerRadius={100} label>
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
                    <Pie data={siblingspartnerData} dataKey="count" nameKey="option" cx="50%" cy="50%" outerRadius={100} label>
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
                    <Pie data={getspocketmoneyData} dataKey="count" nameKey="option" cx="50%" cy="50%" outerRadius={100} label>
                    {getspocketmoneyData.map((entry, index) => (
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
                    <Pie data={pocketmoneyadequateData} dataKey="count" nameKey="option" cx="50%" cy="50%" outerRadius={100} label>
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
                <BarChart data={financialsupportData }>
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF5733" />
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
                    <Pie data={guardianvisitData } dataKey="count" nameKey="option" cx="50%" cy="50%" outerRadius={100} label>
                    {guardianvisitData .map((entry, index) => (
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
                <BarChart data={alternativevisitorData}>
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF5733" />
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
                    <Pie data={ accessinfoData} dataKey="count" nameKey="option" cx="50%" cy="50%" outerRadius={100} label>
                    { accessinfoData.map((entry, index) => (
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
                    <Pie data={informationadequateData} dataKey="count" nameKey="option" cx="50%" cy="50%" outerRadius={100} label>
                    {informationadequateData.map((entry, index) => (
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
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF5733" />
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
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF5733" />
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
