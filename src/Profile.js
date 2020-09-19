import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import {
  Button,
  MenuItem,
  Paper,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import userEvent from "@testing-library/user-event";
import { Link } from "react-router-dom";

const validationSchema = yup.object({
  fname: yup.string().label("first name").required().min(3),
  lname: yup.string().label("last name").required().min(3),
  date: yup.string().label("date").required(),
  occupation: yup.string().label("occupation").required(),
});

const useStyles = makeStyles(() => ({
  header: {
    margin: "50px",
  },
  paper: {
    padding: "30px",
  },
  fields: {
    width: "100%",
    marginBottom: "10px",
  },
  btn: {
    textAlign: "center",
    marginTop: "30px",
  },
  info: {
    margin: "20px 0px",
  },
}));

const Signup = ({ match }) => {
  const classes = useStyles();
  const { name } = match.params;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    date: "",
    occupation: "",
  });

  return (
    <Container>
      <Typography variant="h4" align="center" color="primary">
        {name}'s Profile
      </Typography>
      <Link to="/" className={classes.header}>
        <Typography variant="h5" align="center">
          Go Back
        </Typography>
      </Link>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5" align="center" color="textSecondary">
              Update Profile
            </Typography>
            <Typography variant="caption" align="center" color="error">
              Just a formik and yup demo. Form data will not be stored
            </Typography>
            <Formik
              initialValues={{
                fname: "",
                lname: "",
                date: "",
                occupation: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, action) => {
                // console.log(values);
                setLoading(true);
                setTimeout(() => {
                  setUser({
                    ...userEvent,
                    fname: values.fname,
                    lname: values.lname,
                    date: values.date,
                    occupation: values.occupation,
                  });
                  action.resetForm();
                  setLoading(false);
                }, 1000);
              }}
            >
              {(props) => (
                <Form className={classes.form}>
                  {/* First Name, Last Name */}
                  <Grid item container>
                    <Grid item sm={5} xs={12}>
                      <Field
                        name="fname"
                        label="First Name"
                        component={TextField}
                        className={classes.fields}
                      />
                    </Grid>
                    <Grid item sm={2} />
                    <Grid item sm={5} xs={12}>
                      <Field
                        name="lname"
                        label="Last Name"
                        component={TextField}
                        className={classes.fields}
                      />
                    </Grid>
                  </Grid>
                  {/* Date of Birth */}
                  <Field
                    name="date"
                    label="Date of birth"
                    component={TextField}
                    type="date"
                    id="date"
                    fullWidth
                    className={classes.fields}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {/* Occupation */}
                  <Field
                    select
                    name="occupation"
                    label="Occupation"
                    component={TextField}
                    className={classes.fields}
                  >
                    <MenuItem value="Businessman">Businessman</MenuItem>
                    <MenuItem value="Job">Job</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                  </Field>
                  <div className={classes.btn}>
                    <Button
                      onClick={props.handleSubmit}
                      variant="contained"
                      color="primary"
                      disabled={loading}
                    >
                      {loading ? "Updating" : "Update"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Typography variant="h5" align="center">
            User Info
          </Typography>
          {user.fname !== "" && (
            <>
              <Grid item container className={classes.info}>
                <Grid item xs={6}>
                  First Name
                </Grid>
                <Grid item xs={6}>
                  {user.fname}
                </Grid>
              </Grid>
              <Grid item container className={classes.info}>
                <Grid item xs={6}>
                  Last Name
                </Grid>
                <Grid item xs={6}>
                  {user.lname}
                </Grid>
              </Grid>
              <Grid item container className={classes.info}>
                <Grid item xs={6}>
                  Date of birth
                </Grid>
                <Grid item xs={6}>
                  {user.date}
                </Grid>
              </Grid>
              <Grid item container className={classes.info}>
                <Grid item xs={6}>
                  Occupation
                </Grid>
                <Grid item xs={6}>
                  {user.occupation}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
