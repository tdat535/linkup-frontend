import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import { 
  DataGrid, 
  GridColDef, 
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

// Define the User interface
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
  status: 'active' | 'inactive';
}

const UserList: React.FC = () => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  // Sample static data
  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'admin', email: 'admin@example.com', role: 'Admin', createdAt: '2023-01-01', updatedAt:'2099-05-05', status: 'active' },
    { id: '2', username: 'user1', email: 'user1@example.com', role: 'User', createdAt: '2023-02-15',updatedAt:'2099-05-05', status: 'active' },
    { id: '3', username: 'editor', email: 'editor@example.com', role: 'Editor', createdAt: '2023-03-22',updatedAt:'2099-05-05', status: 'inactive' },
  ]);
  
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Responsive column definitions
  const [columns, setColumns] = useState<GridColDef[]>([]);
  
  useEffect(() => {
    // Define columns based on screen size
    const responsiveColumns: GridColDef[] = [
      { 
        field: 'username', 
        headerName: 'Tên tài khoản', 
        flex: 1,
        minWidth: 120 
      },
      { 
        field: 'email', 
        headerName: 'Email', 
        flex: 1,
        minWidth: 180,
      },
      { 
        field: 'role', 
        headerName: 'Vai trò', 
        flex: 0.7,
        minWidth: 100,
      },
      { 
        field: 'createdAt', 
        headerName: 'Tạo vào lúc', 
        flex: 0.7,
        minWidth: 120,
      },
      { 
        field: 'updatedAt', 
        headerName: 'Cập nhật lúc', 
        flex: 0.7,
        minWidth: 120,
      },
      { 
        field: 'status', 
        headerName: 'Tình trạng', 
        flex: 0.7,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams<User>) => (
          <Box
            component="span"
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              backgroundColor: params.value === 'active' ? 'success.light' : 'error.light',
              color: 'white',
              fontSize: '0.875rem',
            }}
          >
            {params.value === 'active' ? 'Active' : 'Inactive'}
          </Box>
        )
      },
      { 
        field: 'actions', 
        headerName: 'Trạng thái khác', 
        sortable: false, 
        width: 120,
        renderCell: (params: GridRenderCellParams<User>) => (
          <Box>
            <IconButton size={isMobile ? "small" : "medium"} color="primary" onClick={() => handleOpenDialog(params.row)}>
              <EditIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            <IconButton size={isMobile ? "small" : "medium"} color="error" onClick={() => handleDeleteUser(params.row.id)}>
              <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Box>
        )
      },
    ];
    
    setColumns(responsiveColumns);
  }, [isMobile, isTablet]);

  const handleOpenDialog = (user: Partial<User> | null = null) => {
    setCurrentUser(user || { username: '', email: '', role: 'User', status: 'active' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
  };

  const handleSaveUser = () => {
    if (!currentUser || !currentUser.username || !currentUser.email) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    if (currentUser.id) {
      // Update existing user in our local state
      setUsers(users.map(user => 
        user.id === currentUser.id ? { ...user, ...currentUser } as User : user
      ));
      setSnackbar({
        open: true,
        message: 'User updated successfully',
        severity: 'success'
      });
    } else {
      // Create new user in our local state
      const newUser = {
        ...currentUser,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      } as User;
      
      setUsers([...users, newUser]);
      setSnackbar({
        open: true,
        message: 'User created successfully',
        severity: 'success'
      });
    }
    
    handleCloseDialog();
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      setSnackbar({
        open: true,
        message: 'User deleted successfully',
        severity: 'success'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ width: '100%', p: { xs: 1, sm: 2 } }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mb: 2,
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          Quản lý người dùng
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          size={isMobile ? "small" : "medium"}
          fullWidth={isMobile}
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ height: { xs: 350, sm: 400 }, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: isMobile ? 5 : 10 },
            },
          }}
          pageSizeOptions={isMobile ? [5] : [5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{ 
            border: 0,
            '.MuiDataGrid-columnHeaders': {
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
            },
            '.MuiDataGrid-cell': {
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            },
            '.MuiDataGrid-columnHeaderTitle': {
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            },
            '.MuiDataGrid-footerContainer': {
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              gap: 1
            }
          }}
        />
      </Paper>

      {/* User Form Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          {currentUser?.id ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Tên người dùng"
              value={currentUser?.username || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={currentUser?.email || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            />
            <TextField
              margin="normal"
              fullWidth
              select
              label="Vai trò"
              value={currentUser?.role || 'User'}
              onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
              SelectProps={{
                native: true,
              }}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Editor">Editor</option>
            </TextField>
            <TextField
              margin="normal"
              fullWidth
              select
              label="Trạng thái"
              value={currentUser?.status || 'active'}
              onChange={(e) => setCurrentUser({ 
                ...currentUser, 
                status: e.target.value as 'active' | 'inactive' 
              })}
              SelectProps={{
                native: true,
              }}
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog} variant={isMobile ? "outlined" : "text"} fullWidth={isMobile}>Hủy</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary" fullWidth={isMobile}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ 
          bottom: { xs: 70, sm: 24 }, // Move snackbar up on mobile to avoid bottom nav
          width: { xs: '100%', sm: 'auto' }
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserList;