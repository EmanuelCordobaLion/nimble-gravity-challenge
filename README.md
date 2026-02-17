# Job Application Platform

A modern React application for browsing and applying to job positions through an external API. Built as a technical challenge for Nimble Gravity recruitment process.

## Features

- **Real-time Job Listings**: Fetches and displays available positions from an external API
- **Individual Application Forms**: Each position has its own repository URL input and submit button
- **GitHub URL Validation**: Client-side validation ensures only valid GitHub repository URLs are accepted
- **Loading States**: Visual feedback during data fetching and form submissions
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Responsive Design**: Mobile-first approach ensuring optimal experience across all devices
- **Accessibility**: ARIA attributes and semantic HTML for better screen reader support
- **Success Feedback**: Clear visual confirmation when applications are submitted successfully

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Hooks** - Custom hooks for data fetching and state management

## Project Structure

```
src/
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks for business logic
├── services/        # API service layer
├── types/           # TypeScript interfaces and types
└── utils/           # Helper functions and validations
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/EmanuelCordobaLion/nimble-gravity-challenge.git
cd nimble-gravity-challenge
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Development Notes

This project was developed following clean code principles and component-based architecture. Key highlights include:

- **Separation of Concerns**: Business logic separated into custom hooks, keeping components focused on presentation
- **Type Safety**: Full TypeScript implementation with strict typing for API responses and component props
- **Reusable Components**: Modular design allowing easy maintenance and scalability
- **Error Boundaries**: Graceful error handling at multiple levels (network, validation, API)
- **DRY Principle**: Validation logic centralized in utility functions
- **Accessibility First**: Proper ARIA labels, semantic HTML, and keyboard navigation support

## Author

**Emanuel Córdoba**

[LinkedIn](https://www.linkedin.com/in/emanuel-cordoba-lion) • [GitHub](https://github.com/EmanuelCordobaLion)
