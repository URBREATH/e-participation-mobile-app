// Calculate relative date
export const calculateRelativeDate = (date) => {
    const now = new Date();
    const givenDate = new Date(date);
    const diffInSeconds = Math.floor((now - givenDate) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d`;
    } else {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks}w`;
    }
};
  
// Strip HTML tags from a string
export const stripHtmlTags = (html) => (html ? html.replace(/<[^>]*>/g, "") : "No text");

export const toggleComments = (postId, activeComments, setActiveComments) => {
    setActiveComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };
  
// Handle adding a comment
export const handleAddComment = async ({
    postId,
    newComments,
    mainStore,
    setSelectedBlog,
    setNewComments,
  }) => {
    const comment = newComments[postId]?.trim();
    if (!comment) {
      console.error("Comment cannot be empty");
      return;
    }
  
    try {
      const result = await mainStore.postComment(postId, "Decidim::Blogs::Post", comment);
  
      if (result) {
        setSelectedBlog((prevBlog) => ({
          ...prevBlog,
          posts: prevBlog.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [...post.comments, result],
                }
              : post
          ),
        }));
        setNewComments((prevComments) => ({
          ...prevComments,
          [postId]: "",
        }));
        console.log("Comment added successfully:", result);
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
};  
