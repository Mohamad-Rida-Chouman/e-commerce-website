window.addEventListener("load", () => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('adminToken');
        return !!token;
      };
      
      const sendAuthenticatedRequest = async (url, method = 'GET', data = {}) => {
        const token = localStorage.getItem('adminToken');
        try {
          const response = await axios({
            url,
            method,
            data,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      };
      
      if (isAuthenticated()) {
        console.log("Logged In");
      } else {
        window.location.href = 'indexAdmin.html';
      }
})
