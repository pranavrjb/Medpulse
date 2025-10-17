pipeline {
    agent any

    stages {
        stage('Code'){
            steps {
                echo 'Checking out code for the github repository...'
                git url: "https://github.com/pranavrjb/Medpulse.git"
                echo 'Code checkout completed.'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
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
            }
        }
    }
  }