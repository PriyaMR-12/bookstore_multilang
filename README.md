# Book Management App

A modern, responsive book management application built with React and Vite, featuring internationalization support for multiple languages.

## Features

- **Book Catalog**: Browse a curated collection of popular books with images, titles, and authors
- **Shopping Cart**: Add books to cart, view cart contents, and simulate purchases
- **Internationalization**: Support for 9 languages including English, Spanish, Hindi, Kannada, German, French, Telugu, Tamil, and more
- **Responsive Design**: Mobile-friendly interface with adaptive layouts
- **Real-time Language Switching**: Change language dynamically without page reload
- **Modern UI**: Clean, intuitive design with smooth animations

## Tech Stack

- **Frontend**: React 19, Vite
- **Internationalization**: react-i18next, i18next
- **Icons**: React Icons
- **Styling**: CSS with responsive design
- **Build Tool**: Vite
- **Deployment**: Firebase Hosting

## Supported Languages

- 🇺🇸 English (en)
- 🇪🇸 Español (es)
- 🇮🇳 हिन्दी (hi)
- 🇮🇳 ಕನ್ನಡ (kn)
- 🇩🇪 Deutsch (de)
- 🇫🇷 Français (fr)
- 🇮🇳 తెలుగు (te)
- 🇮🇳 தமிழ் (ta)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd book_management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
book_management/
├── public/
├── src/
│   ├── assets/          # Book cover images
│   ├── locales/         # Translation files
│   │   ├── en.json
│   │   ├── es.json
│   │   └── ...
│   ├── App.jsx          # Main application component
│   ├── BookList.jsx     # Book catalog component
│   ├── BookCard.jsx     # Individual book card component
│   ├── i18n.js          # Internationalization configuration
│   ├── main.jsx         # Application entry point
│   └── ...
├── backend/             # Backend API (placeholder)
├── firebase.json        # Firebase hosting configuration
├── vite.config.js       # Vite configuration
└── package.json
```

## Usage

1. **Browse Books**: View the catalog of available books on the main page
2. **Add to Cart**: Click "Add to Cart" on any book to add it to your shopping cart
3. **View Cart**: Click the cart icon in the navigation to view and manage cart items
4. **Change Language**: Use the language dropdown in the navigation to switch languages
5. **Purchase**: In the cart, click "Buy" to simulate purchasing a book

## Internationalization

The app uses react-i18next for internationalization. Translation files are located in `src/locales/`. To add a new language:

1. Create a new JSON file in `src/locales/` (e.g., `newlang.json`)
2. Add the language to the resources in `src/i18n.js`
3. Add the language option to the dropdown in `App.jsx`

## Deployment

The app is configured for deployment on Firebase Hosting:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
