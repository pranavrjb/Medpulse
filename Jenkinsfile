pipeline {
    agent { label 'worker' }

    environment {
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
                echo 'Code checkout completed.'
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker images...'
                sh 'docker compose down'
                sh 'docker compose build'
                echo 'Docker images built successfully.'
            }
        }

        stage('Push to Harbor') {
            steps {
                echo 'Pushing Docker images to Harbor...'

                withCredentials([usernamePassword(
                    credentialsId: 'HarborRegistryCred',
                    usernameVariable: 'HARBOR_USER',
                    passwordVariable: 'HARBOR_PASS'
                )]) {
                    sh '''
                    echo "$HARBOR_PASS" | docker login ${HARBOR_URL} -u "$HARBOR_USER" --password-stdin
                    
                    docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} ${HARBOR_URL}/${PROJECT_NAME}/${FRONTEND_IMAGE}:${IMAGE_TAG}
                    docker push ${HARBOR_URL}/${PROJECT_NAME}/${FRONTEND_IMAGE}:${IMAGE_TAG}

                    docker tag ${BACKEND_IMAGE}:${IMAGE_TAG} ${HARBOR_URL}/${PROJECT_NAME}/${BACKEND_IMAGE}:${IMAGE_TAG}
                    docker push ${HARBOR_URL}/${PROJECT_NAME}/${BACKEND_IMAGE}:${IMAGE_TAG}

                    docker tag ${MONGO_IMAGE} ${HARBOR_URL}/${PROJECT_NAME}/mongo:4.4
                    docker push ${HARBOR_URL}/${PROJECT_NAME}/mongo:4.4

                        echo " Logging out..."
                        docker logout ${HARBOR_URL}
                    '''
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh 'docker compose up -d'
            }
        }
    }
    post{
    success{
        mail (
            to: 'pranav.rjb79@gmail.com',
            subject: "Jenkins Job: ${currentBuild.fullDisplayName} - SUCCESS",
            body: "The Medpulse application pipeline finished successfully! Access the build details here: ${env.BUILD_URL}"
        )
    }
    failure{
        mail (
            to: 'pranav.rjb79@gmail.com',
            subject: "Jenkins Job: ${currentBuild.fullDisplayName} - FAILURE",
            body: "The Medpulse application pipeline failed. Access the build details here: ${env.BUILD_URL}"
        )
    }
}
}
