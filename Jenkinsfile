node {

    checkout scm
    stage('Build') {
        echo 'Building..'
        steps{
            sh 'yarn install'
            sh 'npm run test'
        }
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
