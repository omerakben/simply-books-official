# Welcome to Simply Books!

This project will be completed in a 1 week sprint of 6 days or less. If you need support, put in a ticket ASAP and a senior engineer or teammate will help you.

## Get Started
- [FRONT END: Definition of Done](#fe-definition-of-done)
- [BACK END: Definition of Done](#be-definition-of-done)
- [MVP Guidelines](#mvp-guidelines)
- [Guide to getting started with this project](#guide-to-getting-started)

### FE Definition of Done
A feature or task is considered "done" when:
1. All tasks, features, and fixes must be ticketed and included on the GitHub project board.
Make sure the project board uses columns like Backlog, In Progress, Testing, and Done to track work.
1. The code is fully implemented and meets the requirements defined in the task.
1. The feature passes all AC especially for CRUD functionality.
1. The user can successfully perform Create, Read, Update, and Delete operations for both books and authors.
1. All relationships between authors and books are correctly established and maintained.
1. The feature is responsive and works across major browsers and mobile devices.
1. The app is deployed on Netlify, and all features work in the deployed environment.
1. The README is updated with any relevant instructions, and a Loom video (max 5 minutes) demonstrates the app's features.
1. For any stretch goals, the feature must be functional and demonstrate proper user interaction (e.g., public/private book functionality, simulated purchase).
1. Any issues or bugs identified during development or testing must be fixed by the developer. All work related to fixes must be ticketed and included on the GitHub project board.
1. The project board must reflect all tasks, bugs, and updates, with each task being moved through the proper columns (Backlog, In Progress, Testing, Done).

### BE Definition of Done
A feature or task is considered "done" when:
1. All tasks, features, and fixes must be ticketed and included on the GitHub project board.
Make sure the project board uses columns like Backlog, In Progress, Testing, and Done to track work.
1. The code is fully implemented and meets the requirements defined in the task.
1. The feature passes all AC especially for CRUD functionality.
1. The user can successfully perform Create, Read, Update, and Delete operations for both books and authors using postman.
1. All relationships between authors and books are correctly established and maintained.
1. The API docs are deployed on Postman, and all features work in the deployed environment.
1. The README is updated with any relevant instructions, and a Loom video (max 5 minutes) demonstrates the app's features.
1. For any stretch goals, the feature must be functional and demonstrate proper user interaction (e.g., public/private book functionality, simulated purchase).
1. Any issues or bugs identified during development or testing must be fixed by the developer. All work related to fixes must be ticketed and included on the GitHub project board.
1. The project board must reflect all tasks, bugs, and updates, with each task being moved through the proper columns (Backlog, In Progress, Testing, Done).



### MVP Guidelines
The Minimum Viable Product (MVP) for the Simply Books project includes:
1. **CRUD Functionality for Books and Authors**:
   - Users must be able to create, read, update, and delete books and authors.
   - When viewing an author, all books associated with that author must be visible.
   - When deleting an author, all of their books are also deleted.
   
2. **Author-Book Relationship**:
   - Each book must be associated with an author.
   - When a user views a book, the associated author's details must be accessible.
   
3. **Firebase Integration**:
   - The app must use Firebase for authentication and real-time data management.
   - Books and authors are tied to the logged-in user.

4. **User-Specific Data**:
   - Each user should only see their own books and authors.

#### Stretch Goals:
- **Public/Private Books**:
   - Users can mark books as public or private.
   - Public books are viewable by all users without needing to log in.
   - Private books are only visible to the user who created them.
   
- **Simulated Book Purchases**:
   - Users can add books to a cart and simulate purchasing them.
   - No real transaction will occur, but the UI will allow users to add items to the cart and check out.

### Guide to Getting Started
Follow the deployment guide to get your app live!

1. **Follow the Guide**:
   - Detailed steps for each part of the project can be found in the [Guide to getting started with this project](/project-docs/GET_STARTED.md).

1. **Submit**:
   - Make sure to complete the README, Loom video demonstration, and submit your project with the deployed link.
