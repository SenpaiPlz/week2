node {    

    def scmVars = checkout scm
    stage('Build') {
        echo 'Building..'
        def node = tool name: 'Node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${node}/bin:${env.PATH}" 
        sh './dockerbuild.sh'
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
            docker.push("senpaiplz/hashtagcoolrepo:${scmVars.GIT_COMMIT})
        }
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
