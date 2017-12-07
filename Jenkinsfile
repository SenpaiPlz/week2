node {    

    def scmVars = checkout scm
    stage('Build') {
        echo 'Building..'
        def node = tool name: 'Node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${node}/bin:${env.PATH}"
        dir('./build') {
            app = docker.build("senpaiplz/hashtagcoolrepo:${scm.GIT_COMMIT}")
            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
                app.push()
            }
        }
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
        dir('./provisioning')
        {
            sh './provision-new-environment.sh ${scmVars.GIT_COMMIT}'
        }
    }
}
