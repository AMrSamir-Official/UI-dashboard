import {
  Avatar,
  Button,
  Grid,
  Input,
  Link,
  Switch,
  Table,
  Text,
} from "@nextui-org/react";
import { useState } from "react";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export function Profile() {
  // State for editable fields
  const [name, setName] = useState("Amr Samir");
  const [email, setEmail] = useState("AmrSamir.dev@gmail.com");
  const [phone, setPhone] = useState("+20 1122636253");
  const [address, setAddress] = useState("123 Main St, Cairo, Egypt");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // Mock data for activity log
  const activities = [
    {
      id: "1",
      activity: "Logged in",
      date: "2023-10-01",
      device: "Chrome, Windows",
    },
    {
      id: "2",
      activity: "Updated profile",
      date: "2023-10-02",
      device: "Safari, macOS",
    },
  ];

  // Mock data for analytics
  const analyticsData = [
    { date: "2023-10-01", activity: 10 },
    { date: "2023-10-02", activity: 20 },
    { date: "2023-10-03", activity: 15 },
  ];

  return (
    <div className=" flex-col justify-center gap-2.5 p-5 min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex">
      {/* Main Container */}
      <div className="w-full max-w-5xl space-y-8">
        {/* Profile Header */}
        <div className=" flex-col items-center text-center space-y-4 flex">
          <Avatar
            src="/images/avatar/avatar-10.jpg"
            size="xl"
            bordered
            color="primary"
          />
          <Text h3>{name}</Text>
          <Text small color="gray">
            {email}
          </Text>
          <div className="flex gap-3 mt-4">
            <Link
              href="https://www.linkedin.com/in/amr-samir-a07790303"
              target="_blank"
            >
              <Button auto>LinkedIn</Button>
            </Link>
            <Link href="https://github.com/amrsamir-official" target="_blank">
              <Button auto>GitHub</Button>
            </Link>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Text h4 className="mb-4">
            Basic Information
          </Text>
          <Grid.Container gap={2}>
            <Grid xs={12} sm={6}>
              <Input
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Input
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Input
                fullWidth
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Input
                fullWidth
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
          </Grid.Container>
          <Button className="mt-6" onPress={() => alert("Changes saved!")}>
            Save Changes
          </Button>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Text h4 className="mb-4">
            Account Settings
          </Text>
          <Button className="mb-4">Change Password</Button>
          <div className="flex items-center gap-2">
            <Switch
              checked={is2FAEnabled}
              onChange={(e) => setIs2FAEnabled(e.target.checked)}
            />
            <Text>Enable Two-Factor Authentication</Text>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Text h4 className="mb-4">
            Recent Activity
          </Text>
          <Table>
            <Table.Header>
              <Table.Column>Activity</Table.Column>
              <Table.Column>Date</Table.Column>
              <Table.Column>Device</Table.Column>
            </Table.Header>
            <Table.Body>
              {activities.map((activity) => (
                <Table.Row key={activity.id}>
                  <Table.Cell>{activity.activity}</Table.Cell>
                  <Table.Cell>{activity.date}</Table.Cell>
                  <Table.Cell>{activity.device}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        {/* Analytics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Text h4 className="mb-4">
            User Activity
          </Text>
          <LineChart width={500} height={300} data={analyticsData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="activity" stroke="#8884d8" />
          </LineChart>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Text h4 className="mb-4">
            Security
          </Text>
          <Button className="mb-2">Log Out from All Devices</Button>
          <Button color="error">Notify Unauthorized Access</Button>
        </div>
      </div>
    </div>
  );
}
