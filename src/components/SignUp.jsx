import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  LinearProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";

const calculatePasswordStrength = (password) => {
  let strength = 0;

  if (!password) return { strength: 0, label: "Weak", color: "red" };

  // Check for various password strength criteria
  if (password.length >= 8) strength += 1; // Length
  if (/[A-Z]/.test(password)) strength += 1; // Uppercase letter
  if (/[a-z]/.test(password)) strength += 1; // Lowercase letter
  if (/[0-9]/.test(password)) strength += 1; // Number
  if (/[@$!%*?&#]/.test(password)) strength += 1; // Special character

  if (strength <= 2) return { strength: 20, label: "Weak", color: "red" };
  if (strength <= 4) return { strength: 60, label: "Moderate", color: "orange" };
  return { strength: 100, label: "Strong", color: "green" };
};

const SignUp = () => {
  const [passwordInfo, setPasswordInfo] = useState({
    strength: 0,
    label: "Weak",
    color: "red",
  });
  const [passwordTouched, setPasswordTouched] = useState(false); // Track if user interacted with the password field

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const handleSubmit = (values) => {
    console.log("Signup Details:", values);
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
            <Typography variant="h5" color="primary" sx={{ mt: 2, fontWeight: 600 }}>
              Sign up
            </Typography>
            <Typography color="text.secondary">
              Enter your credentials to continue
            </Typography>
          </Box>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange }) => (
              <Form>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="firstName"
                    label="First Name"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Box>
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
                  onFocus={() => setPasswordTouched(true)} // Mark password field as touched when focused
                  onChange={(e) => {
                    handleChange(e);
                    setPasswordInfo(calculatePasswordStrength(e.target.value));
                  }}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                {/* Show password strength indicator only if the user has interacted with the password field */}
                {passwordTouched && (
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography variant="caption" sx={{ color: passwordInfo.color,  mr: 1, }}>
                      {passwordInfo.label}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={passwordInfo.strength}
                      sx={{
                        width: "17%",
                        height: 8,
                        borderRadius: 1,
                        backgroundColor: "grey.300",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: passwordInfo.color,
                        },
                      }}
                    />
                  </Box>
                )}
                <FormControlLabel
                  control={<Field as={Checkbox} name="terms" />}
                  label={
                    <>
                      Agree with{" "}
                      <Link href="#" underline="hover">
                        Terms & Condition
                      </Link>
                    </>
                  }
                  sx={{ mt: 2 }}
                  error={touched.terms && Boolean(errors.terms)}
                  helperText={touched.terms && errors.terms}
                />
                {touched.terms && errors.terms && (
                  <Typography color="error">{errors.terms}</Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, textTransform: "none" }}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
          <Typography textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/" underline="hover">
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUp;
