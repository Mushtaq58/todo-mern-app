pipeline {
    agent any
    
    environment {
        COMPOSE_PROJECT_NAME = 'jenkins-todo-app'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling code from GitHub...'
                checkout scm
            }
        }
        
        stage('Stop Old Containers') {
            steps {
                script {
                    echo 'Stopping any existing containers...'
                    sh '''
                        docker-compose down || true
                    '''
                }
            }
        }
        
        stage('Build and Deploy') {
            steps {
                script {
                    echo 'Building and deploying containers...'
                    sh '''
                        docker-compose up -d
                    '''
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                script {
                    echo 'Verifying containers are running...'
                    sh 'docker ps'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
            sh 'docker-compose logs'
        }
    }
}
