# ReadmeX

### Why This Exists

readmex is a platform designed to streamline the process of managing and summarizing codebases. It provides a centralized web application for user authentication, repository management, and job tracking, while also offering a robust ingestion and summarization pipeline for codebase analysis. This platform aims to simplify the complexities of codebase management, making it easier for developers to focus on their core tasks.

### What It Does

- **Automated Codebase Summarization**: readmex generates human-readable summaries of file purpose and responsibility using AI-powered analysis.
- **Centralized Repository Management**: The platform provides a robust interface for repository navigation, management, and visibility boosting.
- **Job Tracking and Management**: readmex offers a centralized pipeline for job tracking, including API access to job logs and retrieval of job logs for a given job ID.
- **User Authentication and Authorization**: The platform handles user authentication through Google and credentials-based sign-in, as well as manages session security tokens and provides a centralized route management system.
- **Error Handling and Validation**: readmex provides services for error handling and validation middleware, ensuring consistency and integrity across various operations.
- **Environment Configuration Validation**: The API relies on environment configuration validation, ensuring that the platform is properly configured for optimal performance.

### How It's Built

#### 🔐 Authentication and Authorization (`/apps/web` and `/packages/shared/src`)

The core authentication and authorization mechanism is handled by the `apps/web` module, which provides user authentication through Google and credentials-based sign-in, as well as manages session security tokens. The `packages/shared/src` module exports authentication-related schema definitions, validation rules for user sign-up and sign-in data, and error codes for user, authentication, and repository-related issues.

#### 📁 Repository Management (`/apps/web/features/repo`)

The `apps/web/features/repo` module serves as the core repository management pipeline, handling user input for repository submission, validating and ingesting GitHub repositories, and providing a robust interface for repository navigation and management.

#### 🧠 AI Map-Reduce Pipeline (`/apps/worker/src`)

The `apps/worker/src` module serves as the core ingestion and summarization pipeline for a codebase, handling file ingestion via directory traversal, managing summarization queues, and generating human-readable summaries of file purpose and responsibility using AI.

#### 📝 API Infrastructure (`/`)

The root directory serves as the core API infrastructure for the application, handling authentication and authorization via custom Express.js request types and JWT management, as well as providing services for job, repository, and mail management, and error handling and validation middleware.
