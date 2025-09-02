import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function PageLoading() {
  return (
    <div className='container center'>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress color='primary' />
      </Box>
      <br />
      <h2>Loading...</h2>
    </div>
  );
}
