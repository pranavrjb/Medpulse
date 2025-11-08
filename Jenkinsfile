pipeline {
    agent { label 'worker' }

    environment {
        HARBOR_URL = 'harbor.local.registry'
        PROJECT_NAME = 'medpulse'
        FRONTEND_IMAGE = 'medpulse-frontend'
        BACKEND_IMAGE = 'medpulse-backend'
        MONGO_IMAGE = 'mongo:4.4'
        IMAGE_TAG = 'latest'
        ANSIBLE_BIN = '/opt/ansible_env/bin/ansible-playbook'
        PLAYBOOK = '/opt/ansible_env/master.yaml'
        INVENTORY = '/opt/ansible_env/inventory.ini'
    }

    stages {
        stage('Code Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git url: "https://github.com/pranavrjb/Medpulse.git", branch: "feature/Jenkins"
                echo 'Code checkout completed.'
            }
        }
    stage('SonarQube Analysis') {
    steps {
        echo 'Performing SonarQube analysis...'
        withSonarQubeEnv('local-sonarqube') {
            script {
                def scannerHome = tool 'sonar7.2' 
                sh """
                    ${scannerHome}/bin/sonar-scanner \
                    -Dsonar.host.url=http://192.168.56.23:9000 \
                    -Dsonar.login=${SONAR_AUTH_TOKEN} \
                    -Dsonar.projectKey=Medpulse \
                    -Dsonar.projectName=Medpulse \
                    -Dsonar.sources=.
                """
            }
        }
    }
}


        stage('Build Frontend Image') {
            steps {
                echo 'Building Frontend Docker image...'
                sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend"
            }
        }

        stage('Build Backend Image') {
            steps {
                echo 'Building Backend Docker image...'
                sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./backend"
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

                    docker logout ${HARBOR_URL}
                    '''
                }
            }
        }
stage('Debug Environment') {
    agent any
    steps {
        sh '''
        echo "Running on node: $(hostname)"
        echo "Current user: $(whoami)"
        echo "Current directory: $(pwd)"
        echo "Checking for Ansible venv path..."
        '''
    }
}
stage('Run Ansible Playbook') {
    agent {label 'master'}
    steps {
        sh '''
        echo "Activating Ansible virtual environment..."
        cd /opt/ansible_env
        ansible-playbook -i inventory.ini master.yaml
        '''
    }
}

    }

    post {
        success {
            mail (
                to: 'pranavrjb29@gmail.com',
                subject: "Jenkins Job: ${currentBuild.fullDisplayName} - SUCCESS",
                body: "Congratulations! The Medpulse application pipeline finished successfully! Access the build details here: ${env.BUILD_URL}"
            )
        }
        failure {
            mail (
                to: 'pranavrjb29@gmail.com',
                subject: "Jenkins Job: ${currentBuild.fullDisplayName} - FAILURE",
                body: "Unfortunately, the Medpulse application pipeline has failed. Access the build details here: ${env.BUILD_URL}"
            )
        }
    }
}
