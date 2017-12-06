node {    

    checkout scm
    stage('Build') {
        echo 'Building..'
        sh './dockerbuild.sh'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
