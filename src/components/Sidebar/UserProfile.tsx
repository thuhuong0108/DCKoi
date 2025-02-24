import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useTheme } from '@mui/material';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import { useNavigate } from 'react-router-dom'; 
import { useAppDispatch } from '@/redux/store/hook';
import { authActions } from '@/redux/slices/auth/authSlices';

interface ProfileProps {
    userName?: string;
    designation?: string;
    userimg?: string;
    isCollapse?: boolean;
}

export const Profile = React.forwardRef<HTMLDivElement, ProfileProps>(({
    userName = "",
    designation = "",
    userimg = "",
    isCollapse = false
}, ref) => {
    const theme = useTheme();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      dispatch(authActions.logout());
      navigate("/login");
    }

    return (
        <Box>
            {isCollapse ? '' :
                <Box
                    display={'flex'}
                    alignItems="center"
                    gap={2}
                    sx={{ m: 3, p: 2, borderRadius: '8px', bgcolor: theme.palette.secondary.main + 20 }}
                >
                    <Avatar alt="Remy Sharp" src={userimg} />

                    <Box>
                        <Typography variant="h6">{userName}</Typography>
                        <Typography variant="caption" color="textSecondary">
                            {designation}
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                        <Tooltip title="Logout" placement="top">
                                <IconButton
                                    color="primary"
                                    aria-label="logout"
                                    size="small"
                                    onClick={handleLogout}
                                >
                                    <AlbumOutlinedIcon />
                                </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            }
        </Box>
    );
});