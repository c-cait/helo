SELECT * from posts
INNER JOIN users ON posts.author_id = users.id 
WHERE posts.title ILIKE '%' || $1 || '%'