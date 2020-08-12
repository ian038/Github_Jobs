import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Chip, CardActions, Button, Collapse } from '@material-ui/core'
import Reactmarkdown from 'react-markdown'
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    body: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    pos: {
        marginBottom: 12
    },
    space: {
        marginRight: 2
    }
})

export default function Job({ job }) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleOpenClick = () => {
        setOpen(!open)
    }

    return (
        <Card variant="outlined" className={classes.root}>
            <CardContent>
                <div className={classes.body}>
                    <div>
                        <Typography variant="h6" component="h6">
                            {job.title} - <span style={{ color: "#888888" }}>{job.company}</span>              
                        </Typography>
                        <Typography className={classes.pos}>
                            {new Date(job.created_at).toLocaleDateString()}
                        </Typography>
                        <Chip className={classes.space} size="small" label={job.type} />
                        <Chip size="small" label={job.location} />
                        <div style={{ wordBreak: 'break-all' }} >
                            <Reactmarkdown source={job.how_to_apply} />
                        </div>
                    </div>
                    <img display={{ sm: 'none', md: 'block' }} height="50" alt={job.company} src={job.company_logo} />
                    </div>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={handleOpenClick}>
                            {open ? 'Hide Details' : 'View Details'}
                        </Button>
                    </CardActions>
                <Collapse in={open}>
                    <div style={{ marginTop: 4 }} >
                        <ReactMarkdown source={job.description} />
                    </div>
                </Collapse>
            </CardContent>
        </Card>
    )
}
