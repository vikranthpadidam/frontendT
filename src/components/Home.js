import React from 'react';
import Navbar from './Navbar';
import Lists from './Lists';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Home = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h4" gutterBottom>
                Welcome to Student Planner
              </Typography>
              <Typography variant="body1" paragraph>
                Manage your tasks and keep yourselves updated!!
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Lists />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Home;