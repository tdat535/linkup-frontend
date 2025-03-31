import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme as useMuiTheme,
  CircularProgress,
  Avatar, // Import CircularProgress
  Grid,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Visibility as VisibilityIcon,
  LockOpen as LockOpenIcon,
  LockOutline as LockOutlineIcon,
} from "@mui/icons-material";
import axios from "axios";

// Define the Post interface
interface Post {
  id: string;
  User: {
    id: number;
    username: string;
    avatar: string;
  };
  content: string;
  image: string;
  createdAt: string;
  status: string;
}

const PostTable: React.FC = () => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down("md"));

  // Sample static data
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Partial<Post> | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const getToken = () => {
    // Lấy token từ localStorage
    return localStorage.getItem("accessToken");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = getToken();
        console.log("Token:", token);
        const response = await axios.get(
          "https://api-linkup.id.vn/api/media/getAllMediaPost",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Dữ liệu bài viết từ API:", response.data);
        if (Array.isArray(response.data.data)) {
          setPosts(response.data.data);
        } else {
          throw new Error("Dữ liệu API không hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi tải bài đăng:", error);
        setError("Không thể tải bài đăng.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;

  // Responsive column definitions
  const [columns, setColumns] = useState<GridColDef[]>([]);

  useEffect(() => {
    // Define columns based on screen size
    const responsiveColumns: GridColDef[] = [
      {
        field: "id",
        headerName: "Post ID",
        flex: 0.5, // Chiều rộng nhỏ
        minWidth: 80, // Giới hạn chiều rộng tối thiểu
      },
      {
        field: "user_id",
        headerName: "User ID",
        flex: 0.5, // Chiều rộng nhỏ
        minWidth: 80, // Giới hạn chiều rộng tối thiểu
        renderCell: (params: GridRenderCellParams<Post>) => {
          const userId = params.row.User?.id;
          return <p>{userId}</p>;
        },
      },
      {
        field: "image",
        headerName: "Hình ảnh",
        flex: 1, // Cột hình ảnh vẫn chiếm diện tích khá lớn
        minWidth: 80, // Đặt chiều rộng tối thiểu của cột hình ảnh là 80px
        renderCell: (params: GridRenderCellParams<Post>) => {
          const imageUrl = params.row.image;
          if (!imageUrl) {
            return null; // Không render gì nếu không có imageUrl
          }

          return (
            <img
              src={imageUrl}
              alt="Image"
              style={{
                width: "80px", // Chiều rộng của hình ảnh
                height: "80px", // Chiều cao của hình ảnh
                objectFit: "contain", // Giữ tỷ lệ hình ảnh
              }}
            />
          );
        },
      },
      {
        field: "content",
        headerName: "Nội dung bài đăng",
        flex: 1.5,
        minWidth: 100,
      },
      {
        field: "createdAt",
        headerName: "Tạo vào lúc",
        flex: 1,
        minWidth: 150,
        renderCell: (params: GridRenderCellParams<Post>) => {
          const createdAt = params.row.createdAt;
          const date = new Date(createdAt);
          const formattedDate = date.toLocaleString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          return <p>{formattedDate}</p>;
        },
      },
      {
        field: "status",
        headerName: "Tình trạng",
        flex: 0.7,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams<Post>) => (
          <Box
            component="span"
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              backgroundColor:
                params.value === "active" ? "success.light" : "error.light",
              color: "white",
              fontSize: "0.875rem",
            }}
          >
            {params.value === "active" ? "Hiện thị" : "Đã Ẩn"}
          </Box>
        ),
      },
      {
        field: "actions",
        headerName: "Hành động",
        sortable: false,
        width: 120,
        renderCell: (params: GridRenderCellParams<Post>) => (
          <Box>
            <IconButton
              size={isMobile ? "small" : "medium"}
              color="primary"
              onClick={() => handleOpenDialog(params.row)}
            >
              <VisibilityIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            <IconButton
              size={isMobile ? "small" : "medium"}
              color="error"
              onClick={() =>
                handlePostStatusChange(params.row.id, params.row.status)
              } // Truyền vào postId và status hiện tại
            >
              {params.row.status === "active" ? (
                <LockOutlineIcon fontSize={isMobile ? "small" : "medium"} />
              ) : (
                <LockOpenIcon fontSize={isMobile ? "small" : "medium"} />
              )}
            </IconButton>
          </Box>
        ),
      },
    ];

    setColumns(responsiveColumns);
  }, [isMobile, isTablet]);

  const handleOpenDialog = (post: Partial<Post> | null = null) => {
    setCurrentPost(post || { content: "", image: "", status: "active" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPost(null);
  };

  // const handleSavePost = () => {
  //   if (!currentPost || !currentPost.content || !currentPost.image) {
  //     setSnackbar({
  //       open: true,
  //       message: "Please fill in all required fields",
  //       severity: "error",
  //     });
  //     return;
  //   }

  //   if (currentPost.id) {
  //     // Update existing post in our local state
  //     setPosts(
  //       posts.map((post) =>
  //         post.id === currentPost.id
  //           ? ({ ...post, ...currentPost } as Post)
  //           : post
  //       )
  //     );
  //     setSnackbar({
  //       open: true,
  //       message: "Post updated successfully",
  //       severity: "success",
  //     });
  //   } else {
  //     // Create new post in our local state
  //     const newPost = {
  //       ...currentPost,
  //       post_id: Date.now().toString(),
  //       createdAt: new Date().toISOString().split("T")[0],
  //     } as Post;

  //     setPosts([...posts, newPost]);
  //     setSnackbar({
  //       open: true,
  //       message: "Post created successfully",
  //       severity: "success",
  //     });
  //   }

  //   handleCloseDialog();
  // };

  const hidePost = async (postId: any) => {
    if (window.confirm("Bạn có chắc chắn muốn ẩn bài viết này không?")) {
      setLoading(true); // Bắt đầu loading
      try {
        const token = getToken();
        if (!token) throw new Error("Token không hợp lệ");

        const response = await axios.put(
          `https://api-linkup.id.vn/api/media/hidePost/${postId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          console.log("Bài viết đã được ẩn");

          // Cập nhật lại trạng thái bài viết trong state
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId ? { ...post, status: "inactive" } : post
            )
          );
        } else {
          console.error("Không thể ẩn bài viết");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API hide post:", error);
      } finally {
        setLoading(false); // Tắt loading
      }
    }
  };

  const unhidePost = async (postId: any) => {
    if (
      window.confirm("Bạn có chắc chắn muốn hiện thị lại bài viết này không?")
    ) {
      setLoading(true); // Bắt đầu loading
      try {
        const token = getToken();
        if (!token) throw new Error("Token không hợp lệ");

        const response = await axios.put(
          `https://api-linkup.id.vn/api/media/unHidePost/${postId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          console.log("Bài viết đã được hiển thị lại");

          // Cập nhật lại trạng thái bài viết trong state
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId ? { ...post, status: "active" } : post
            )
          );
        } else {
          console.error("Không thể hiển thị bài viết");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API unhide post:", error);
      } finally {
        setLoading(false); // Tắt loading
      }
    }
  };

  const handlePostStatusChange = async (postId: any, currentStatus: string) => {
    if (currentStatus === "active") {
      await hidePost(postId); // Nếu bài viết đang active thì gọi API hide
    } else {
      await unhidePost(postId); // Nếu bài viết đang ẩn thì gọi API unhide
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <Box sx={{ width: "100%", p: { xs: 1, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 2,
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography variant="h5" component="h2">
            Quản lý bài đăng
          </Typography>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 350,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Paper sx={{ height: { xs: 350, sm: 450 }, width: "100%" }}>
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
                ".MuiDataGrid-columnHeaders": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#333" : "#f5f5f5",
                },
                ".MuiDataGrid-cell": {
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                },
                ".MuiDataGrid-columnHeaderTitle": {
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                },
                ".MuiDataGrid-footerCell": {
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                },
              }}
            />
          </Paper>
        )}

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{ fontWeight: "bold", fontSize: 24, textAlign: "center" }}
          >
            Chi tiết bài đăng
          </DialogTitle>
          <DialogContent
            sx={{
              padding: 3,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Hình ảnh bài viết */}
            <Box
              sx={{
                width: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 3,
                borderRadius: 2,
                padding: 2,
              }}
            >
              {currentPost?.image ? (
                <img
                  src={currentPost?.image}
                  alt="Post image"
                  style={{
                    width: "100%",
                    maxWidth: "350px",
                    height: "auto",
                    borderRadius: 8,
                  }}
                />
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign="center"
                  sx={{ fontStyle: "italic" }}
                >
                  Không có hình ảnh
                </Typography>
              )}
            </Box>

            {/* Thông tin bài viết */}
            <Box sx={{ width: "55%", paddingLeft: 3 }}>
              {/* Tiêu đề bài viết */}
              <Box mb={2}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Tiêu đề bài viết
                </Typography>
                <Box
                  sx={{
                    padding: 2,
                    borderRadius: 1,
                    backgroundColor: "#f5f5f5",
                    boxShadow: 2,
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">
                    {currentPost?.content}
                  </Typography>
                </Box>
              </Box>

              {/* Thông tin người dùng */}
              <Box mb={2}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Thông tin người dùng
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 2,
                    borderRadius: 1,
                    backgroundColor: "#f5f5f5",
                    boxShadow: 2,
                  }}
                >
                  <Avatar
                    src={currentPost?.User?.avatar}
                    alt={currentPost?.User?.username}
                    sx={{ width: 40, height: 40, marginRight: 2 }}
                  />
                  <Typography variant="body1" fontWeight="bold">
                    {currentPost?.User?.username}
                  </Typography>
                </Box>
              </Box>

              {/* Trạng thái bài viết */}
              <Box>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Trạng thái bài viết
                </Typography>
                <Box
                  sx={{
                    padding: 2,
                    borderRadius: 1,
                    backgroundColor: "#f5f5f5",
                    boxShadow: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    color={currentPost?.status === "active" ? "green" : "red"}
                    fontWeight="bold"
                  >
                    {currentPost?.status === "active" ? "Đang hiển thị" : "Đã bị khóa"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default PostTable;
