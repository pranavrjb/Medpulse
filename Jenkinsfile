pipeline {
    agent any

    environment {
        HARBOR_URL = 'harbor.local.registry'
        PROJECT_NAME = 'medpulse'
        FRONTEND_IMAGE = 'medpulse-frontend'
        BACKEND_IMAGE = 'medpulse-backend'
        MONGO_IMAGE = 'mongo:4.4'
        IMAGE_TAG = 'latest'
        ANSIBLE_BIN = '/home/vagrant/ansible_env/bin/ansible-playbook'
        PLAYBOOK = '/home/vagrant/ansible_env/master.yaml'
        INVENTORY = '/home/vagrant/ansible_env/inventory.ini'
    }

    stages {
        stage('Code Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git url: "https://github.com/pranavrjb/Medpulse.git", branch: "feature/Jenkins"
                echo 'Code checkout completed.'
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

        stage('Quality Check') {
            steps {
                echo 'Performing quality checks...'
                // You can integrate linters/tests here
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
    agent any
    steps {
        sh '''
        echo "Activating Ansible virtual environment..."
        cd /home/vagrant
        source ansible_env/bin/activate
        echo "Running Ansible playbook..."   
        cd /home/vagrant/ansible_env
        ansible-playbook -i inventory.ini master.yaml -vvv
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
