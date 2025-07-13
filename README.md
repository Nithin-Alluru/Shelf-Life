> 📌 **Note:** This repository is a **mirrored academic project** originally developed as part of a group assignment at Virginia Tech.  
> All commit history and contributions reflect collaborative work from the original repository: [VT GitLab – cs-5704-social-books](https://code.vt.edu/connorb24/cs-5704-social-books).

# CS 5704 Social Books
## Repository details
This repository contains all the files and data pertaining to the Social Books application.\
All user stories are contained within the Issues section of GitLab.\
All user stories have deadlines corresponding to the sprints in the Project Timeline.\
[Link to the Project Timeline.](https://docs.google.com/spreadsheets/d/1VGAYzvViLGfYd0qhQhdDweC_Y04eyNBLluOOvAj_kS0/edit?gid=1709744959#gid=1709744959)


ShelfLife is a social, competition-focused site for reviewing and discovering books.

## SITE USAGE

### GETTING STARTED
- Create an account with the "register" button. Provide your first name, last name, choose a username and password. 
- Once registered, the app will automatically log you in and you will be redirected to your dashboard, the Reader Profile Page. 

### WRITING YOUR FIRST REVIEW
- First find a book. You can find a specific book by searching from the top bar, or you can check out our book categories and the titles featured therein.
- Go to that book's page. Use the review form to write your review's text and other associated information
- You can flesh out reviews with a number of supporting fields:
  - STAR RATING: Rate a book's quality out of 5 stars
  - LIKING: Give a book a "like" to indicate your enjoyment of it regardless of quality
- You can always edit your reviews later.
- To distinctly state your opinions about rereads of a title, you can write multiple reviews of the same book.

### USER PROFILES
- After registration, you can visit your profile page to see information about your reading history.
- Want to read more books? Set a reading goal for yourself in your profile.
- You can follow other users by visiting their profiles and pressing the "follow" button
- From your profile, you can select a few books to display as your favorites. These books will be front and center when others view your profile.

### COMPETITIONS
- From the competitions page, users can create and participate in competitions. 
- Competitions are instantiated with some information, including title, end date, and a list of books. 
- To create a competition, first, select the "Create Competitions" button and click the "add books" link.
- You will be redirected to the book list page, but will see a status box at the top. Add books to your competition by selecting the "add to competition" button. 
    - You can remove books from your competition from this view as well. 
- Reading books in a competitions advances that user’s progress towards completion and tracks their performance on the leaderboard. 

### SHELVES
- Shelves are like playlists. You can compile lists of books and save them for later. Other users can view your shelves.


## ADMIN FEATURES
### backend/admstats.py
- Access to a ShelfLife repository gives you access to several tools for administrators.
  - Run admstats.py and enter any of the following commands
    - tables: print table names and total size
    - users: print the # of users in db
    - whichbin: check the compilation options for the sqlite3 binary
    - qtime: Test user addition, removal, and lookup time
    - qq: exit terminal


## TESTING
- FRONTEND
    - To run frontend tests, use npm test or npx jest from the frontend directory. 
    - These tests use Jest and React Testing Library to simulate user interactions and verify that UI components render and behave correctly. 
    - Each test file targets a specific component under src/components/__tests__.
- BACKEND
  - Run unit tests with `python3 -m unittest servertest.py`
    - tests include server methods, authentication, and OpenLibrary API querying


## EXAMPLE USE CASE: CREATING AN ACCOUNT AND MAKING A NEW COMPETITION
- From the home page, the user can create a new account by selecting the Register button. Provide first name, last name, username and password and you will be registered and redirected to your user profile. 
- Users can navigate to the competitions from the home page. From there they can create a new competition.
- First, users can add books to their competition by the selecting “Add books” hyperlink. They are redirected to a book view page where they can add books to their competition from the Categories pages. Pressing “I’m finished adding books” takes them back to the creation menu.
- When the user elects to create a new competition, they must provide some information in a contest creation form. They must choose a contest title and end date. Failing to provide either yields this error message: “Make sure you have entered a title and end date for your competition and try again.”
- Next, users need to set a title and enddate for their competition. 
- When they have returned to the creation menu, users need to set a title and end date for their competition. 
- When satisfied with the competition books, title, and enddate, users can press submit to finalize their contest. Other users can join contests from the contests tab. 
- When other readers mark contest books as read, it advances their progress towards completion on the contest page and tracks their progress on the leaderboard, also visible from the contest page.
