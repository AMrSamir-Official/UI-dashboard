import {
  Badge,
  Button,
  Card,
  Grid,
  Link,
  Modal,
  Spacer,
  Switch,
  Text,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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

// Define the View Test Data page
export const ViewTestData = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [testCases, setTestCases] = useState({
    Passed: [
      {
        id: "1",
        title: "Login Functionality",
        module: "Authentication",
        date: "2023-10-01",
      },
      {
        id: "4",
        title: "User Profile Update",
        module: "Profile",
        date: "2023-10-04",
      },
    ],
    Failed: [
      {
        id: "2",
        title: "Payment Gateway",
        module: "Payments",
        date: "2023-10-02",
      },
    ],
    Pending: [
      {
        id: "3",
        title: "Search Feature",
        module: "Search",
        date: "2023-10-03",
      },
    ],
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock data for test logs
  const testLogs = [
    {
      id: "1",
      log: 'Test Case "Login Functionality" passed',
      date: "2023-10-01",
      severity: "Low",
    },
    {
      id: "2",
      log: 'Test Case "Payment Gateway" failed',
      date: "2023-10-02",
      severity: "High",
    },
    {
      id: "3",
      log: 'Test Case "Search Feature" pending',
      date: "2023-10-03",
      severity: "Medium",
    },
    {
      id: "4",
      log: 'Test Case "User Profile Update" passed',
      date: "2023-10-04",
      severity: "Low",
    },
  ];

  // Mock data for test execution trends
  const testExecutionTrends = [
    { week: "Week 1", testsExecuted: 40, testsPassed: 35 },
    { week: "Week 2", testsExecuted: 50, testsPassed: 45 },
    { week: "Week 3", testsExecuted: 60, testsPassed: 55 },
    { week: "Week 4", testsExecuted: 70, testsPassed: 65 },
  ];

  // Mock data for test coverage
  const testCoverageData = [
    { name: "Authentication", value: 90 },
    { name: "Payments", value: 75 },
    { name: "Search", value: 60 },
    { name: "Profile", value: 40 },
  ];

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handleViewTest = (test) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceColumn = testCases[source.droppableId];
    const destColumn = testCases[destination.droppableId];
    const movedTest = sourceColumn.find((test) => test.id === draggableId);

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const newColumn = Array.from(sourceColumn);
      newColumn.splice(source.index, 1);
      newColumn.splice(destination.index, 0, movedTest);

      setTestCases({ ...testCases, [source.droppableId]: newColumn });
    } else {
      // Move to a different column
      const newSourceColumn = Array.from(sourceColumn);
      newSourceColumn.splice(source.index, 1);

      const newDestColumn = Array.from(destColumn);
      newDestColumn.splice(destination.index, 0, movedTest);

      setTestCases({
        ...testCases,
        [source.droppableId]: newSourceColumn,
        [destination.droppableId]: newDestColumn,
      });
    }
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
        backgroundColor: isDarkMode ? "#ffffff" : "#1a1a1a",
        color: isDarkMode ? "#ffffff" : "#000000",
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
          <span>🧪</span> {/* Replace with your TestIcon */}
          <CrumbLink href="#">Tests</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">View Test Data</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Flex justify="between" align="center">
        <Text h3>View Test Data</Text>
        <Switch
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
      </Flex>

      <Grid.Container gap={2} css={{ mt: "20px" }}>
        <Grid xs={12} sm={4}>
          <Card css={{ backgroundColor: isDarkMode ? "#f0f4ff" : "#333333" }}>
            <Card.Body>
              <Text h4>Total Test Cases</Text>
              <Text h2>150</Text>
              <Text small color="success">
                +10% this month
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card css={{ backgroundColor: isDarkMode ? "#e6f7ff" : "#333333" }}>
            <Card.Body>
              <Text h4>Pass Rate</Text>
              <Text h2>85%</Text>
              <Text small color="success">
                +5% this month
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card css={{ backgroundColor: isDarkMode ? "#fff7e6" : "#333333" }}>
            <Card.Body>
              <Text h4>Average Duration</Text>
              <Text h2>7s</Text>
              <Text small color="error">
                -1s this month
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      {/* Kanban Board for Test Cases */}
      <Text h4 css={{ mt: "20px" }}>
        Test Cases by Status
      </Text>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid.Container gap={2} css={{ mt: "10px" }}>
          {Object.entries(testCases).map(([status, tests]) => (
            <Grid xs={12} sm={4} key={status}>
              <Droppable droppableId={status}>
                {(provided) => (
                  <Card ref={provided.innerRef} {...provided.droppableProps}>
                    <Card.Body>
                      <Text h5>{status}</Text>
                      {tests.map((test, index) => (
                        <Draggable
                          key={test.id}
                          draggableId={test.id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              css={{ mb: "10px", cursor: "pointer" }}
                              onClick={() => handleViewTest(test)}
                            >
                              <Card.Body>
                                <Text>{test.title}</Text>
                                <Text small>Module: {test.module}</Text>
                                <Text small>Date: {test.date}</Text>
                              </Card.Body>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Card.Body>
                  </Card>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid.Container>
      </DragDropContext>

      {/* Test Execution Trends Chart */}
      <Text h4 css={{ mt: "20px" }}>
        Test Execution Trends
      </Text>
      <Card css={{ mt: "10px" }}>
        <Card.Body>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={testExecutionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="testsExecuted" stroke="#8884d8" />
              <Line type="monotone" dataKey="testsPassed" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      {/* Test Coverage Pie Chart */}
      <Text h4 css={{ mt: "20px" }}>
        Test Coverage
      </Text>
      <Card css={{ mt: "10px" }}>
        <Card.Body>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={testCoverageData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {testCoverageData.map((entry, index) => (
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

      {/* Test Logs Timeline */}
      <Text h4 css={{ mt: "20px" }}>
        Recent Test Logs
      </Text>
      <Card css={{ mt: "10px" }}>
        <Card.Body>
          {testLogs.map((log) => (
            <div key={log.id} style={{ marginBottom: "10px" }}>
              <Flex align="center">
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
                <Spacer x={0.5} />
                <Text>{log.log}</Text>
                <Spacer x={0.5} />
                <Text small color="gray">
                  {log.date}
                </Text>
              </Flex>
            </div>
          ))}
        </Card.Body>
      </Card>

      {/* Test Details Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          <Text h4>Test Details</Text>
        </Modal.Header>
        <Modal.Body>
          {selectedTest && (
            <div>
              <Text>Title: {selectedTest.title}</Text>
              <Text>Module: {selectedTest.module}</Text>
              <Text>Date: {selectedTest.date}</Text>
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
