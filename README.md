

High-level AWS architecture – ECS Fargate tasks (containers) running in a VPC behind an Application Load Balancer. Images are stored in ECR, and users access the app via the ALB.


🧱 Infrastructure Overview
Frontend: React + TypeScript

Backend: FastAPI + Python

Deployment Target: AWS EC2 (Ubuntu)

CI/CD: GitHub Actions

Secrets Management: AWS Secrets Manager

Domain: adventis.lokam.ai

Containerization: Docker




Example Prompt:

```
    # Example task
    task = """I need an investment portfolio for a client with the following profile:
    - 45-year-old professional
    - Income: $200,000/year
    - Investment horizon: 20 years
    - Risk tolerance: Moderate
    - Goal: Retirement planning
    Please analyze and provide a comprehensive investment proposal.""" 

```