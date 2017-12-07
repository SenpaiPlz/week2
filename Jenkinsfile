node {    

    def scmVars = checkout scm
    stage('Build') {
        echo 'Building..'
        def node = tool name: 'Node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${node}/bin:${env.PATH}"
        /*sh 'npm run build'
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
            sh "docker image push 'senpaiplz/hashtagcoolrepo:${scmVars.GIT_COMMIT}'"
        }*/
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
