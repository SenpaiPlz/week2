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
        app = docker.build("senpaiplz/hashtagcoolrepo")
        docker.withRegistry('https://registry.hub.docker.com', 'docker-dub-credentials'){
            app.push("${scmVars.GIT_COMMIT})
        }
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
