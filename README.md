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

---

Welcome to Assistants Hub, where you can **Build, Integrate, and Deploy AI Assistants in Minutes**. This project leverages the power of Next.js, OpenAI, Google and other AI services to provide a streamlined platform for creating sophisticated AI assistants. Our mission is to democratize AI development, making it accessible for developers, hobbyists, and businesses to innovate and implement AI solutions effortlessly.

---

![Landing](./docs/landing.png)

## Why should you use Assistants Hub?

- **Rapid Development**: Jumpstart your AI assistant project with our easy-to-follow setup and comprehensive documentation.
- **Seamless Integration**: Connect your assistant with a wide array of APIs and services to enhance its functionality and intelligence.
- **Community-Powered**: Tap into the collective knowledge of a vibrant community dedicated to pushing the boundaries of AI assistants.

## Key Features

* **Extensive LLM and GPT models**: Access the latest AI models from OpenAI, Google, and Groq to power your AI assistants.
* **Streaming Responses**: Enable real-time interactions with your AI assistant through streaming responses.
* **Analytics**: Monitor and analyze your assistant's performance with detailed analytics and insights.
* **Conversation Log**: Review and analyze past conversations to improve your assistant's responses.
* **Customizations**: Tailor your assistant's appearance, behavior, and responses to suit your needs.
* **Easy Integration**: Seamlessly integrate your assistant with popular platforms and services.
* **Document Management**: Organize and manage your assistant's documents for quick reference and retrieval.
* **Function Integration**: Extend your assistant's capabilities by integrating custom functions and services.

Explore our [Guides](https://docs.assistantshub.ai/docs/category/guides) to get started with Assistants Hub or check out our [Demos](https://docs.assistantshub.ai/docs/category/demos) to see our AI assistants in action.

Below is an AI assistant demo generated with Assistants Hub available at [British Slang](https://docs.assistantshub.ai/docs/demos/british-slang-generator)

<img src="./docs/math-whiz-kid.gif" alt="Math Whiz Kid" width="380px"/>

## Supported Models

| Model Name            | Provider | Streaming Responses | Documents | Functions |
|-----------------------|----------|---------------------|-----------|-----|
| GPT-4o                | OpenAI   | :white_check_mark:  | :white_check_mark: | :construction: |
| GPT-4-Turbo           | OpenAI   | :white_check_mark:  | :white_check_mark: | :construction: |
| GPT-4                 | OpenAI   | :white_check_mark:  | :white_check_mark: | :construction: |
| GPT-3.5-Turbo         | OpenAI | :white_check_mark:  | :x: | :x: |
| Gemini-1.5-pro-latest | Google | :white_check_mark:  | :x: | :x: |
| Llama3-8b-8192        | Groq | :white_check_mark:  | :x: | :x: |
| Llama3-70b-8192       | Groq | :white_check_mark:  | :x: | :x: |
| Mixtral-8x7b-32768    | Groq | :white_check_mark:  | :x: | :x: |
| gemma-7b-it-8192      | Groq | :white_check_mark:  | :x: | :x: |

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

4. Configure your environment: Rename `.env.template` to `.env` and fill in the necessary settings.

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

7. Logging into your local instance.
   - By default the local instance is configured to use Credentials based authentication.
   - You can login using CREDENTIALS_APPROVED_USERNAME and CREDENTIALS_APPROVED_PASSWORD in your .env file.

## Contributing

Your contributions can help make Assistants Hub even better. If you're interested in contributing, please read our [CONTRIBUTING.md](./CONTRIBUTING.md) file to learn how you can get involved.

## Support

Encountered a bug or need help? Open an issue in our GitHub repository, and we'll do our best to address it.

## License

Assistants Hub is released under the [MIT license](./LICENSE), promoting open and collaborative development.

## Disclaimers

Please review our [DISCLAIMER.md](./DISCLAIMER.md) to understand the limitations and legal disclaimers associated with using Assistants Hub.

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Configuring TimescaleDB with Prisma](https://gist.github.com/janpio/2a425f22673f2de54469772f16af8118)

## Acknowledgements

We extend our gratitude to:

OpenAI, Groq and Google for their exceptional APIs that powers the intelligence of our assistants.
The Next.js community, for providing the robust framework that makes this project possible.

Thank you for exploring Assistants Hub. We're eager to see the incredible AI assistants you'll build and deploy!
