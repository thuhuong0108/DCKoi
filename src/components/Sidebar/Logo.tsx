import * as React from "react";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SidebarContext } from "./Sidebar";
import ImgLogo from "@/assets/images/logo.png";
type LogoProps = {
  children: React.ReactNode;
  img?: string;
};

export const Logo = React.forwardRef<HTMLAnchorElement, LogoProps>(
  ({ children, img = ImgLogo }, ref) => {
    const customizer = React.useContext(SidebarContext);

    const LogoStyled = styled(Link)(() => ({
      whiteSpace: "nowrap",
      overflow: customizer.isCollapse ? "hidden" : "visible",
      WebkitLineClamp: "1",
      fontSize: "2rem",
      padding: "15px 22px",
      textOverflow: "ellipsis",
    }));

    return (
      <LogoStyled ref={ref}>
        {img === "" ? (
          <Typography variant="body1">{children}</Typography>
        ) : (
          <Box
            component="img"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "200px",
            }}
            src={img}
          />
        )}
      </LogoStyled>
    );
  }
);
