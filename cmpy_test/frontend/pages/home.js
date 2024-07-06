import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    image: '',
    description: '',
    date: '',
  });

  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found');
          return;
        }
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/posts`;
        const role = localStorage.getItem('role');
        if (role === 'admin') {
          url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-posts`;
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setPosts(data.posts);
        } else {
          console.error('Failed to fetch posts:', data.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Access token not found');
        return;
      }
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/post`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      if (data.success) {
        router.push('/home');
      } else {
        console.error('Failed to add post:', data.message);
      }
    } catch (error) {
      console.error('An error occurred while adding post:', error);
    }
  };

  const openAddForm = () => {
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Posts</h1>
      {localStorage.getItem('role') === 'customer' && (
        <button className='btn btn-primary mb-3' onClick={openAddForm}>
          Add Post
        </button>
      )}

      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.description}</td>
              <td>{new Date(post.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddForm && (
        <div
          className='modal'
          tabIndex='-1'
          role='dialog'
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Add New Post</h5>
                <button type='button' className='close' onClick={closeAddForm}>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <form onSubmit={handleAddPost}>
                  <div className='form-group'>
                    <label>Title</label>
                    <input
                      type='text'
                      className='form-control'
                      name='title'
                      value={newPost.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label>Image URL</label>
                    <input
                      type='text'
                      className='form-control'
                      name='image'
                      value={newPost.image}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label>Description</label>
                    <textarea
                      className='form-control'
                      name='description'
                      value={newPost.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label>Date</label>
                    <input
                      type='date'
                      className='form-control'
                      name='date'
                      value={newPost.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type='submit' className='btn btn-primary mr-2'>
                    Submit
                  </button>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={closeAddForm}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
