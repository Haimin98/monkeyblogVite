# Post

- collection : posts
- add new post
- id
- title
- slug
- image
- createAt
- status: 1(approved) , 2(pending) , 3(reject)
- user : { id, username, fullname, avatar, description }
- category : {id, name, slug}
- content
- hot(true or false)

# Category

- id
- name
- slug
- status 1(approve) 2(pending)
- createAt

# User

- id
- displayName
- email
- password
- avatar : url, image_name
- status 1(active) 2(pending) 3(banned)
- role 1(Admin) 2(mod) 3(user)
- avatar
- permissions: "ADD_POST"
- createAt

# add new post

- id
- tittle
- slug
- image
- createAt
- status
- content
- userID
- categoryID
