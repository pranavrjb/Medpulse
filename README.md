<h1 align="center">🚀 DevOps Pipeline for MERN Stack Application</h1>

## **📘 Overview**

This project demonstrates a complete CI/CD pipeline for a MERN (MongoDB, Express, React, Node.js) web application using modern DevOps tools.
The goal is to automate the process of building, testing, analyzing, deploying, and monitoring a web application with high reliability and minimal manual effort.

### **💻 Application Tech Stack**
#### **Technology	Purpose**
**MongoDB**	Database for storing application data

**Express.js**	Backend framework for handling API routes

**React.js**	Frontend framework for building UI

**Node.js**	Runtime environment for backend logic

### **⚙️ DevOps Tools & Technologies Used**
#### **Tool	Purpose**
**Docker**	Containerization of the MERN application

**Jenkins**	Continuous Integration and Continuous Deployment (CI/CD)

**SonarQube**	Static Code Analysis to ensure code quality

**Ansible**	Automated Deployment to servers

**Prometheus**	Metrics collection and performance monitoring

**Grafana**	Visualization and observability dashboards

### **🧩 Project Workflow**
#### **1. Source Code Management**

The application source code is hosted on GitHub.

Any commit or pull request triggers a Jenkins pipeline automatically.

**2. Continuous Integration (CI)**

Jenkins builds the Docker images for the MERN application.

SonarQube performs static code analysis to ensure the code meets quality standards.

**3. Continuous Deployment (CD)**

Once the build passes, Ansible automates the deployment process to the target environment using Docker containers.

**4. Monitoring & Observability**

Prometheus collects real-time metrics from the running containers.

Grafana visualizes metrics and provides dashboards for performance monitoring and alerting.


### **🛠️ Prerequisites**

Before running this project, make sure you have:

Docker & Docker Compose installed

Jenkins configured and running

SonarQube server set up

Prometheus & Grafana configured for monitoring

Ansible installed and SSH access to the deployment server

## 🚀 **How to Run the Project**

1. **Clone this repository**
   ```bash
   git clone https://github.com/pranavrjb/Medpulse.git
   cd Medpulse

**2. Start the Docker Containers**
 ```bash
   sudo docker compose up -d
 ```
**4. Access Jenkins**

    URL: http://localhost:8080
    
    Configure Jenkins pipeline using the Jenkinsfile provided in this repository.

**5. Run SonarQube Analysis**

    Jenkins automatically triggers SonarQube analysis during the pipeline build stage.

**6. Deploy with Ansible**
```bash 
ansible-playbook -i inventory.ini master.yml
```

**7. Monitor Metrics**

    **Prometheus**: http://localhost:9090
    
    **Grafana**: http://localhost:3000
   

