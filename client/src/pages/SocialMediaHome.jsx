import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, Image as ImageIcon, Paperclip, Mic, Book, MapPin, Menu } from 'react-feather';
import { useAuthStore } from '../store/useAuthStore';
import { useMatchStore } from '../store/useMatchStore';
import Header from '../components/SocialHeader';

const SocialMediaHome = () => {
  const { authUser } = useAuthStore();
  const { matches } = useMatchStore();
  const [userData, setUserData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [comments, setComments] = useState({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (authUser) {
      setUserData({
        id: authUser.id,
        name: authUser.name,
        avatar: authUser.image || 'https://i.pravatar.cc/150',
        university: authUser.university || 'University of Example',
        course: authUser.course || 'Computer Science'
      });
    }
  }, [authUser]);

  const likePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(authUser.id);
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(id => id !== authUser.id)
            : [...post.likes, authUser.id]
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId) => {
    if (comments[postId]?.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now().toString(),
                userId: authUser.id,
                userName: authUser.name,
                text: comments[postId],
                createdAt: new Date().toISOString()
              }
            ]
          };
        }
        return post;
      }));
      setComments(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const handlePostSubmit = () => {
    if (newPostContent.trim()) {
      const newPost = {
        id: Date.now().toString(),
        userId: authUser.id,
        userName: authUser.name,
        userAvatar: authUser.image || 'https://i.pravatar.cc/150',
        imageUrl: 'https://picsum.photos/600/600',
        caption: newPostContent,
        likes: [],
        comments: [],
        createdAt: new Date().toISOString()
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  if (!userData) return <div>Loading...</div>;

  const LeftSidebar = () => (
    <div className="hidden md:block w-full md:w-1/4 fixed h-screen overflow-y-auto bg-white shadow-md p-5 z-10">
      <div className="flex items-center mb-5">
        <img 
          src={userData.avatar} 
          alt={userData.name} 
          className="w-14 h-14 rounded-full object-cover mr-3 border-2 border-gray-200"
        />
        <div>
          <h3 className="font-semibold">{userData.name}</h3>
          <p className="text-gray-500 text-sm">
            {matches.length} matched {matches.length === 1 ? 'friend' : 'friends'}
          </p>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="mb-5">
        <h4 className="flex items-center text-gray-500 font-medium mb-3">
          <Book className="mr-2" size={16} />
          Education
        </h4>
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="flex items-center text-gray-700 text-sm mb-1">
            <MapPin className="mr-2" size={16} />
            {userData.university}
          </p>
          <p className="flex items-center text-gray-700 text-sm">
            <Book className="mr-2" size={16} />
            {userData.course}
          </p>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div>
        <h4 className="text-gray-500 font-medium mb-3">Matched Friends</h4>
        {matches.slice(0, 5).map(match => (
          <div key={match._id} className="flex items-center mb-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <img 
              src={match.image || 'https://i.pravatar.cc/150'} 
              alt={match.name} 
              className="w-10 h-10 rounded-full object-cover mr-2 border border-gray-200"
            />
            <div>
              <div className="font-medium text-sm">{match.name}</div>
              <div className="text-gray-500 text-xs">
                {new Date(match.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MobileMenu = () => (
    <div className={`fixed top-16 left-0 w-full bg-white shadow-lg z-20 transition-all duration-300 ease-in-out ${menuOpen ? 'h-[calc(100vh-64px)]' : 'h-0 overflow-hidden'}`}>
      <div className="p-4 overflow-y-auto h-full">
        <div className="flex items-center mb-4">
          <img 
            src={userData.avatar} 
            alt={userData.name} 
            className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-gray-200"
          />
          <div>
            <h3 className="font-semibold">{userData.name}</h3>
            <p className="text-gray-500 text-sm">
              {matches.length} matched {matches.length === 1 ? 'friend' : 'friends'}
            </p>
          </div>
        </div>

        <hr className="my-3 border-gray-200" />

        <div className="mb-4">
          <h4 className="flex items-center text-gray-500 font-medium mb-2">
            <Book className="mr-2" size={16} />
            Education
          </h4>
          <div className="bg-gray-100 rounded-lg p-2">
            <p className="flex items-center text-gray-700 text-sm mb-1">
              <MapPin className="mr-2" size={16} />
              {userData.university}
            </p>
            <p className="flex items-center text-gray-700 text-sm">
              <Book className="mr-2" size={16} />
              {userData.course}
            </p>
          </div>
        </div>

        <hr className="my-3 border-gray-200" />

        <div>
          <h4 className="text-gray-500 font-medium mb-2">Matched Friends</h4>
          {matches.slice(0, 5).map(match => (
            <div key={match._id} className="flex items-center mb-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <img 
                src={match.image || 'https://i.pravatar.cc/150'} 
                alt={match.name} 
                className="w-8 h-8 rounded-full object-cover mr-2 border border-gray-200"
              />
              <span className="text-sm">{match.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header>
        {isMobile && (
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white mr-3"
          >
            <Menu size={24} />
          </button>
        )}
      </Header>

      {isMobile && <MobileMenu />}
      {!isMobile && <LeftSidebar />}

      {/* Middle Section - Post Feed */}
      <div className={`pt-16 ${isMobile ? 'w-full' : 'w-full md:w-1/2 md:ml-1/4'}`}>
        <div className="p-4">
          {/* Create Post */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-5">
            <div className="flex items-center mb-3">
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                className="w-10 h-10 rounded-full object-cover mr-2 border border-gray-200"
              />
              <input
                type="text"
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none"
              />
            </div>

            <hr className="my-2 border-gray-200" />

            <div className="flex justify-between">
              <button className="flex items-center text-gray-500 px-3 py-1 rounded hover:bg-gray-100">
                <ImageIcon color="#45bd62" className="mr-1" />
                <span>Photo</span>
              </button>
              <button className="flex items-center text-gray-500 px-3 py-1 rounded hover:bg-gray-100">
                <Paperclip color="#f7b928" className="mr-1" />
                <span>Attachment</span>
              </button>
              <button className="flex items-center text-gray-500 px-3 py-1 rounded hover:bg-gray-100">
                <Mic color="#f5533d" className="mr-1" />
                <span>Audio</span>
              </button>
              <button 
                onClick={handlePostSubmit}
                className={`px-4 py-1 rounded font-medium ${newPostContent.trim() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                disabled={!newPostContent.trim()}
              >
                Post
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-4 mb-5">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <img 
                    src={post.userAvatar} 
                    alt={post.userName} 
                    className="w-10 h-10 rounded-full object-cover mr-2 border border-gray-200"
                  />
                  <div>
                    <h4 className="font-medium">{post.userName}</h4>
                    <p className="text-gray-500 text-xs">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button className="text-gray-500">
                  <MoreHorizontal />
                </button>
              </div>

              {/* Post Content */}
              <p className="my-3">{post.caption}</p>

              {/* Post Image */}
              <img 
                src={post.imageUrl} 
                alt={post.caption} 
                className="w-full rounded-lg mb-3 max-h-96 object-cover"
              />

              {/* Post Actions */}
              <div className="flex justify-between px-2 mb-2">
                <button 
                  onClick={() => likePost(post.id)}
                  className={`flex items-center px-3 py-1 rounded ${post.likes.includes(authUser.id) ? 'text-blue-500' : 'text-gray-500'}`}
                >
                  <Heart 
                    fill={post.likes.includes(authUser.id) ? '#1877f2' : 'none'} 
                    color={post.likes.includes(authUser.id) ? '#1877f2' : '#65676b'} 
                    className="mr-1" 
                  />
                  <span>Like ({post.likes.length})</span>
                </button>
                <button className="flex items-center text-gray-500 px-3 py-1 rounded">
                  <MessageCircle className="mr-1" />
                  <span>Comment ({post.comments.length})</span>
                </button>
                <button className="flex items-center text-gray-500 px-3 py-1 rounded">
                  <Send className="mr-1" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="bg-gray-100 rounded-lg p-3 mb-2">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="mb-1 text-sm">
                      <strong>{comment.userName}</strong> {comment.text}
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment */}
              <div className="flex items-center mt-2">
                <img 
                  src={userData.avatar} 
                  alt={userData.name} 
                  className="w-8 h-8 rounded-full object-cover mr-2 border border-gray-200"
                />
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={comments[post.id] || ''}
                  onChange={(e) => setComments(prev => ({
                    ...prev,
                    [post.id]: e.target.value
                  }))}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                  className="flex-1 bg-gray-100 rounded-full px-3 py-1 outline-none text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaHome;