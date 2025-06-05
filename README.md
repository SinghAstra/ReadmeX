# ReadmeX

ReadmeX helps users generate readme.md and .env.example for any public github repository.

## 🧰 Technology Stack

| Technology               | Purpose/Role                                                              |
| ------------------------ | ------------------------------------------------------------------------- |
| Next.js                  | React framework for server-side rendering and routing.                    |
| TypeScript               | Adds static typing to JavaScript.                                         |
| Tailwind CSS             | Utility-first CSS framework for styling.                                  |
| Prisma                   | ORM for database access and schema management (PostgreSQL).               |
| NextAuth.js              | Authentication handling with GitHub and Google providers.                 |
| Radix UI                 | UI component library for building accessible and customizable components. |
| Framer Motion            | Animation library for creating smooth and engaging UI interactions.       |
| Shadcn UI                | UI component library for generating components.                           |
| Pusher                   | Real-time messaging service for displaying repository logs.               |
| ESLint                   | Code linting tool for maintaining code quality.                           |
| MDX                      | Markdown extension for rendering markdown content with JSX.               |
| @radix-ui/react-\*       | Collection of Radix UI React components.                                  |
| class-variance-authority | Utility for managing CSS class variations.                                |
| Sonner                   | Library for displaying toast notifications.                               |
| Lucide-React             | React icon library.                                                       |
| styled-system            | Styling library for creating reusable and maintainable styles.            |

## 📁 File Structure and Purpose

| File Path                                                             | Description                                                                                                                               |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `.eslintrc.json`                                                      | Configures ESLint for Next.js and TypeScript.                                                                                             |
| `package-lock.json`                                                   | Contains a complete record of all project dependencies and their versions.                                                                |
| `app/globals.css`                                                     | Contains global CSS styles for the application.                                                                                           |
| `lib/auth-options.ts`                                                 | Configures authentication options for NextAuth.js, integrating with GitHub and Google providers and using Prisma for database management. |
| `components/global/max-width-wrapper.tsx`                             | React component that wraps its children with a max-width container for responsive layout.                                                 |
| `components/dashboard/left-sidebar-repo-list.tsx`                     | Displays a list of user repositories or an empty state message.                                                                           |
| `components/repo-details/navbar.tsx`                                  | Renders a navigation bar for repository details.                                                                                          |
| `app/not-found.tsx`                                                   | Renders a 404 Not Found page.                                                                                                             |
| `app/dashboard/page.tsx`                                              | Displays the main dashboard content.                                                                                                      |
| `app/auth/sign-in/page.tsx`                                           | Renders the sign-in page.                                                                                                                 |
| `components/ui/terminal.tsx`                                          | Displays repository logs with animations and icons.                                                                                       |
| `app/api/auth/[...nextauth]/route.ts`                                 | Sets up NextAuth.js for authentication.                                                                                                   |
| `app/repository/[id]/layout.tsx`                                      | Fetches repository metadata and provides it to the page.                                                                                  |
| `prisma/migrations/20250501134936_env_contributing/migration.sql`     | SQL migration to alter the Repository table.                                                                                              |
| `app/api/repository/get-all/route.ts`                                 | Retrieves all repositories for an authenticated user.                                                                                     |
| `README.md`                                                           | Provides instructions for setting up and running the application.                                                                         |
| `components.json`                                                     | Configures UI components using Shadcn's UI library.                                                                                       |
| `package.json`                                                        | Lists project dependencies and scripts.                                                                                                   |
| `tailwind.config.ts`                                                  | Configures Tailwind CSS.                                                                                                                  |
| `interfaces/next-auth.ts`                                             | Extends NextAuth.js interfaces with custom properties.                                                                                    |
| `interfaces/repository.ts`                                            | Defines the `RepositoryWithDocs` interface.                                                                                               |
| `interfaces/site.ts`                                                  | Defines the `SiteConfig` type.                                                                                                            |
| `components/markdown/copy.tsx`                                        | Provides a copy-to-clipboard button for markdown content.                                                                                 |
| `components/markdown/pre.tsx`                                         | Renders a `<pre>` element with optional copy functionality.                                                                               |
| `lib/pusher/client.ts`                                                | Initializes a Pusher client instance.                                                                                                     |
| `prisma/migrations/migration_lock.toml`                               | Lock file used by Prisma Migrate.                                                                                                         |
| `components/dashboard/empty/sidebar-repo-list.tsx`                    | Displays a message indicating no repositories are present.                                                                                |
| `prisma/schema.prisma`                                                | Defines the data schema for the PostgreSQL database.                                                                                      |
| `components/ui/alert-dialog.tsx`                                      | Provides an alert dialog UI.                                                                                                              |
| `lib/api.ts`                                                          | Defines API endpoints.                                                                                                                    |
| `lib/github.ts`                                                       | Provides a function to parse GitHub repository URLs.                                                                                      |
| `lib/markdown.tsx`                                                    | Configures MDX compilation with remark and rehype plugins.                                                                                |
| `tsconfig.json`                                                       | Configures the TypeScript compiler.                                                                                                       |
| `config/site.ts`                                                      | Defines the configuration for the website.                                                                                                |
| `app/layout.tsx`                                                      | Defines the application layout.                                                                                                           |
| `app/(landing)/hero.tsx`                                              | Creates the hero section for the landing page.                                                                                            |
| `lib/prisma.ts`                                                       | Sets up a Prisma Client instance.                                                                                                         |
| `lib/service-auth.ts`                                                 | Provides functions for creating JSON Web Tokens (JWTs) for service authentication.                                                        |
| `lib/utils.ts`                                                        | Contains utility functions.                                                                                                               |
| `components/global/fade-in.tsx`                                       | React component providing a fade-in animation effect.                                                                                     |
| `components/global/fade-slide-in.tsx`                                 | React component implementing a fade-slide-in animation.                                                                                   |
| `components/home/footer.tsx`                                          | Renders a footer section.                                                                                                                 |
| `components/home/navbar.tsx`                                          | Displays a navigation bar.                                                                                                                |
| `components/dashboard/left-sidebar-repo-header.tsx`                   | Renders a header for the left sidebar on the dashboard.                                                                                   |
| `components/dashboard/left-sidebar-repository-card.tsx`               | Displays a single repository card in the left sidebar.                                                                                    |
| `components/dashboard/left-sidebar.tsx`                               | Fetches and displays a list of user repositories.                                                                                         |
| `components/dashboard/navbar.tsx`                                     | Navbar component for the dashboard.                                                                                                       |
| `components/dashboard/right-sidebar.tsx`                              | Renders a sidebar with information about updates and upcoming features.                                                                   |
| `components/providers/provider.tsx`                                   | Provides global context for the application.                                                                                              |
| `app/(landing)/layout.tsx`                                            | Defines the layout for the landing page.                                                                                                  |
| `app/(landing)/page.tsx`                                              | Renders the main landing page.                                                                                                            |
| `app/dashboard/action.ts`                                             | Contains actions related to the dashboard.                                                                                                |
| `app/dashboard/layout.tsx`                                            | Defines the layout for the dashboard.                                                                                                     |
| `components/providers/toast.tsx`                                      | Manages and displays toast messages.                                                                                                      |
| `components/ui/avatar-menu.tsx`                                       | Renders an avatar with a dropdown menu.                                                                                                   |
| `components/ui/avatar.tsx`                                            | Renders an avatar.                                                                                                                        |
| `components/ui/background-shine.tsx`                                  | Creates a background shine effect.                                                                                                        |
| `components/ui/border-beam.tsx`                                       | Renders an animated border beam.                                                                                                          |
| `components/ui/border-hover-link.tsx`                                 | Renders a link with a border that changes on hover.                                                                                       |
| `prisma/migrations/20250501044111_basic_schema/migration.sql`         | SQL migration script creating the basic database schema.                                                                                  |
| `components/ui/accordion.tsx`                                         | Implements a custom accordion using Radix UI primitives.                                                                                  |
| `app/logs/[id]/repo-logs.tsx`                                         | Fetches and displays repository logs using Pusher.                                                                                        |
| `app/repository/[id]/action.ts`                                       | Server-side function retrieving repository data.                                                                                          |
| `app/repository/[id]/document.tsx`                                    | Renders a single document within a repository.                                                                                            |
| `app/repository/[id]/page.tsx`                                        | Fetches and displays repository documents.                                                                                                |
| `components/ui/button.tsx`                                            | Implements a customizable button.                                                                                                         |
| `components/ui/card.tsx`                                              | Renders a card.                                                                                                                           |
| `components/ui/dropdown-menu.tsx`                                     | Provides a dropdown menu UI.                                                                                                              |
| `components/ui/gradient-button.tsx`                                   | Renders a button with a gradient background.                                                                                              |
| `app/api/repository/processing/route.ts`                              | Handles requests related to repository processing.                                                                                        |
| `app/api/repository/start-process/route.ts`                           | Initiates the processing of a repository.                                                                                                 |
| `app/api/repository/stop-processing/route.ts`                         | Handles requests to stop the processing of a repository.                                                                                  |
| `components/ui/input.tsx`                                             | Provides a customizable input field.                                                                                                      |
| `components/ui/label.tsx`                                             | Renders a label.                                                                                                                          |
| `components/ui/lamp.tsx`                                              | Creates a visually appealing container with a lamp-like design.                                                                           |
| `components/ui/magic-badge.tsx`                                       | Displays a spinning badge.                                                                                                                |
| `components/ui/separator.tsx`                                         | Renders a horizontal or vertical separator.                                                                                               |
| `components/ui/sign-in.tsx`                                           | Provides sign-in functionality.                                                                                                           |
| `components/ui/sonner.tsx`                                            | Integrates Sonner for toast notifications.                                                                                                |
| `app/logs/[id]/layout.tsx`                                            | Handles authentication and fetches repository data before rendering child components.                                                     |
| `app/logs/[id]/page.tsx`                                              | Fetches repository logs and handles cases where the repository is not found or processing is complete.                                    |
| `app/repository/[id]/repository-docs.tsx`                             | Displays repository documentation.                                                                                                        |
| `prisma/migrations/20250501135429_renamed_properties/migration.sql`   | SQL migration modifying the Repository table.                                                                                             |
| `prisma/migrations/20250508211415_removed_contributing/migration.sql` | SQL migration removing the 'contributing' column from the Repository table.                                                               |
