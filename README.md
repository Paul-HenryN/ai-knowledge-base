# AI Knowledge Base

https://vimeo.com/1120098739?share=copy

AI Knowledge Base is a full-stack web application designed to help users manage, search, and interact with documents and chats using advanced AI capabilities. Built with AdonisJS (Node.js & TypeScript) for the backend and React (via Inertia.js) for the frontend, it provides a seamless experience for document upload, chat, and knowledge discovery.

## Features

- **User Authentication**: Secure login and session management.
- **Document Management**: Upload, store, and organize documents.
- **Chat System**: Create and participate in chats, powered by AI for enhanced interactions.
- **AI Services**: Integrate AI for document embedding, search, and chat assistance.
- **Modern Frontend**: Responsive React UI with Inertia.js for smooth navigation.
- **Role-based Middleware**: Secure routes and resources with authentication and authorization middleware.

## Project Structure

- `app/` — Backend controllers, models, services, middleware, and validators
- `inertia/` — Frontend React app, components, pages, and utilities
- `database/migrations/` — Database schema migrations for users, documents, chats, and messages
- `storage/documents/` — Uploaded documents
- `config/` — Application and service configuration files
- `public/` — Static assets

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- Database (e.g., SQLite, PostgreSQL)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Paul-HenryN/ai-knowledge-base.git
   cd ai-knowledge-base
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env` and update as needed.
4. Run database migrations:
   ```sh
   node ace migration:run
   ```
5. Start the development server:
   ```sh
   pnpm dev
   ```

## Usage

- Access the app at `http://localhost:3333` (or configured port).
- Register or log in to manage documents and chats.
- Upload documents and interact with AI-powered chat features.

## Technologies Used

- [AdonisJS](https://adonisjs.com/) (Node.js, TypeScript)
- [React](https://react.dev/) (with Inertia.js)
- [Vite](https://vitejs.dev/) (frontend tooling)
- [AI/Embedding Services] (custom integration)

_Created by Paul-Henry NGANKAM NGOUNOU_
