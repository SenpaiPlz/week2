node {    

    checkout scm
    stage('Build') {
        echo 'Building..'
        sh 'npm install'
        dir('./client'){
            sh 'npm install'
        }
        sh './dockerbuild.sh'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
