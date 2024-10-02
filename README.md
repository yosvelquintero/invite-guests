# Invite Guests Feature

This project implements the “Invite Guests” feature using React. It allows users to add guest emails, validates the inputs, prevents duplicates, and displays the list of invited guests with options to remove them. The interface is responsive and follows React best practices with a clean code structure.

![ScreenshotInviteGuestsFeature](./ScreenshotInviteGuestsFeature.png)

## Getting Started

Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/yosvelquintero/invite-guests
   ```

2. Install NPM packages

   ```sh
    npm install
   ```

3. Start the project
   ```sh
    npm start
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

#### Features

- Add Guest Emails: Users can input email addresses to invite guests.
- Email Validation: Ensures that the entered email addresses are in the correct format.
- Duplicate Prevention: Checks for and prevents duplicate email entries.
- Responsive Design: Optimized for various screen sizes, including mobile devices.
- User Interface: Modern and clean UI using CSS variables and consistent theming.

#### Project Structure

Components:

- **EmailInput**: Handles the email input field and validation messages.
- **EmailChip**: Displays individual invited emails with a remove option.
- **InvitedEmailsList**: Renders the list of invited emails.
- **InviteGuestsButton**: Displays the “Invite Guests” button.

Hooks:

- **useEmailManagement**: Manages email state, validation, and duplication checks.

Styles:

- Uses CSS variables defined in index.css for consistent theming.
- Responsive styles are handled in InviteGuests.css.

Technologies Used

- React
- TypeScript

## Stay in touch

- Author - [Yosvel Quintero](https://x.com/yosvelquintero)

## License

This project is open-source and available under the [MIT License](https://opensource.org/license/mit).
