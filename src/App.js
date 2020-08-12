import React, { useState } from 'react';
import useFectchData from './useFetchData'
import { Container, CircularProgress } from '@material-ui/core';

import Job from './components/Job'
import JobsPagination from './components/JobsPagination'
import SearchForm from './components/SearchForm'


function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { jobs, loading, error, hasNextPage } = useFectchData(params, page)

  const handleParamChange = (e) => {
     const param = e.target.name
     const value = e.target.value
     // reset to page 1
     setPage(1)
     setParams(prevParams => {
       return { ...prevParams, [param]: value }
     })
  }

  return (
    <Container style={{ margin: 4 }}>
      <h1>Github Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <CircularProgress />}
      {error && <h1>Error</h1>}
      {jobs.map(job => {
        return <Job key={job.id} job={job}/>
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
