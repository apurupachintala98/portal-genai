import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import logo from '../assets/images/logo.svg';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // Retrieve saved credentials from localStorage
  const savedEmail = localStorage.getItem("email") || "";
  const savedPassword = localStorage.getItem("password") || "";

  // Validation Schema for Formik
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle Form Submission
  const handleSubmit = (values) => {
    console.log("Login Details:", values);

    // Save credentials if "Remember Me" is checked
    if (values.remember) {
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
    } else {
      // Clear credentials if "Remember Me" is unchecked
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    // Simple hardcoded validation logic
    if (values.email === "admin@example.com" && values.password === "password123") {
      setIsLoggedIn(true); // Set login state
      navigate("/home"); // Navigate to the home page
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh", backgroundColor: "background.default" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box textAlign="center">
            <img src={logo} alt="Logo" width={180} />
            <Typography variant="h5" color="primary" sx={{ mt: 2, fontWeight: 600 , color: "#1a3673", fontSize: "1rem"}}>
              Hi, Welcome to Elevance Health Data Intelligence Platform
            </Typography>
            <Typography color="text.secondary">
              Enter your credentials to continue
            </Typography>
          </Box>
          <Formik
            initialValues={{
              email: savedEmail,
              password: savedPassword,
              remember: savedEmail !== "", // Auto-check "Remember Me" if credentials exist
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label="Email Address / Username"
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  margin="normal"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <FormControlLabel
                    control={<Field as={Checkbox} name="remember" />}
                    label="Remember me"
                  />
                  <Link href="#" underline="hover" sx={{color: "#1a3673"}}>
                    Forgot Password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, textTransform: "none", background: "#1a3673" }}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
          <Typography textAlign="center" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Link component={RouterLink} to="/SignUp" underline="hover" sx={{color: "#1a3673"}}>
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
