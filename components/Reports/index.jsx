import { Card, Dropdown, Grid, Text } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define the Flex component for layout
const Flex = ({ children, css, justify, direction, align, wrap }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: css?.gap || "0",
        marginTop: css?.mt || "0",
        paddingLeft: css?.px || "0",
        paddingRight: css?.px || "0",
        justifyContent: justify || "flex-start",
        flexDirection: direction || "row",
        alignItems: align || "stretch",
        flexWrap: wrap || "nowrap",
        ...css,
      }}
    >
      {children}
    </div>
  );
};

// Define the Breadcrumbs component
const Breadcrumbs = ({ children }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {children}
    </div>
  );
};

const Crumb = ({ children }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {children}
    </div>
  );
};

const CrumbLink = ({ href, children }) => {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      {children}
    </Link>
  );
};

// Define the Reports page
export const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for sales reports
  const salesData = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 5000, revenue: 9800 },
    { month: "Apr", sales: 7000, revenue: 3908 },
    { month: "May", sales: 6000, revenue: 4800 },
    { month: "Jun", sales: 8000, revenue: 3800 },
  ];

  // Mock data for product performance
  const productPerformanceData = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 200 },
    { name: "Product D", value: 100 },
  ];

  // Mock data for customer satisfaction
  const customerSatisfactionData = [
    { name: "Satisfied", value: 75 },
    { name: "Neutral", value: 15 },
    { name: "Dissatisfied", value: 10 },
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: "1", activity: "New order placed", date: "2023-10-01" },
    { id: "2", activity: "Product restocked", date: "2023-10-02" },
    { id: "3", activity: "Payment received", date: "2023-10-03" },
    { id: "4", activity: "Customer review submitted", date: "2023-10-04" },
  ];

  // Colors for pie charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <Flex
      css={{
        mt: "20px",
        px: "16px",
        "@sm": {
          mt: "40px",
          px: "32px",
        },
      }}
      justify={"center"}
      direction={"column"}
    >
      <Breadcrumbs>
        <Crumb>
          <span>🏠</span> {/* Replace with your HouseIcon */}
          <Link href={"/"}>
            <CrumbLink href="#">Home</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>

        <Crumb>
          <span>📊</span> {/* Replace with your ReportsIcon */}
          <CrumbLink href="#">Reports</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">Dashboard</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>Reports Dashboard</Text>

      {/* Report Statistics Cards */}
      <Grid.Container gap={2} css={{ mt: "20px" }}>
        <Grid xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Text h4>Total Sales</Text>
              <Text h2>$50,000</Text>
              <Text small color="success">
                +12% this month
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Text h4>New Customers</Text>
              <Text h2>150</Text>
              <Text small color="success">
                +8% this month
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Text h4>Customer Satisfaction</Text>
              <Text h2>92%</Text>
              <Text small color="success">
                +5% this month
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      {/* Sales and Revenue Chart */}
      <Card css={{ mt: "20px" }}>
        <Card.Body>
          <Text h4>Sales and Revenue</Text>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      <Grid.Container gap={2} css={{ mt: "20px" }}>
        <Grid xs={12} sm={6}>
          <Card>
            <Card.Body>
              <Text h4>Product Performance</Text>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productPerformanceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {productPerformanceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <Card>
            <Card.Body>
              <Text h4>Customer Satisfaction</Text>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={customerSatisfactionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {customerSatisfactionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      {/* Recent Activities */}
      <Card css={{ mt: "20px" }}>
        <Card.Body>
          <Text h4>Recent Activities</Text>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Activity
                </th>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity) => (
                <tr key={activity.id}>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {activity.activity}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {activity.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>

      {/* Export Options */}
      <Flex css={{ gap: "16px", mt: "20px" }} justify={"flex-end"}>
        <Dropdown>
          <Dropdown.Button flat>Export</Dropdown.Button>
          <Dropdown.Menu aria-label="Export Actions">
            <Dropdown.Item key="csv">Export to CSV</Dropdown.Item>
            <Dropdown.Item key="excel">Export to Excel</Dropdown.Item>
            <Dropdown.Item key="pdf">Export to PDF</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Flex>
    </Flex>
  );
};
