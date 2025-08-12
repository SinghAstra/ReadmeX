# Project Overview

ReadmeX solves the problem of quickly generating high-quality `README.md` and `.env.example` files for public GitHub repositories. It's designed for developers who want to streamline the documentation process and provide clear, concise information to potential contributors and users.

**Why ReadmeX?**

- **Saves Time:** Automates the creation of essential documentation files.
- **Improves Onboarding:** Provides clear instructions and examples for new users and contributors.
- **Enhances Project Visibility:** Well-documented projects are more likely to attract attention and contributions.
- **Unique Value:** ReadmeX not only generates READMEs but also creates `.env.example` files, ensuring sensitive information is properly handled.

**Target Audience:**

- Open-source developers
- Teams managing multiple repositories
- Developers who want to improve the documentation of their projects

# Key Features

- **README.md Generation:** Generates a comprehensive README file based on repository metadata and code analysis.
- **.env.example Generation:** Creates a `.env.example` file based on the environment variables used in the project.
- **GitHub Repository Integration:** Fetches repository data directly from GitHub using repository URLs.
- **Trending Repository Discovery:** Fetches and displays trending TypeScript repositories from GitHub.
- **User Authentication:** Secure user authentication using NextAuth.js with GitHub and Google providers.
- **Real-time Logs:** Displays real-time logs for repository processing using Pusher.
- **Customizable UI:** Uses Radix UI and Tailwind CSS for a modern and customizable user interface.
- **Markdown Rendering:** Renders Markdown content with syntax highlighting using ReactMarkdown and rehypePrism.
- **Database Persistence:** Stores repository data and user information in a PostgreSQL database using Prisma.

# Architecture & Code Organization

ReadmeX follows a modular architecture, separating concerns into distinct components and modules.

- **Frontend (React/Next.js):** Handles user interface, data fetching, and user interactions.
- **Backend (Next.js API Routes):** Provides API endpoints for data retrieval, repository processing, and authentication.
- **Database (PostgreSQL/Prisma):** Stores repository data, user information, and session data.
- **External API (Express):** Interacts with an external Express API for repository processing (details in `app/api/repository/processing/route.ts`).
- **Real-time Communication (Pusher):** Enables real-time log updates and status notifications.

**Component Interaction:**

1.  User enters a repository URL in the `NewRepoInput` component.
2.  The frontend fetches repository data from GitHub.
3.  The frontend sends a request to the `/api/repository/start-process` endpoint.
4.  The backend updates the repository status in the database and triggers the external Express API.
5.  The external API processes the repository and sends logs to Pusher.
6.  The frontend displays the logs in the `RepoLogs` component using a terminal UI.

# Technology Stack

- **Next.js:** React framework for building server-rendered and statically generated web applications. Chosen for its performance, SEO optimization, and developer experience.
- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript that adds static typing. Improves code maintainability and reduces errors.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Radix UI:** Unstyled, accessible UI primitives for building custom components.
- **Prisma:** ORM for type-safe database access. Simplifies database interactions and provides migrations.
- **PostgreSQL:** Relational database for storing application data.
- **NextAuth.js:** Authentication library for Next.js. Simplifies user authentication and session management.
- **Pusher:** Real-time communication platform for sending log updates and status notifications.
- **ReactMarkdown:** React component for rendering Markdown content.
- **rehypePrism:** Plugin for Prism.js to highlight code blocks in ReactMarkdown.
- **Framer Motion:** Animation library for creating smooth and engaging UI animations.
- **SWR:** React Hooks library for remote data fetching.
- **Zod:** TypeScript-first schema validation with static type inference.

# Getting Started

1.  **Prerequisites:**

    - Node.js (version 18 or higher)
    - npm or yarn
    - PostgreSQL database
    - GitHub account
    - Pusher account

2.  **Installation:**

    ```bash
    git clone <repository_url>
    cd ReadmeX
    npm install # or yarn install
    ```

3.  **Configuration:**

    - Create a `.env.local` file based on `.env.example`.
    - Set the following environment variables:

      ```
      DATABASE_URL="postgresql://user:password@host:port/database"
      GITHUB_CLIENT_ID="your_github_client_id"
      GITHUB_CLIENT_SECRET="your_github_client_secret"
      GOOGLE_CLIENT_ID="your_google_client_id"
      GOOGLE_CLIENT_SECRET="your_google_client_secret"
      NEXTAUTH_SECRET="your_nextauth_secret"
      NEXTAUTH_URL="http://localhost:3000" # or your production URL
      PUSHER_APP_ID="your_pusher_app_id"
      PUSHER_APP_KEY="your_pusher_app_key"
      PUSHER_APP_SECRET="your_pusher_app_secret"
      PUSHER_APP_CLUSTER="your_pusher_app_cluster"
      EXTERNAL_API_URL="your_external_api_url"
      SERVICE_AUTH_SECRET="your_service_auth_secret"
      ```

4.  **Database Setup:**

    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

5.  **Development Server:**

    ```bash
    npm run dev # or yarn dev
    ```

    Open your browser and navigate to `http://localhost:3000`.

6.  **Common Commands:**

    - `npm run dev`: Start the development server.
    - `npm run build`: Build the application for production.
    - `npm run start`: Start the production server.
    - `npm run lint`: Run ESLint to check for code quality issues.
    - `npm run prisma:migrate`: Run Prisma migrations.
    - `npm run prisma:generate`: Generate Prisma client.

# Project Structure

```
ReadmeX/
├── app/                      # Next.js app directory
│   ├── (protected)/          # Protected routes (requires authentication)
│   │   ├── dashboard/        # Dashboard page and components
│   │   ├── repository/[id]/  # Repository details page and components
│   │   ├── logs/[id]/        # Repository logs page and components
│   ├── (home)/               # Home page and components
│   ├── api/                  # API routes
│   ├── styles/               # Global CSS styles
│   ├── layout.tsx            # Root layout
│   └── not-found.tsx         # Custom 404 page
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   ├── home/                 # Home page components
│   ├── dashboard/            # Dashboard components
│   ├── repo-details/         # Repository details components
│   ├── markdown/             # Markdown rendering components
│   ├── providers/            # Providers for authentication, data fetching, and notifications
│   └── componentX/           # Various background and UI components
├── config/                   # Configuration files
│   └── site.ts               # Site configuration
├── interfaces/               # TypeScript interfaces
│   ├── next-auth.ts          # NextAuth.js interfaces
│   ├── repository.ts         # Repository data interfaces
│   └── site.ts               # Site configuration interface
├── lib/                      # Utility functions and modules
│   ├── prisma.ts             # Prisma client initialization
│   ├── markdown.tsx          # Markdown rendering configuration
│   ├── auth-options.ts       # NextAuth.js configuration
│   ├── github.ts             # GitHub URL parsing
│   ├── pusher/               # Pusher client initialization
│   ├── utils.ts              # Utility functions
│   ├── variants.ts           # Framer Motion variants
│   └── api.ts                # API endpoints
├── prisma/                   # Prisma schema and migrations
│   ├── schema.prisma         # Prisma schema
│   ├── migrations/           # Prisma migrations
│   └── generated/            # Generated Prisma client
├── public/                   # Public assets
├── .eslintrc.json            # ESLint configuration
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Dependency lock file
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

**Key Files:**

- `app/api/repository/start-process/route.ts`: The core API endpoint that initiates repository processing.
- `lib/prisma.ts`: Prisma client initialization for database interactions.
- `components/ui/`: Reusable UI components that ensure a consistent look and feel.
- `prisma/schema.prisma`: Defines the database schema and relationships.

We hope this README helps you understand the project and get started quickly. Happy coding!
