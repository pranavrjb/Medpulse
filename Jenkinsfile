pipeline {
    agent { label 'worker' }

    environment {
        DOCKER_BUILDKIT = '1'
        COMPOSE_DOCKER_CLI_BUILD = '1'
        HARBOR_URL = 'harbor.local.registry'
        PROJECT_NAME = 'medpulse'
        FRONTEND_IMAGE = 'medpulse-frontend'
        BACKEND_IMAGE = 'medpulse-backend'
        MONGO_IMAGE = 'mongo:4.4'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Code') {
            steps {
                echo 'Checking out code from the GitHub repository...'
                git url: "https://github.com/pranavrjb/Medpulse.git", branch: "feature/Jenkins"
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker images with BuildKit...'
                sh 'docker compose down'
                sh 'docker compose build'
                echo 'Docker images built successfully with BuildKit.'
            }
        }

        stage('Build & Push to Harbor') {
    steps {
        echo 'Building and pushing Docker images to Harbor using Buildx (OCI format)...'

        withCredentials([usernamePassword(
            credentialsId: 'HarborRegistryCred',
            usernameVariable: 'HARBOR_USER',
            passwordVariable: 'HARBOR_PASS'
        )]) {
            sh '''
            echo "$HARBOR_PASS" | docker login ${HARBOR_URL} -u "$HARBOR_USER" --password-stdin

            # Ensure Buildx builder exists
            docker buildx create --name medpulse_builder --use || docker buildx use medpulse_builder

            # Build & push backend image
            docker buildx build \
              --platform linux/amd64 \
              --provenance=false \
              --push \
              -t ${HARBOR_URL}/${PROJECT_NAME}/${BACKEND_IMAGE}:${IMAGE_TAG} ./backend

            # Build & push frontend image
            docker buildx build \
              --platform linux/amd64 \
              --provenance=false \
              --push \
              -t ${HARBOR_URL}/${PROJECT_NAME}/${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend

            docker logout ${HARBOR_URL}
            '''
        }
    }
}


        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }

    post{
    success{
        mail (
            to: 'pranavrjb29@gmail.com',
            subject: "Jenkins Job: ${currentBuild.fullDisplayName} - SUCCESS",
            body: "The Medpulse application pipeline finished successfully! Access the build details here: ${env.BUILD_URL}"
        )
    }
    failure{
        mail (
            to: 'pranavrjb29@gmail.com',
            subject: "Jenkins Job: ${currentBuild.fullDisplayName} - FAILURE",
            body: "The Medpulse application pipeline failed. Access the build details here: ${env.BUILD_URL}"
        )
    }
}
}
