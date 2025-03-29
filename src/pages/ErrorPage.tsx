import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  message?: string;
  code?: string | number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ 
  message = "Đã có lỗi xảy ra trong quá trình tải dữ liệu.",
  code = "404"
}) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 5, 
          borderRadius: 2, 
          textAlign: 'center',
          border: '1px solid #eaeaea',
          width: '100%'
        }}
      >
        <Typography 
          variant="h1" 
          color="error" 
          sx={{ 
            fontWeight: 700, 
            fontSize: { xs: '4rem', sm: '6rem' },
            mb: 2
          }}
        >
          {code}
        </Typography>
        
        <Typography 
          variant="h5" 
          color="text.secondary" 
          gutterBottom
          sx={{ mb: 4 }}
        >
          {message}
        </Typography>
        
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2}
          justifyContent="center"
        >
          <Button 
            variant="outlined" 
            onClick={() => navigate(-1)} 
            size="large"
            sx={{ minWidth: 150 }}
          >
            ← Quay lại
          </Button>
          
          <Button 
            variant="contained" 
            onClick={() => navigate("/home")} 
            size="large"
            sx={{ minWidth: 150 }}
          >
            Trang chủ
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ErrorPage;