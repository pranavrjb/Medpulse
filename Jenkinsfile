pipeline {
    agent {label 'worker'}

    stages {
        stage('Code'){
            steps {
                echo 'Checking out code for the github repository...'
                git url: "https://github.com/pranavrjb/Medpulse.git", branch: "feature/Jenkins"
                echo 'Code checkout completed.'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'whoami'
                sh "docker compose down"
                sh "docker compose build"
                echo "Building the application successfully..."
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'docker compose up -d'
            }
        }
    }
  }