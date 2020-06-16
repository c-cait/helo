select 
posts.post_id,
posts.title,
posts.img,
posts.author_id,
posts.content,
users.id,
users.username,
users.profile_pic
from posts
INNER JOIN users ON posts.author_id = users.id
WHERE users.id != $1 AND posts.title ILIKE '%' || $2 || '%';