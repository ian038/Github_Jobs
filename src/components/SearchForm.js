import React from 'react'
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';

export default function SearchForm({ params, onParamChange}) {
    return (
        <form style={{ marginBottom: 25 }} noValidate>
            <TextField 
            label="Description" 
            onChange={onParamChange} 
            value={params.description} 
            name="description" 
            size="small" 
            variant="outlined"
            style={{ marginRight: 10 }}/>

            <TextField 
            label="Location" 
            onChange={onParamChange} 
            value={params.location} 
            name="location" 
            size="small" 
            variant="outlined"/>

            <FormControlLabel
            control={<Checkbox 
                        onChange={onParamChange} 
                        value={params.full_time} 
                        name="full_time" 
                        id="full-time"
                        color="primary"/>}
            label="Only Full Time"
            style={{ marginLeft: 5 }}/>
        </form>
    )
}
