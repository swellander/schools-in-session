## Todo
(Search: "TODO" or "QUESTION" to find specific locations)
- [ ] rename action creators to UPDATE from UPDATE_SCHOOL
- [ ] add babel stage-2 plugin
- [x] rename Schools.js component to SchoolList.js
- [x] add automatic capitalization of names (getter)
- [x] go to update a school/student. once at update form with pre-populated data, refresh the page. Fix that bug.
- [ ] find a way to do this: https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option
- [ ] figure out a way to connect schools and students (and viceversa) on client, rather than connecting them twice(redundantly) on server (src/store/school.js 53:7)
- [x] get rid of all underlines from react-router-dom styling
- [ ] 'fix warnings. (ask a fell0w)
- [x] delete a school, then navigate to a school-detail. fix that bug 
- [x] fix whole number gpa issue
- [x] remove school column table on school detail page
- [x] emphasize nav button of current view
- [x] disconnect sequelize after seed file
- [x] after update, redirect to detail view
- [x] fix nav tab on refresh bug
- [ ] fix route testing
- [ ] rewrite/rethink token tests
- [ ] hide header login button while user is entering info in login form 
- [x] fix process.env.JWT_SECRET issue
- [x] redirect to home page once logged in
- [x] add login react-route
- [x] error handling on front end for bad credentials
- [ ] when on detail page and refresh, don't redirect, rather add spinner to wait for data
- [ ] change students to users
- [x] style login view
- [x] add modal to confirm deletes
- [x] fix map accuracy issue

## Ideas to fill extra time
1. Add websockets to keep all users up to date.
2. Add badges to schools and students tabs to notify users of newly created (websocket) items.
3. [DONE] Add a "Create Random Student" function that uses https://randomuser.me/.
4. Search feature for longer student lists.
5. Buttons to order student by each column.
6. Standardize styles.
7. Make responsive.
8. Store images on AWS.
9. [DONE] add.
10. [DONE] Authentication

