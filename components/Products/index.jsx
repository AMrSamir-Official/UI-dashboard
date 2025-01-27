import {
  Badge,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Input,
  Modal,
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
const TableWrapper = ({ data, onPageChange, onSelectProduct }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(data.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      );
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Flex css={{ gap: "8px", mb: "10px" }}>
        <Checkbox onChange={handleSelectAll} />
        <Button
          auto
          size="sm"
          color="error"
          disabled={selectedProducts.length === 0}
        >
          Delete Selected
        </Button>
      </Flex>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            ></th>
            <th
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Product ID
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
              Category
            </th>
            <th
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Price
            </th>
            <th
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Stock
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
          {data.map((product) => (
            <tr key={product.id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                <Checkbox
                  isSelected={selectedProducts.includes(product.id)}
                  onChange={() => handleSelectProduct(product.id)}
                />
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {product.id}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {product.name}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {product.category}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {product.price}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {product.stock}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                <Badge
                  color={product.status === "In Stock" ? "success" : "error"}
                >
                  {product.status}
                </Badge>
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                <Button
                  auto
                  size="sm"
                  color="primary"
                  onClick={() => onSelectProduct(product)}
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
      <Spacer y={1} />
      <Pagination total={10} initialPage={1} onChange={onPageChange} />
    </div>
  );
};

// Define the AddProduct component
const AddProduct = () => {
  return (
    <Dropdown>
      <Dropdown.Button flat color="primary" auto>
        Add Product
      </Dropdown.Button>
      <Dropdown.Menu aria-label="Add Product Actions">
        <Dropdown.Item key="new">New Product</Dropdown.Item>
        <Dropdown.Item key="bulk">Bulk Upload</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Define the Products page
export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for the table
  const tableData = [
    {
      id: "1",
      name: "Product A",
      category: "Electronics",
      price: "$100",
      stock: 50,
      status: "In Stock",
    },
    {
      id: "2",
      name: "Product B",
      category: "Clothing",
      price: "$50",
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: "3",
      name: "Product C",
      category: "Home & Kitchen",
      price: "$200",
      stock: 20,
      status: "In Stock",
    },
    {
      id: "4",
      name: "Product D",
      category: "Electronics",
      price: "$150",
      stock: 10,
      status: "In Stock",
    },
    {
      id: "5",
      name: "Product E",
      category: "Clothing",
      price: "$75",
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: "6",
      name: "Product F",
      category: "Home & Kitchen",
      price: "$300",
      stock: 5,
      status: "In Stock",
    },
    // Add more rows as needed
  ];

  // Mock data for the product sales chart
  const productSalesData = [
    { month: "Jan", sales: 100 },
    { month: "Feb", sales: 150 },
    { month: "Mar", sales: 200 },
    { month: "Apr", sales: 250 },
    { month: "May", sales: 300 },
    { month: "Jun", sales: 400 },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Fetch data for the new page (you can implement this)
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
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
          <span>📦</span> {/* Replace with your ProductsIcon */}
          <CrumbLink href="#">Products</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>All Products</Text>

      {/* Product Statistics Cards */}
      <Flex css={{ gap: "16px", mt: "20px" }} wrap={"wrap"}>
        <Card css={{ flex: 1, minWidth: "200px" }}>
          <Card.Body>
            <Text h4>Total Products</Text>
            <Text h2>500</Text>
            <Text small color="success">
              +15% this month
            </Text>
          </Card.Body>
        </Card>
        <Card css={{ flex: 1, minWidth: "200px" }}>
          <Card.Body>
            <Text h4>In Stock</Text>
            <Text h2>400</Text>
            <Text small color="success">
              80% in stock
            </Text>
          </Card.Body>
        </Card>
        <Card css={{ flex: 1, minWidth: "200px" }}>
          <Card.Body>
            <Text h4>Out of Stock</Text>
            <Text h2>100</Text>
            <Text small color="error">
              20% out of stock
            </Text>
          </Card.Body>
        </Card>
      </Flex>

      {/* Product Sales Chart */}
      <Card css={{ mt: "20px" }}>
        <Card.Body>
          <Text h4>Product Sales</Text>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
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
            placeholder="Search products"
          />
          <Dropdown>
            <Dropdown.Button flat>Filter</Dropdown.Button>
            <Dropdown.Menu aria-label="Filter Actions">
              <Dropdown.Item key="in-stock">In Stock</Dropdown.Item>
              <Dropdown.Item key="out-of-stock">Out of Stock</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Flex>
        <Flex direction={"row"} css={{ gap: "12px" }} wrap={"wrap"}>
          <AddProduct />
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

      <TableWrapper
        data={tableData}
        onPageChange={handlePageChange}
        onSelectProduct={handleSelectProduct}
      />

      {/* Product Details Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          <Text h4>Product Details</Text>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <Text>ID: {selectedProduct.id}</Text>
              <Text>Name: {selectedProduct.name}</Text>
              <Text>Category: {selectedProduct.category}</Text>
              <Text>Price: {selectedProduct.price}</Text>
              <Text>Stock: {selectedProduct.stock}</Text>
              <Text>Status: {selectedProduct.status}</Text>
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
