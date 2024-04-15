const API_URL = 'http://localhost:4000';

function fetchAndPopulateBlogPost() {

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetch(`http://localhost:4000/api/article/${postId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    updateBlogPostHtml(data.singleArticle);
                    // console.log(data.singleArticle);
                } else {
                    console.error('No data found for the blog post with ID:', postId);
                }
            })
            .catch(error => {
                console.error('Error fetching blog post:', error);
            });
    } else {
        console.error('No blog post ID provided in the URL.');
    }
}

function updateBlogPostHtml(blogPost) {

    const destext = document.querySelector('.destext');
    const blogImage = document.querySelector('.blogimage img');
    const blogTitle = document.querySelector('.blogtitle .stitle');
    const blogContent = document.querySelector('.blogcontent');

    const publishedDate = new Date(blogPost.timestamp);
    const formattedDate = publishedDate.toLocaleDateString();
    const formattedTime = publishedDate.toLocaleTimeString();
    
    destext.innerHTML = `
    <p>Published ${formattedDate} at ${formattedTime}</p>
    <p>${blogPost.author}</p>
    <p>${blogPost.comments} comments, ${blogPost.likes} likes.</p>
    `;


    blogImage.src = blogPost.image;
    blogTitle.textContent = blogPost.title;

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = blogPost.description;

    blogContent.innerHTML = '';

    blogContent.appendChild(descriptionParagraph);

    document.title = blogPost.title;
}

document.getElementById('formComment').addEventListener('submit', createComment);

function createComment(event) {
    event.preventDefault();


    const form = event.target;
    const content = document.getElementById('comment').value;
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    fetch(`${API_URL}/api/comment/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({ blogId, content})
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showMessage(data.error);
        } else {
            showMessage(data.message, '#10E956', 3000);
            fetchCommentsByPost();
            form.reset();
        }
    })
    .catch(error => {
        showMessage(error.message);
    });
}


function fetchCommentsByPost() {

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetch(`${API_URL}/api/comment/article/${postId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    populateComments(data.comments);
                    // console.log(data.comments);
                } else {
                    console.error('No comments found for the blog post with ID:', postId);
                }
            })
            .catch(error => {
                console.error('Error fetching post related comments', error);
            });
    } else {
        console.error('No blog post ID provided in the URL.');
    }
}

function populateComments(comments) {

    const commentsContainer = document.querySelector('.realcomments');

    commentsContainer.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        
        const commentHeader = document.createElement('div');
        commentHeader.classList.add('cmnthd', 'code', 'scolor');
        
        const timestamp = new Date(comment.timestamp);
        const formattedDate = timestamp.toDateString();

        commentHeader.textContent = `${comment.authorName} ${formattedDate}`;
        
        const commentContent = document.createElement('p');
        commentContent.textContent = comment.content;
        
        commentElement.appendChild(commentHeader);
        commentElement.appendChild(commentContent);
        
        commentsContainer.appendChild(commentElement);
    });
}

document.querySelector('.reactions i.fa-thumbs-up').addEventListener('click', toggleLike);

function toggleLike(event) {
    event.preventDefault();

    const likeIcon = event.target;

    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    const isLiked = likeIcon.classList.contains('liked');

    if (isLiked) {
        fetch(`${API_URL}/api/like/${blogId}`,  {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {

            showMessage(data.message, 3000)
            likeIcon.classList.remove('liked');
            fetchLikesByPost()
                
        })
        .catch(error => {
            console.error('Error fetching like related comments', error);
        });
    } else {
        fetch(`${API_URL}/api/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                blogId: blogId,
                liked: true,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showMessage(data.error)
            } else {
                showMessage(data.message, '#10E956', 3000);
            likeIcon.classList.add('liked');
            fetchLikesByPost()
            }
            
            })
        .catch(error => {
            console.error(error);
        });
    }
}

function fetchLikesByPost() {

    const likesParagraph = document.getElementById('likes');
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetch(`${API_URL}/api/like/count/${postId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    likesParagraph.textContent = `${data.likeCount} Likes`;
                } else {
                    console.error('No likes found', postId);
                }
            })
            .catch(error => {
                console.error('Error fetching likes related comments', error);
            });
    } else {
        console.error('No blog post ID provided in the URL.');
    }
}












function showMessage(message, color, duration = 5000) {
    const msgbox = document.getElementById('msgbox');
    const messageParagraph = msgbox.querySelector('p');
    
    msgbox.style.display = 'block';
    msgbox.style.right = '-100%';
    msgbox.style.animation = 'none';
    msgbox.style.backgroundColor = 'rgb(145, 0, 0)';

    messageParagraph.textContent = message;
    msgbox.style.backgroundColor = color;

    msgbox.offsetHeight;
    msgbox.style.animation = 'slideInFromRight 1s ease-in-out forwards';

    setTimeout(function() {
        msgbox.style.display = 'block';
        msgbox.style.animation = 'slideOutToRight 3s ease-in-out 0s forwards';
    }, duration);
        
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndPopulateBlogPost();
    fetchCommentsByPost();
    fetchLikesByPost()
});