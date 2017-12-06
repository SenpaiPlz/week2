node {    

    def scmVars = checkout scm
    stage('Build') {
        echo 'Building..'
        def node = tool name: 'Node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${node}/bin:${env.PATH}"
        sh 'npm install'
        dir('./client'){
            sh 'npm install'
        }
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
            sh './dockerbuild.sh'
        }
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
