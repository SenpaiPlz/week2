node {    

    def scmVars = checkout scm
    stage('Setup') {
        echo 'Setup..'
        def node = tool name: 'Node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${node}/bin:${env.PATH}"
    }
    stage('Unit Test'){
        echo 'Running unit tests...'
        sh 'npm run testnowatch'
    }
    stage('Build and push to docker'){
        echo 'Building and pushing to docker...'
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
    }
    stage('Deploy') {
        echo 'Deploying....'
        dir('./provisioning')
        {
            sh "./provision-new-environment.sh ${scmVars.GIT_COMMIT}"
        }
    }
}
