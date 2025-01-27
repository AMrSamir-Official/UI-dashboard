import {
  Badge,
  Button,
  Card,
  Grid,
  Input,
  Link,
  Modal,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
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

export const Developer = () => {
  const [selectedLog, setSelectedLog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock data for API usage
  const apiUsageData = [
    { month: "Jan", requests: 4000, errors: 240 },
    { month: "Feb", requests: 3000, errors: 139 },
    { month: "Mar", requests: 5000, errors: 980 },
    { month: "Apr", requests: 7000, errors: 390 },
    { month: "May", requests: 6000, errors: 480 },
    { month: "Jun", requests: 8000, errors: 380 },
  ];

  // Mock data for deployment frequency
  const deploymentData = [
    { week: "Week 1", deployments: 4 },
    { week: "Week 2", deployments: 6 },
    { week: "Week 3", deployments: 8 },
    { week: "Week 4", deployments: 5 },
  ];

  // Mock data for error types
  const errorTypesData = [
    { name: "Type A", value: 40 },
    { name: "Type B", value: 30 },
    { name: "Type C", value: 20 },
    { name: "Type D", value: 10 },
  ];

  // Mock data for recent logs
  const recentLogs = [
    {
      id: "1",
      log: "API request failed: 404 Not Found",
      date: "2023-10-01",
      severity: "High",
    },
    {
      id: "2",
      log: "Deployment successful: v1.2.3",
      date: "2023-10-02",
      severity: "Low",
    },
    {
      id: "3",
      log: "Database connection timeout",
      date: "2023-10-03",
      severity: "Medium",
    },
    {
      id: "4",
      log: "New feature deployed: Payment Gateway",
      date: "2023-10-04",
      severity: "Low",
    },
  ];

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handleViewLog = (log) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const handleRunCode = () => {
    alert(`Running code: ${codeSnippet}`);
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

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
          <span>👨‍💻</span> {/* Replace with your DeveloperIcon */}
          <CrumbLink href="#">Developer</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">Dashboard</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>Developer Dashboard</Text>

      {/* Developer Statistics Cards */}
      <Grid.Container gap={2} css={{ mt: "20px" }}>
        <Grid xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Text h4>API Requests</Text>
              <Text h2>50,000</Text>
              <Text small color="success">
                +12% this month
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Text h4>Deployments</Text>
              <Text h2>23</Text>
              <Text small color="success">
                +8% this month
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Text h4>Error Rate</Text>
              <Text h2>2.5%</Text>
              <Text small color="error">
                -1% this month
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      {/* API Usage Chart */}
      <Card css={{ mt: "20px" }}>
        <Card.Body>
          <Text h4>API Usage</Text>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={apiUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="requests" stroke="#8884d8" />
              <Line type="monotone" dataKey="errors" stroke="#ff4040" />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      {/* Deployment Frequency Chart */}
      <Card css={{ mt: "20px" }}>
        <Card.Body>
          <Text h4>Deployment Frequency</Text>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deploymentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="deployments" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      {/* Error Types Chart */}
      <Card css={{ mt: "20px" }}>
        <Card.Body>
          <Text h4>Error Types</Text>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={errorTypesData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {errorTypesData.map((entry, index) => (
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

      {/* Code Snippet Sandbox */}
      <Card css={{ mt: "20px" }}>
        <Card.Body>
          <Text h4>Code Sandbox</Text>
          <Input
            placeholder="Enter your code here"
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            css={{ width: "100%", mb: "10px" }}
          />
          <Button auto onClick={handleRunCode}>
            Run Code
          </Button>
        </Card.Body>
      </Card>

      {/* Recent Logs */}
      <Card css={{ mt: "20px" }}>
        <Card.Body>
          <Text h4>Recent Logs</Text>
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
                  Log
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
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Severity
                </th>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((log) => (
                <tr key={log.id}>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {log.log}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {log.date}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    <Badge
                      color={
                        log.severity === "High"
                          ? "error"
                          : log.severity === "Medium"
                          ? "warning"
                          : "success"
                      }
                    >
                      {log.severity}
                    </Badge>
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    <Button
                      auto
                      size="sm"
                      color="primary"
                      onClick={() => handleViewLog(log)}
                    >
                      View
                    </Button>
                    <Spacer x={0.5} />
                    <Button auto size="sm" color="error">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>

      {/* Log Details Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          <Text h4>Log Details</Text>
        </Modal.Header>
        <Modal.Body>
          {selectedLog && (
            <div>
              <Text>Log: {selectedLog.log}</Text>
              <Text>Date: {selectedLog.date}</Text>
              <Text>Severity: {selectedLog.severity}</Text>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Flex>
  );
};
