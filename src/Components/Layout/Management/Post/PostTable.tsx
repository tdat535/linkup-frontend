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

// Define the Post interface
interface Post {
  id: string;
  user_id: string;
  content: string;
  img_url: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

const PostTable: React.FC = () => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  // Sample static data
  const [posts, setPosts] = useState<Post[]>([
    { id: '1', user_id: '2', img_url: 'hình 1', content: 'Hôm nay cảm giác mình quá đẹp trai', createdAt: '2023-01-01', status: 'active' },
    { id: '2', user_id: '3', img_url: 'hình 2', content: 'Hôm nay cảm giác mình quá đẹp trai', createdAt: '2023-02-15', status: 'active' },
    { id: '3', user_id: '4', img_url: 'hình 3', content: 'Hôm nay cảm giác mình quá đẹp trai', createdAt: '2023-03-22', status: 'inactive' },
  ]);
  
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Partial<Post> | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({
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
        field: 'id', 
        headerName: 'Post ID', 
        flex: 1,
        minWidth: 120 
      },
      { 
        field: 'user_id', 
        headerName: 'User ID', 
        flex: 1,
        minWidth: 180,
      },
      { 
        field: 'img_url', 
        headerName: 'Hình ảnh/Video', 
        flex: 0.7,
        minWidth: 100,
      },
      { 
        field: 'content', 
        headerName: 'Nội dung bài đăng', 
        flex: 0.7,
        minWidth: 120,
      },
      { 
        field: 'createdAt', 
        headerName: 'Tạo vào lúc', 
        flex: 0.7,
        minWidth: 120,
      },
      { 
        field: 'status', 
        headerName: 'Tình trạng', 
        flex: 0.7,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams<Post>) => (
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
        headerName: 'Hành động', 
        sortable: false, 
        width: 120,
        renderCell: (params: GridRenderCellParams<Post>) => (
          <Box>
            <IconButton size={isMobile ? "small" : "medium"} color="primary" onClick={() => handleOpenDialog(params.row)}>
              <EditIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            <IconButton size={isMobile ? "small" : "medium"} color="error" onClick={() => handleDeletePost(params.row.id)}>
              <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Box>
        )
      },
    ];
    
    setColumns(responsiveColumns);
  }, [isMobile, isTablet]);

  const handleOpenDialog = (post: Partial<Post> | null = null) => {
    setCurrentPost(post || { content: '', img_url: '', status: 'active' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPost(null);
  };

  const handleSavePost = () => {
    if (!currentPost || !currentPost.content || !currentPost.img_url) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    if (currentPost.id) {
      // Update existing post in our local state
      setPosts(posts.map(post => 
        post.id === currentPost.id ? { ...post, ...currentPost } as Post : post
      ));
      setSnackbar({
        open: true,
        message: 'Post updated successfully',
        severity: 'success'
      });
    } else {
      // Create new post in our local state
      const newPost = {
        ...currentPost,
        post_id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      } as Post;
      
      setPosts([...posts, newPost]);
      setSnackbar({
        open: true,
        message: 'Post created successfully',
        severity: 'success'
      });
    }
    
    handleCloseDialog();
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
      setSnackbar({
        open: true,
        message: 'Post deleted successfully',
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
        <Typography variant="h5" component="h2">
          Quản lý bài đăng
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          size={isMobile ? "small" : "medium"}
          fullWidth={isMobile}
        >
          Thêm bài đăng
        </Button>
      </Box>

      <Paper sx={{ height: { xs: 350, sm: 400 }, width: '100%' }}>
        <DataGrid
          rows={posts}
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

      {/* Post Form Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          {currentPost?.id ? 'Chỉnh sửa bài đăng' : 'Thêm bài đăng mới'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nội dung bài đăng"
              value={currentPost?.content || ''}
              onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="URL Hình ảnh/Video"
              value={currentPost?.img_url || ''}
              onChange={(e) => setCurrentPost({ ...currentPost, img_url: e.target.value })}
            />
            <TextField
              margin="normal"
              fullWidth
              select
              label="Trạng thái"
              value={currentPost?.status || 'active'}
              onChange={(e) => setCurrentPost({ 
                ...currentPost, 
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
          <Button onClick={handleSavePost} variant="contained" color="primary" fullWidth={isMobile}>
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

export default PostTable;