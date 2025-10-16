import React, { useState } from 'react'
import { TextField, Button, Typography, Grid, Box, Paper } from '@mui/material';
import API from '../api';

const DoctorForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        location: '',
        experience: '',
        email: '',
        image: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {res} = await API.post('/doctors/add', formData);
            console.log("Doctor added", res);
            alert('Doctor has been added successfully!');
        }catch(error){
            console.log('Failed to add Doctor!', error);
            // alert('Failed to add the doctor')
        }
    }
    return (
        <Box sx={{minHeight:"100vh"}}>
        <Box sx={{maxWidth:500, margin: 'auto', mt: 5 ,mb:10,p:6}} component={Paper}>
            <Typography variant="h4" align="center" gutterBottom>
                Add New Doctor
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <TextField
                            label="Experience (Years)"
                            name="experience"
                            type="number"
                            value={formData.experience}
                            onChange={handleChange}
                            fullWidth
                            required
                            inputProps={{ min: 1 }}
                        />
                    </Grid>
                     <Grid item xs={12}>
                        <TextField
                            label="Image "
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Add Doctor
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Box>
        </Box>
    );
};

export default DoctorForm;
