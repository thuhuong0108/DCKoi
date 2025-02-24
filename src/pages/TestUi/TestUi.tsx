import React from "react";
import useForm from "@/hooks/useForm";
import { validateDemo } from "@/validations/validate";
import { Button, TextField, Typography, Box } from "@mui/material";

const TestUi = () => {
  const { loading, regField, regHandleSubmit } = useForm({
    values: { name: "", email: "", password: "" },
    validationSchema: validateDemo,
    onSubmit: async (values) => {},
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Box
        component="form"
        onSubmit={regHandleSubmit}
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
        Test Form
        </Typography>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          variant="outlined"
          {...regField("name")}
          error={Boolean(regField("name").error)}
          helperText={regField("name").error}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          variant="outlined"
          {...regField("email")}
          error={Boolean(regField("email").error)}
          helperText={regField("email").error}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          {...regField("password")}
          error={Boolean(regField("password").error)}
          helperText={regField("password").error}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </Button>
      </Box>
    </Box>
  );
};

export default TestUi;
