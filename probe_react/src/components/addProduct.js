// import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import axios from 'axios';

import { useEffect, useState } from 'react';

const theme = createTheme();

export default function AddProduct() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    // const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        const fetchCategories = async() => {
            try {
                const response = await axios.get('http://localhost:8000/store/categories/');
                setCategories(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, [])

    const handleSubmit = (event) => {
        // event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     category: category,
        //     product: data.get('product'),
        // });
        const productData = {
            categoryId: category,
            product: data.get('product'),
        }

        axios.post('http://localhost:8000/store/postproduct/', productData)
            .then(response => console.log(response.status, response.data))
    };

    const handleChange = (event) => {
        setCategory(event.target.value)
    }

    return(
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop:8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component='h1' variant='h5'>
                        Adaugati Product
                    </Typography>
                    <Box 
                        component='form' 
                        onSubmit={handleSubmit} 
                        // noValidate
                        sx={{
                                mt: 1,
                                backgroundColor: 'white',
                                padding: '1em 3em 1em 3em',
                                borderRadius: '10px',
                        }}
                    >
                        {/* <TextField
                            margin='normal'
                            required
                            fullWidth
                            label="Categorie"
                            name="category"
                            autoFocus
                            // sx={{backgroundColor: 'white'}}
                            // color='warning'
                        /> */}
                        <FormControl 
                            fullWidth
                            // variant='standard'
                        >
                            <InputLabel id="demo-simple-select-label">Categorie *</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                onChange={handleChange}
                                label="Categorie"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {
                                    categories.map(category =>
                                        <MenuItem 
                                            key={category.id} 
                                            value={category.id}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='product'
                            label="Product"
                            // sx={{borderColor: 'white'}}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Trimiteti date
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}