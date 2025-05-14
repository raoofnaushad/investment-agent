
## About the infra
Remember that we would be following the best practices. We wanted to dockerize the application and possibly deploy in AWS ECS. Looking for a scalable production ready solution. Keep that in mind while developing.


uvicorn app.main:app --reload


docker build -t lokam-private-assistant-backend .
   docker run -p 8000:8000 my-fastapi-app