import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Stack,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  targetId: string;
};

interface NavBarProps {
  scrollOffset?: number;
}

const NavBar: React.FC<NavBarProps> = ({ scrollOffset = 70 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      targetId: "dashboard-section",
    },
    {
      label: "Live Charts",
      icon: <TimelineIcon />,
      targetId: "charts-section",
    },
    {
      label: "About System",
      icon: <InfoOutlinedIcon />,
      targetId: "about-section",
    },
  ];

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleNavigate = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementTop - scrollOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 1.5, md: 4 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {/* Left section */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ flexGrow: 1 }}
          >
            {/* Menu icon only on mobile */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open navigation"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo box */}
            <Box
              sx={{
                width: isMobile ? 28 : 34,
                height: isMobile ? 28 : 34,
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WhatshotIcon fontSize={isMobile ? "small" : "medium"} />
            </Box>

            {/* Project title */}
            <Box>
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                sx={{ fontWeight: 600, lineHeight: 1 }}
              >
                IOT Project
              </Typography>
              {!isMobile && (
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  Fire & Smoke Detection Dashboard
                </Typography>
              )}
              {isMobile && (
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  Fire & Smoke
                </Typography>
              )}
            </Box>

            {/* Desktop nav items */}
            {!isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Stack direction="row" spacing={3}>
                  {navItems.map((item) => (
                    <Box
                      key={item.label}
                      onClick={() => handleNavigate(item.targetId)}
                      sx={{
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: 500,
                        position: "relative",
                        transition: "0.25s ease",
                        paddingBottom: "4px",

                        "&:hover": {
                          color: "#fff",
                        },

                        "&::after": {
                          content: "''",
                          position: "absolute",
                          left: 0,
                          bottom: 0,
                          width: "0%",
                          height: "2px",
                          borderRadius: "4px",
                          backgroundColor: "white",
                          transition: "width 0.3s ease",
                        },

                        "&:hover::after": {
                          width: "100%",
                        },
                      }}
                    >
                      {item.label}
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>

          {/* Right section */}
          <Stack direction="row" spacing={isMobile ? 1 : 2} alignItems="center">
            <IconButton color="inherit" size={isMobile ? "small" : "medium"}>
              <NotificationsNoneIcon />
            </IconButton>

            {!isMobile && (
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Operator
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Monitoring Online
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: 14,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(0,0,0,0.1))",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  MU
                </Avatar>
              </Stack>
            )}

            {isMobile && (
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  fontSize: 12,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(0,0,0,0.1))",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                MU
              </Avatar>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 260,
            backgroundColor: "#080b16",
            color: "#fff",
          },
        }}
      >
        <Box
          sx={{ p: 2.5, pb: 1.5 }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WhatshotIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                IOT Project
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                Fire & Smoke Monitoring
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <List sx={{ py: 1 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => handleNavigate(item.targetId)}
              sx={{
                px: 2.5,
                py: 1.1,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.06)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: 38,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
