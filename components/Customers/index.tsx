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
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
              Customer ID
            </th>
            <th
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Email
            </th>
            <th
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Phone
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
          {data.map((customer) => (
            <tr key={customer.id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {customer.id}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {customer.name}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {customer.email}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {customer.phone}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                <Badge
                  color={customer.status === "Active" ? "success" : "error"}
                >
                  {customer.status}
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

// Define the AddCustomer component
const AddCustomer = () => {
  return (
    <Dropdown>
      <Dropdown.Button flat color="primary" auto>
        Add Customer
      </Dropdown.Button>
      <Dropdown.Menu aria-label="Add Customer Actions">
        <Dropdown.Item key="new">New Customer</Dropdown.Item>
        <Dropdown.Item key="bulk">Bulk Upload</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Define the Customers page
export const Customers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for the table
  const tableData = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+123456789",
      status: "Active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+987654321",
      status: "Inactive",
    },
    {
      id: "3",
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1122334455",
      status: "Active",
    },
    // Add more rows as needed
  ];

  // Mock data for the customer growth chart
  const customerGrowthData = [
    { month: "Jan", customers: 100 },
    { month: "Feb", customers: 150 },
    { month: "Mar", customers: 200 },
    { month: "Apr", customers: 250 },
    { month: "May", customers: 300 },
    { month: "Jun", customers: 400 },
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
          <span>👥</span> {/* Replace with your CustomersIcon */}
          <CrumbLink href="#">Customers</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>All Customers</Text>

      {/* Customer Statistics Cards */}
      <Flex css={{ gap: "16px", mt: "20px" }} wrap={"wrap"}>
        <Card css={{ flex: 1, minWidth: "200px" }}>
          <Card.Body>
            <Text h4>Total Customers</Text>
            <Text h2>1,000</Text>
            <Text small color="success">
              +10% this month
            </Text>
          </Card.Body>
        </Card>
        <Card css={{ flex: 1, minWidth: "200px" }}>
          <Card.Body>
            <Text h4>Active Customers</Text>
            <Text h2>800</Text>
            <Text small color="success">
              80% active
            </Text>
          </Card.Body>
        </Card>
        <Card css={{ flex: 1, minWidth: "200px" }}>
          <Card.Body>
            <Text h4>Inactive Customers</Text>
            <Text h2>200</Text>
            <Text small color="error">
              20% inactive
            </Text>
          </Card.Body>
        </Card>
      </Flex>

      {/* Customer Growth Chart */}
      <Card css={{ mt: "20px" }}>
        <Card.Body>
          <Text h4>Customer Growth</Text>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="customers" fill="#8884d8" />
            </BarChart>
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
            placeholder="Search customers"
          />
          <Dropdown>
            <Dropdown.Button flat>Filter</Dropdown.Button>
            <Dropdown.Menu aria-label="Filter Actions">
              <Dropdown.Item key="active">Active</Dropdown.Item>
              <Dropdown.Item key="inactive">Inactive</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Flex>
        <Flex direction={"row"} css={{ gap: "12px" }} wrap={"wrap"}>
          <AddCustomer />
          <Button auto>Export to CSV</Button>
        </Flex>
      </Flex>

      {/* Customer Table */}
      <TableWrapper data={tableData} onPageChange={handlePageChange} />
    </Flex>
  );
};
