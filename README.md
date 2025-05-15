
# Project Overview

This project is designed to provide a robust and scalable chat interface application. It leverages modern web technologies and cloud infrastructure to ensure high availability and performance.

## Infrastructure Overview

- **Architecture**: The application is deployed using AWS ECS Fargate, which runs containerized tasks within a Virtual Private Cloud (VPC). An Application Load Balancer (ALB) manages incoming traffic, ensuring efficient distribution and high availability. Docker images are stored in Amazon Elastic Container Registry (ECR).

- **Frontend**: Built with React and TypeScript, providing a dynamic and type-safe user interface.

- **Backend**: Developed using FastAPI and Python, offering a fast and efficient API service.

- **Deployment Target**: The application is hosted on AWS EC2 instances running Ubuntu, providing a reliable and secure environment.

- **CI/CD**: Automated deployment and integration processes are managed through GitHub Actions, ensuring continuous delivery and integration.

- **Secrets Management**: Sensitive information is securely managed using AWS Secrets Manager.

- **Domain**: The application is accessible via the domain `adventis.lokam.ai`.

- **Containerization**: Docker is used for containerizing the application, ensuring consistency across different environments.

## Example Use Case

The application can be used to generate investment portfolios based on client profiles. For example: