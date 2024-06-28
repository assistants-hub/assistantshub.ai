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

Assistants Hub is not another LLM user interface, it is a comprehensive platform that enables businesses and AI practitioners to build, integrate, and deploy AI assistants to their end users with ease. Here are some reasons why you should consider using Assistants Hub:

- **Rapid Build and Rollout**: Quickly create and deploy your AI assistants with our intuitive setup and detailed documentation.
- **Comprehensive Platform**: Utilize advanced analytics, conversation history tracking, and extensive customization options to tailor your assistant to your needs.
- **Extensive Collection of Models**: Access a wide variety of AI models to power your assistants, ensuring the best fit for your specific use case.

## Key Features

- **Extensive LLM and GPT models**: Access the latest AI models from OpenAI, Google, Anthropic and Groq to power your AI assistants.
- **Streaming Responses**: Enable real-time interactions with your AI assistant through streaming responses.
- **Analytics**: Monitor and analyze your assistant's performance with detailed analytics and insights.
- **Conversation Log**: Review and analyze past conversations to improve your assistant's responses.
- **Customizations**: Tailor your assistant's appearance, behavior, and responses to suit your needs.
- **Easy Integration**: Seamlessly integrate your assistant with popular platforms and services.
- **Document Management**: Organize and manage your assistant's documents for quick reference and retrieval.
- **Function Integration**: Extend your assistant's capabilities by integrating custom functions and services.

Explore our [Guides](https://docs.assistantshub.ai/docs/category/guides) to get started with Assistants Hub or check out our [Demos](https://docs.assistantshub.ai/docs/category/demos) to see our AI assistants in action.

Below is an AI assistant demo generated with Assistants Hub available at [Math Whiz Kid](https://docs.assistantshub.ai/docs/demos/math-tutor)

<div style="text-align: center;">
  <img src="./docs/math-whiz-kid.gif" alt="Math Whiz Kid" width="380px"/>
</div>

## Supported Models

### OpenAI Models

All models that support [OpenAI's Assistants API](https://platform.openai.com/docs/models/overview) are supported by [Assistants Hub](https://assistantshub.ai).

| Model Name         | Provider | Streaming <br/>Responses | Documents                | Functions                |
| ------------------ | -------- | ------------------------ | ------------------------ | ------------------------ |
| GPT-4o             | OpenAI   | :white_check_mark:       | :white_check_mark:       | :construction:           |
| GPT-4-Turbo        | OpenAI   | :white_check_mark:       | :white_check_mark:       | :construction:           |
| GPT-4              | OpenAI   | :white_check_mark:       | :white_check_mark:       | :construction:           |
| GPT-3.5-Turbo      | OpenAI   | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |
| GPT-3.5-Turbo-16k  | OpenAI   | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |
| GPT-3.5-Turbo-0125 | OpenAI   | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |

### Google Gemini Models

The gemini-1.5-pro-latest model is a large-scale language model developed by Google. It is designed to generate human-like text based on the input provided to it. The model is trained on a diverse range of text data to ensure that it can handle a wide variety of tasks and topics. [Read More](https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/#sundar-note)

| Model Name              | Provider | Streaming <br/>Responses | Documents                | Functions                |
| ----------------------- | -------- | ------------------------ | ------------------------ | ------------------------ |
| Gemini-1.5-Pro-latest   | Google   | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |
| Gemini-1.5-Flash-latest | Google   | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |

### Anthropic Models

All models that support [Anthropic API](https://docs.anthropic.com/en/docs/models-overview) are supported by [Assistants Hub](https://assistantshub.ai).

| Model Name        | Provider  | Streaming <br/>Responses | Documents                | Functions                |
| ----------------- | --------- | ------------------------ | ------------------------ | ------------------------ |
| Claude 3 Opus     | Anthropic | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |
| Claude 3.5 Sonnet | Anthropic | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |
| Claude 3 Sonnet   | Anthropic | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |
| Claude 3 Haiku    | Anthropic | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |

### Gorq Cloud

All models that support [Gorq Cloud API](https://console.groq.com/docs/models) are supported by [Assistants Hub](https://assistantshub.ai).

| Model Name         | Provider | Streaming <br/>Responses | Documents                | Functions                |
| ------------------ | -------- | ------------------------ | ------------------------ | ------------------------ |
| Llama3-8b-8192     | Groq     | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |
| Llama3-70b-8192    | Groq     | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |
| Mixtral-8x7b-32768 | Groq     | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |
| Gemma-7b-it-8192   | Groq     | :white_check_mark:       | :heavy_multiplication_x: | :heavy_multiplication_x: |

## Getting Started

To get started with Assistants Hub, you'll need to have Node.js installed on your machine. Follow the steps below to set up your development environment.

```bash
git clone https://github.com/assistants-hub/assistantshub.ai
cd assistantshub.ai
pnpm install
```

### Prerequisites

- Node.js (LTS version recommended)
- pnpm
- PostgreSQL database

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
   - You can configure Auth0 by creating a temporary tenant and following instructions mentioned in [Auth0 Next.js Documentation](https://auth0.com/docs/quickstart/webapp/nextjs/01-login)

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

OpenAI, Anthropic, Groq and Google for their exceptional APIs that powers the intelligence of our assistants.
The Next.js community, for providing the robust framework that makes this project possible.

Thank you for exploring Assistants Hub. We're eager to see the incredible AI assistants you'll build and deploy!
