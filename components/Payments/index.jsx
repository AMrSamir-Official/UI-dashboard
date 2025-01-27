import {
  Badge,
  Button,
  Card,
  Dropdown,
  Input,
  Pagination,
  Spacer,
  Text,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

// Define the TableWrapper component
const TableWrapper = ({ data, onPageChange }) => {
  return (
    <div style={{ marginTop: "20px" }}>
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
              Payment ID
            </th>
            <th
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Customer
            </th>
            <th
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Amount
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
              Status
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
          {data.map((payment) => (
            <tr key={payment.id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {payment.id}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {payment.customer}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {payment.amount}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {payment.date}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                <Badge
                  color={
                    payment.status === "Completed"
                      ? "success"
                      : payment.status === "Pending"
                      ? "warning"
                      : "error"
                  }
                >
                  {payment.status}
                </Badge>
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                <Button auto size="sm" color="primary">
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
      <Spacer y={1} />
      <Pagination total={10} initialPage={1} onChange={onPageChange} />
    </div>
  );
};

// Define the AddPayment component
const AddPayment = () => {
  return (
    <Dropdown>
      <Dropdown.Button flat color="primary" auto>
        Add Payment
      </Dropdown.Button>
      <Dropdown.Menu aria-label="Add Payment Actions">
        <Dropdown.Item key="new">New Payment</Dropdown.Item>
        <Dropdown.Item key="bulk">Bulk Upload</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Define the Payments page
export const Payments = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for the table
  const tableData = [
    {
      id: "12345",
      customer: "John Doe",
      amount: "$100.00",
      date: "2023-10-01",
      status: "Completed",
    },
    {
      id: "67890",
      customer: "Jane Smith",
      amount: "$200.00",
      date: "2023-10-02",
      status: "Pending",
    },
    {
      id: "11223",
      customer: "Alice Johnson",
      amount: "$150.00",
      date: "2023-10-03",
      status: "Failed",
    },
    // Add more rows as needed
  ];

  // Mock data for the revenue chart
  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 7000 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 8000 },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Fetch data for the new page (you can implement this)
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
          <span>💳</span> {/* Replace with your PaymentsIcon */}
          <CrumbLink href="#">Payments</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>All Payments</Text>

      {/* Payment Statistics Cards */}
      <Flex css={{ gap: "16px", mt: "20px" }} wrap={"wrap"}>
        <Card css={{ flex: 1, minWidth: "200px" }}>
          <Card.Body>
            <Text h4>Total Revenue</Text>
            <Text h2>$10,000</Text>
            <Text small color="success">
              +5% this month
            </Text>
          </Card.Body>
        </Card>
        <Card css={{ flex: 1, minWidth: "200px" }}>
          <Card.Body>
            <Text h4>Pending Payments</Text>
            <Text h2>$2,000</Text>
            <Text small color="warning">
              10 pending
            </Text>
          </Card.Body>
        </Card>
        <Card css={{ flex: 1, minWidth: "200px" }}>
          <Card.Body>
            <Text h4>Failed Payments</Text>
            <Text h2>$500</Text>
            <Text small color="error">
              5 failed
            </Text>
          </Card.Body>
        </Card>
      </Flex>

      {/* Revenue Trend Chart */}
      <Card css={{ mt: "20px" }}>
        <Card.Body>
          <Text h4>Revenue Trend</Text>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      {/* Search and Actions */}
      <Flex
        css={{ gap: "16px", mt: "20px" }}
        align={"center"}
        justify={"between"}
        wrap={"wrap"}
      >
        <Flex
          css={{
            gap: "12px",
            flexWrap: "wrap",
            "@sm": { flexWrap: "nowrap" },
          }}
          align={"center"}
        >
          <Input
            css={{ width: "100%", maxWidth: "410px" }}
            placeholder="Search payments"
          />
          <Dropdown>
            <Dropdown.Button flat>Filter</Dropdown.Button>
            <Dropdown.Menu aria-label="Filter Actions">
              <Dropdown.Item key="completed">Completed</Dropdown.Item>
              <Dropdown.Item key="pending">Pending</Dropdown.Item>
              <Dropdown.Item key="failed">Failed</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Flex>
        <Flex direction={"row"} css={{ gap: "12px" }} wrap={"wrap"}>
          <AddPayment />
          <Button auto>Export to CSV</Button>
        </Flex>
      </Flex>

      {/* Payment Table */}
      <TableWrapper data={tableData} onPageChange={handlePageChange} />
    </Flex>
  );
};
