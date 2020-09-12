# Redux setup:

Global access to the states.
Move all the UI and login states into the Reduc global variables.

# Sign up component:

# Create user profile

## Backend

👽 not started
🚸 not tested
✅ success
❌ failed

Functionalities:
screams
Create user✅
Get screams ✅
Post screams ✅
Like screams ✅
Unlike screams✅
Comment screams✅
Delete comments✅
Users
Signup user✅
Login user✅
User edit profile
User edit profile photo
Delete user

The Asynchronous request is important concept.

The backend functions are similar to the Flask backends.
It gets a HTTP body that it will try to decode.

Database structure:
Documents:
User, scream, comment, notification.

## Frontend

Create a nav bar✅
Create a component that shows the posts. ✅

Create signup and login frontend.
Signup
The user register through backend.
The authentication token is saved in axios.
UI state change is based on redux state change.
Testings:
Wrong email✅
Not matched password✅
Existing email/ handle.✅
Going to the new location using history✅
Create a profile section that displays user information.
Display user information such as profile picture, name✅
Automatic login using firebase token✅
Allow client to upload profile image. ✅
Profile displaying relevant information.✅
Add logout capability.✅
Allow client to choose display other people’s profile.
Allow user to make posts
Make posts ✅
Delete posts ✅
Interaction with other users
Like a post✅
Clicking on the comment allow both expand and input✅
Comment on a post✅
Notifications
Firstly, I observed that the notification is similar in logics to the drop down action on the psotss, so I copy the crop down action from post and substitute the menau items to the appropriate notifications.
Things to do next:
Move expand more button down, ✅when clicked second time, take user to the dedicated section search page. 👽
Add skeleton to the waiting page ✅
Make popup scream
Make chat function
Add settings to user
Ability to share screams
Make user profile show when hovered over
Add games section.
Make search result relevant and highlighted.
Add chat functionality

## Redux tutorial

The difference between middleware and enhancer is that middleware is for actions while enhancer is for reducers.

create css that styles the image.
Profile image
Link to user
Create typography
Profile image
Link to user
Create typography
Location, website icon, joined at
add upload button for the user profile
Hide the actual file upload button and use a favicon to call the function.
Add a tooltip to the upload button to explain it.
Add logout button
Add edit details button

Navbar indicate user
text field
Implement like and unlike buttons for the screams.
Add delete button to delete the screams.
Post scream component.
Focus on the scream
Display user profile
Allow user to like and comment on the dialog
Show comments on the post
Allow users to add comments to the post.
Build a user handle
Implement the user page
Set the notification when the user page is loaded.
