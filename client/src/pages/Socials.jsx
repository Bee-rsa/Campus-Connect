import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, Image as ImageIcon, Paperclip, Mic, Book, MapPin } from 'react-feather';
import { useAuthStore } from '../store/useAuthStore';
import { useMatchStore } from '../store/useMatchStore';

const SocialMediaHome = () => {
  // Get authenticated user and matches from stores
  const { authUser } = useAuthStore();
  const { matches } = useMatchStore();
  
  // State for loading user data
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your actual API call
        // const response = await api.getUserProfile(authUser.id);
        // setUserData(response.data);
        
        // Mock data - remove this in production
        const mockUserData = {
          id: authUser.id,
          username: authUser.username,
          name: authUser.name,
          avatar: authUser.image || 'https://i.pravatar.cc/150', // Using image from authUser
          university: authUser.university || 'University of Example',
          course: authUser.course || 'Computer Science',
          friends: matches.length // Using actual matches count
        };
        
        setUserData(mockUserData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    if (authUser) {
      fetchUserData();
    }
  }, [authUser, matches]);

  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [comments, setComments] = useState({});

  // Styled sponsored ads container
  const sponsoredAds = [
    { 
      id: '1', 
      title: 'Summer Sale', 
      image: 'https://picsum.photos/300/200', 
      desc: '50% off all campus essentials',
      sponsor: 'Campus Store'
    },
    { 
      id: '2', 
      title: 'New Course', 
      image: 'https://picsum.photos/300/201', 
      desc: 'Learn React in 30 days',
      sponsor: 'Tech Academy'
    }
  ];

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

  if (loading || !userData) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <div>Loading user data...</div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Poppins, sans-serif'
    }}>
      {/* Left Section - 25% */}
      <div style={{
        width: '25%',
        padding: '20px',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img 
            src={userData.avatar} 
            alt={userData.name} 
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: '15px',
              border: '2px solid #e4e6eb'
            }}
          />
          <div>
            <h3 style={{ margin: 0, fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>{userData.name}</h3>
            <p style={{ 
              margin: 0, 
              color: '#65676b', 
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              {matches.length} matched {matches.length === 1 ? 'friend' : 'friends'}
            </p>
          </div>
        </div>

        <hr style={{ 
          border: 'none', 
          borderTop: '1px solid #e4e6eb', 
          margin: '15px 0' 
        }} />

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ 
            marginBottom: '15px', 
            color: '#65676b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600,
            fontFamily: 'Poppins, sans-serif'
          }}>
            Education
          </h4>
          <div style={{ 
            backgroundColor: '#f0f2f5',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '10px'
          }}>
            <p style={{ 
              margin: '5px 0', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              color: '#4a4a4a',
              lineHeight: '1.4'
            }}>
              <MapPin size={16} color="#65676b" />
              <strong style={{ fontWeight: '600' }}></strong> {userData.university}
            </p>
            <p style={{ 
              margin: '5px 0', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              color: '#4a4a4a',
              lineHeight: '1.4'
            }}>
              <Book size={16} color="#65676b" />
              <strong style={{ fontWeight: '600' }}></strong> {userData.course}
            </p>
          </div>
        </div>

        <hr style={{ 
          border: 'none', 
          borderTop: '1px solid #e4e6eb', 
          margin: '15px 0' 
        }} />

        {/* Friends List */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h3 style={{ 
            color: '#65676b', 
            margin: 0,
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'Poppins, sans-serif'
          }}>
            Matched Friends
          </h3>
          <span style={{
            color: '#1877f2',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: 500,
            fontFamily: 'Poppins, sans-serif'
          }}>
            See All
          </span>
        </div>
        
        {matches.slice(0, 5).map(match => (
          <div key={match._id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '15px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            ':hover': {
              backgroundColor: '#f0f2f5'
            }
          }}>
            <img 
              src={match.image || 'https://i.pravatar.cc/150'} 
              alt={match.name} 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '10px',
                border: '1px solid #e4e6eb'
              }}
            />
            <div>
              <div style={{ 
                fontWeight: 600, 
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                {match.name}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#65676b',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <span>Matched</span>
                <span>•</span>
                <span>{new Date(match.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section - 50% */}
      <div style={{
        width: '50%',
        marginLeft: '25%',
        padding: '20px',
        backgroundColor: '#f0f2f5'
      }}>
        {/* Create Post */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <img 
              src={userData.avatar} 
              alt={userData.name} 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '10px',
                border: '1px solid #e4e6eb'
              }}
            />
            <input
              type="text"
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                backgroundColor: '#f0f2f5',
                borderRadius: '20px',
                padding: '10px 15px',
                outline: 'none',
                fontSize: '15px',
                fontFamily: 'Poppins, sans-serif'
              }}
            />
          </div>

          <hr style={{ 
            border: 'none', 
            borderTop: '1px solid #e4e6eb', 
            margin: '10px 0' 
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#65676b',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '6px',
              fontFamily: 'Poppins, sans-serif',
              ':hover': {
                backgroundColor: '#f0f2f5'
              }
            }}>
              <ImageIcon color="#45bd62" style={{ marginRight: '8px' }} />
              <span>Photo</span>
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#65676b',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '6px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              <Paperclip color="#f7b928" style={{ marginRight: '8px' }} />
              <span>Attachment</span>
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#65676b',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '6px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              <Mic color="#f5533d" style={{ marginRight: '8px' }} />
              <span>Audio</span>
            </button>
            <button 
              onClick={handlePostSubmit}
              style={{
                backgroundColor: '#1877f2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                cursor: 'pointer',
                opacity: newPostContent.trim() ? 1 : 0.5,
                fontWeight: 600,
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif'
              }}
              disabled={!newPostContent.trim()}
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        {posts.map(post => (
          <div key={post.id} style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}>
            {/* Post Header */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src={post.userAvatar} 
                  alt={post.userName} 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '10px',
                    border: '1px solid #e4e6eb'
                  }}
                />
                <div>
                  <h4 style={{ 
                    margin: 0, 
                    fontSize: '15px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600
                  }}>
                    {post.userName}
                  </h4>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '12px', 
                    color: '#65676b',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: '#65676b'
              }}>
                <MoreHorizontal />
              </button>
            </div>

            {/* Post Content */}
            <p style={{ 
              margin: '15px 0', 
              fontSize: '15px',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: '1.5'
            }}>
              {post.caption}
            </p>

            {/* Post Image */}
            <img 
              src={post.imageUrl} 
              alt={post.caption} 
              style={{
                width: '100%',
                borderRadius: '8px',
                marginBottom: '15px',
                maxHeight: '500px',
                objectFit: 'cover'
              }}
            />

            {/* Post Actions */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '10px',
              padding: '0 10px'
            }}>
              <button 
                onClick={() => likePost(post.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  color: post.likes.includes(authUser.id) ? '#1877f2' : '#65676b',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px'
                }}
              >
                <Heart 
                  fill={post.likes.includes(authUser.id) ? '#1877f2' : 'none'} 
                  color={post.likes.includes(authUser.id) ? '#1877f2' : '#65676b'} 
                  style={{ marginRight: '8px' }} 
                />
                <span>Like ({post.likes.length})</span>
              </button>
              <button style={{ 
                display: 'flex', 
                alignItems: 'center', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: '#65676b',
                padding: '8px 12px',
                borderRadius: '6px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px'
              }}>
                <MessageCircle style={{ marginRight: '8px' }} />
                <span>Comment ({post.comments.length})</span>
              </button>
              <button style={{ 
                display: 'flex', 
                alignItems: 'center', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: '#65676b',
                padding: '8px 12px',
                borderRadius: '6px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px'
              }}>
                <Send style={{ marginRight: '8px' }} />
                <span>Share</span>
              </button>
            </div>

            {/* Comments */}
            {post.comments.length > 0 && (
              <div style={{ 
                backgroundColor: '#f0f2f5',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '10px'
              }}>
                {post.comments.map(comment => (
                  <div key={comment.id} style={{ 
                    marginBottom: '8px', 
                    fontSize: '14px',
                    fontFamily: 'Poppins, sans-serif',
                    lineHeight: '1.4'
                  }}>
                    <strong style={{ fontFamily: 'Poppins, sans-serif' }}>{comment.userName}</strong> {comment.text}
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '10px',
                  border: '1px solid #e4e6eb'
                }}
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
                style={{
                  flex: 1,
                  border: 'none',
                  backgroundColor: '#f0f2f5',
                  borderRadius: '20px',
                  padding: '8px 15px',
                  outline: 'none',
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Right Section - Modern Sidebar */}
      <div style={{
        width: '25%',
        padding: '24px',
        position: 'fixed',
        right: 0,
        height: '100vh',
        overflowY: 'auto',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 20px rgba(0,0,0,0.08)',
        scrollbarWidth: 'thin',
        scrollbarColor: '#e0e0e0 transparent'
      }}>
        {/* Sponsored Ads Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            color: '#65676b', 
            margin: 0,
            fontSize: '17px',
            fontWeight: 600,
            letterSpacing: '0.3px',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Sponsored Content
          </h3>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#1877f2',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: 500,
            fontFamily: 'Poppins, sans-serif',
            ':hover': {
              textDecoration: 'underline'
            }
          }}>
            See All
          </button>
        </div>
        
        {/* Ads Container */}
        <div style={{
          display: 'grid',
          gap: '16px'
        }}>
          {sponsoredAds.map(ad => (
            <div key={ad.id} style={{ 
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              transition: 'all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
              ':hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <img 
                src={ad.image} 
                alt={ad.title} 
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              <div style={{ padding: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <h4 style={{ 
                    margin: 0,
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#050505',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    {ad.title}
                  </h4>
                  <span style={{
                    fontSize: '11px',
                    color: '#1877f2',
                    backgroundColor: '#e7f3ff',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Sponsored
                  </span>
                </div>
                <p style={{ 
                  margin: '6px 0',
                  fontSize: '14px',
                  color: '#65676b',
                  lineHeight: '1.4',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  {ad.desc}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#8a8d91',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#8a8d91" style={{ marginRight: '4px' }}>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    {ad.sponsor}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr style={{ 
          border: 'none', 
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e4e6eb, transparent)',
          margin: '24px 0',
          opacity: 0.8
        }} />

        {/* Optional: Add a "Create Ad" CTA */}
        <button style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: '#f0f2f5',
          border: 'none',
          color: '#1877f2',
          fontWeight: 600,
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: 'Poppins, sans-serif',
          ':hover': {
            backgroundColor: '#e4e6eb'
          }
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877f2">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Create Ad
        </button>
      </div>
    </div>
  );
};

export default SocialMediaHome;