node {
    checkout scm
    stage('Build') {
        echo 'Building..'
        sh 'npm run test'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
