node {    

    def scmVars = checkout scm
    stage('Build') {
        echo 'Building..'
        def node = tool name: 'Node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${node}/bin:${env.PATH}"
        sh './dockerbuild.sh'
        dir('./build') {
            app = docker.build("senpaiplz/hashtagcoolrepo:${scmVars.GIT_COMMIT}")
            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
                app.push()
            }
        }
    }
    stage('Test') {
        echo 'Testing..'
        sh 'npm run testnowatch'
    }
    stage('Deploy') {
        echo 'Deploying....'
        dir('./provisioning')
        {
            sh "./provision-new-environment.sh ${scmVars.GIT_COMMIT}"
        }
    }
}
