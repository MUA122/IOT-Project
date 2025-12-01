import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import type { TeamMember } from "../types/Team";

interface TeamMembersProps {
  members: TeamMember[];
}

const TeamMembers: React.FC<TeamMembersProps> = ({ members }) => {
  return (
    <Box sx={{ mt: 6, mb: 6, margin: 2 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 3,
        }}
      >
        Team Members
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {members.map((member) => (
          <Grid item xs={12} sm={6} md={3} key={member.id}>
            <Card
              sx={{
                textAlign: "center",
                background:
                  "radial-gradient(circle at top, rgba(255,255,255,0.07), rgba(0,0,0,0.3))",
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
                transition: "0.25s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: "rgba(255,255,255,0.25)",
                },
              }}
            >
              <CardContent>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{
                    width: 90,
                    height: 90,
                    margin: "0 auto",
                    mb: 2,
                    border: "2px solid rgba(255,255,255,0.4)",
                  }}
                />

                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {member.name}
                </Typography>

                {member.role && (
                  <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                    {member.role}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamMembers;
