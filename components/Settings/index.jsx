import {
  Button,
  Card,
  Grid,
  Input,
  Link,
  Spacer,
  Switch,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

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

// Define the Settings page
export const Settings = () => {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] =
    useState(true);
  const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] =
    useState(true);
  const [profileData, setProfileData] = useState({
    name: "Amr Samir",
    email: "AmrSamir@example.com",
    bio: "Software Engineer with a passion for building scalable applications.",
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSaveProfile = () => {
    alert("Profile saved successfully!");
  };

  const handleChangePassword = () => {
    alert("Password change initiated!");
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
        backgroundColor: "#1a1a1a", // Dark mode enforced
        color: "#ffffff", // Light text for dark mode
        minHeight: "100vh", // Full height
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
          <span>⚙️</span> {/* Replace with your SettingsIcon */}
          <CrumbLink href="#">Settings</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>Settings</Text>

      {/* User Profile Section */}
      <Card css={{ mt: "20px", backgroundColor: "#333333" }}>
        <Card.Body>
          <Text h4>Profile Settings</Text>
          <Grid.Container gap={2}>
            <Grid xs={12} sm={6}>
              <Input
                label="Name"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                fullWidth
                css={{ backgroundColor: "#444444", color: "#ffffff" }}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Input
                label="Email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                fullWidth
                css={{ backgroundColor: "#444444", color: "#ffffff" }}
              />
            </Grid>
            <Grid xs={12}>
              <Textarea
                label="Bio"
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                fullWidth
                css={{ backgroundColor: "#444444", color: "#ffffff" }}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={1} />
          <Button auto onClick={handleSaveProfile}>
            Save Profile
          </Button>
        </Card.Body>
      </Card>

      {/* Security Settings Section */}
      <Card css={{ mt: "20px", backgroundColor: "#333333" }}>
        <Card.Body>
          <Text h4>Security Settings</Text>
          <Flex direction="column" gap="10px">
            <Flex align="center" justify="between">
              <Text>Two-Factor Authentication</Text>
              <Switch
                checked={isTwoFactorEnabled}
                onChange={() => setIsTwoFactorEnabled(!isTwoFactorEnabled)}
              />
            </Flex>
            <Flex align="center" justify="between">
              <Text>Change Password</Text>
              <Button auto onClick={handleChangePassword}>
                Change Password
              </Button>
            </Flex>
          </Flex>
        </Card.Body>
      </Card>

      {/* Notification Preferences Section */}
      <Card css={{ mt: "20px", backgroundColor: "#333333" }}>
        <Card.Body>
          <Text h4>Notification Preferences</Text>
          <Flex direction="column" gap="10px">
            <Flex align="center" justify="between">
              <Text>Email Notifications</Text>
              <Switch
                checked={isEmailNotificationsEnabled}
                onChange={() =>
                  setIsEmailNotificationsEnabled(!isEmailNotificationsEnabled)
                }
              />
            </Flex>
            <Flex align="center" justify="between">
              <Text>Push Notifications</Text>
              <Switch
                checked={isPushNotificationsEnabled}
                onChange={() =>
                  setIsPushNotificationsEnabled(!isPushNotificationsEnabled)
                }
              />
            </Flex>
          </Flex>
        </Card.Body>
      </Card>

      {/* Team Settings Section */}
      <Card css={{ mt: "20px", backgroundColor: "#333333" }}>
        <Card.Body>
          <Text h4>Team Settings</Text>
          <Flex direction="column" gap="10px">
            <Input
              label="Team Name"
              placeholder="Enter team name"
              fullWidth
              css={{ backgroundColor: "#444444", color: "#ffffff" }}
            />
            <Input
              label="Team Email"
              placeholder="Enter team email"
              fullWidth
              css={{ backgroundColor: "#444444", color: "#ffffff" }}
            />
            <Textarea
              label="Team Description"
              placeholder="Enter team description"
              fullWidth
              css={{ backgroundColor: "#444444", color: "#ffffff" }}
            />
          </Flex>
          <Spacer y={1} />
          <Button auto>Save Team Settings</Button>
        </Card.Body>
      </Card>

      {/* Advanced Settings Section */}
      <Card css={{ mt: "20px", backgroundColor: "#333333" }}>
        <Card.Body>
          <Text h4>Advanced Settings</Text>
          <Flex direction="column" gap="10px">
            <Flex align="center" justify="between">
              <Text>Enable Beta Features</Text>
              <Switch />
            </Flex>
            <Flex align="center" justify="between">
              <Text>Enable Analytics</Text>
              <Switch />
            </Flex>
            <Flex align="center" justify="between">
              <Text>Enable Debug Mode</Text>
              <Switch />
            </Flex>
          </Flex>
        </Card.Body>
      </Card>
    </Flex>
  );
};
