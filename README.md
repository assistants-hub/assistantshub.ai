<div align="center">
<img width="150px" src="./docs/assistants-hub-logo.png" />

# Assistants Hub

### The Open Source Assistants Management Portal

<p>
<img alt="Vercel Build Status" src="https://vercelbadge.vercel.app/api/assistants-hub/assistantshub.ai" />
<img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/assistants-hub/assistantshub.ai" />
<img alt="" src="https://img.shields.io/github/repo-size/assistants-hub/assistantshub.ai" />
<img alt="GitHub Issues" src="https://img.shields.io/github/issues/assistants-hub/assistantshub.ai" />
<img alt="GitHub Pull Requests" src="https://img.shields.io/github/issues-pr/assistants-hub/assistantshub.ai" />
<img alt="GitHub License" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</p>

---

<p align="center">
  <a href="https://docs.assistantshub.ai/docs/category/demos">Demo</a> •
  <a href="https://docs.assistantshub.ai/docs/intro">Tutorials</a> •
  <a href="https://assistantshub.ai">Assistants Hub</a> •
</p>
</div>
-----

Welcome to Assistants Hub, where you can **Build, Integrate, and Deploy AI Assistants in Minutes**. This project leverages the power of Next.js and OpenAI to provide a streamlined platform for creating sophisticated AI assistants. Our mission is to democratize AI development, making it accessible for developers, hobbyists, and businesses to innovate and implement AI solutions effortlessly.

---

![Landing](./docs/landing.png)

## Key Features

- **Rapid Development**: Jumpstart your AI assistant project with our easy-to-follow setup and comprehensive documentation.
- **Seamless Integration**: Connect your assistant with a wide array of APIs and services to enhance its functionality and intelligence.
- **Community-Powered**: Tap into the collective knowledge of a vibrant community dedicated to pushing the boundaries of AI assistants.

Explore our [Guides](https://docs.assistantshub.ai/docs/category/guides) to get started with Assistants Hub or check out our [Demos](https://docs.assistantshub.ai/docs/category/demos) to see our AI assistants in action.

Below are some exciting AI assistant demos generated with Assistants Hub you can play with:

- [Blimey! British Slang](https://docs.assistantshub.ai/docs/demos/british-slang-generator)
- [Math Whiz Kid](https://docs.assistantshub.ai/docs/demos/math-tutor)
- [Customer Support Agent](https://docs.assistantshub.ai/docs/demos/customer-support-agent)
- [Creative Recipe Suggestions](https://docs.assistantshub.ai/docs/demos/creative-recipe-suggestions)

![British Slang](./docs/math-tutor.gif)

</div>

## Getting Started

To get started with Assistants Hub, you'll need to have Node.js installed on your machine. Follow the steps below to set up your development environment.

### Prerequisites

- Node.js (LTS version recommended)
- pnpm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/assistants-hub/assistantshub.ai
   ```

2. Navigate to the project directory

   ```bash
   cd assistantshub.ai
   ```

3. Install the dependencies

   ```bash
    pnpm install
   ```

4. Configure your environment: Rename .env.local.example to .env.local and fill in your OpenAI API key along with any other necessary settings.

5. Configure Postgres Database

   - Install Postgres on your machine
   - Create a new database
   - Update the DATABASE_URL in the .env.local file with your database connection string
   - Install `timescaledb` extension in your database

6. Start the development server

   ```bash
   pnpm dev
   ```

Visit http://localhost:3001 in your browser to see your AI assistant in action.

## Contributing

Your contributions can help make Assistants Hub even better. If you're interested in contributing, please read our [CONTRIBUTING.md](./CONTRIBUTING.md) file to learn how you can get involved.

## Support

Encountered a bug or need help? Open an issue in our GitHub repository, and we'll do our best to address it.

## License

Assistants Hub is released under the [MIT license](./LICENSE), promoting open and collaborative development.

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Configuring TimescaleDB with Prisma](https://gist.github.com/janpio/2a425f22673f2de54469772f16af8118)

## Acknowledgements

We extend our gratitude to:

OpenAI, for their exceptional API that powers the intelligence of our assistants.
The Next.js community, for providing the robust framework that makes this project possible.

Thank you for exploring Assistants Hub. We're eager to see the incredible AI assistants you'll build and deploy!
