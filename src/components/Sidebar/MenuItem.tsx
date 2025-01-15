import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled, useTheme } from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import { SidebarContext } from "./Sidebar";
import CircleOutlined from "@mui/icons-material/CircleOutlined";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

type MenuItemProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  link?: string;
  badge?: boolean;
  badgeColor?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  badgeContent?: string;
  textFontSize?: string;
  borderRadius?: string;
  disabled?: boolean;
  badgeType?: "filled" | "outlined";
  target?: string;
  end?: boolean;
};

export const MenuItem = React.forwardRef<HTMLAnchorElement, MenuItemProps>(
  (
    {
      children,
      icon,
      link = "#",
      badge = false,
      badgeColor = "secondary",
      badgeContent = "6",
      textFontSize = "14px",
      borderRadius = "8px",
      disabled = false,
      badgeType = "filled",
      target = "",
      end = false,
    },
    ref
  ) => {
    const customizer = React.useContext(SidebarContext);
    const theme = useTheme();
  

   
    const resolvedPath = useResolvedPath(link);
    
    const match = useMatch({ path: resolvedPath.pathname, end });

    const isActive = !!match;

    const ListItemStyled = styled(ListItemButton)(() => ({
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "10px 12px",
      textAlign: theme.direction === 'ltr' ? 'left' : 'right',
      borderRadius: borderRadius,
      color: customizer.textColor,
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? "0.6" : "1",
      ".MuiListItemIcon-root": {
        color: customizer.textColor,
      },
      "&:hover": {
        backgroundColor: disabled ? "#fff" : customizer.themeColor + 20,
        color: customizer.themeColor,
        ".MuiListItemIcon-root": {
          color: customizer.themeColor,
        },
      },
      '&.Mui-selected': {
        color: 'white',
        backgroundColor: customizer.themeColor,
        '&:hover': {
          backgroundColor: customizer.themeColor,
          color: 'white',
        },
        ".MuiListItemIcon-root": {
          color: "#fff",
        },
      },
    }));

    const ListIconStyled = styled(ListItemIcon)(() => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      marginBottom: "0px",
      padding: "0px 0px",
      cursor: "pointer",
      marginLeft: "-10px",
      color: "inherit",
    }));

    return (
      <Box>
        <ListItemStyled
          component={NavLink}
          to={link}
          ref={ref}
          target={target}
          disabled={disabled}
          sx={{ display: "flex", gap: "15px" }}
          // The 'selected' prop is managed by 'isActive'
          selected={isActive}
        >
          <ListIconStyled sx={{ minWidth: "0px" }}>
            {icon ? icon : <CircleOutlined />}
          </ListIconStyled>
          {!customizer.isCollapse && (
            <>
              <ListItemText sx={{ my: 0 }}>
                <Typography
                  fontSize={textFontSize}
                  sx={{ lineHeight: "1" }}
                  variant="caption"
                >
                  {children}
                </Typography>
              </ListItemText>

              {badge && (
                <Chip
                  label={badgeContent}
                  color={badgeColor}
                  variant={badgeType}
                  size="small"
                />
              )}
            </>
          )}
        </ListItemStyled>
      </Box>
    );
  }
);
