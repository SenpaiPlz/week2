node {    

    checkout scm
    stage('Build') {
        echo 'Building..'
        def node = tool name: 'Node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${node}/bin:${env.PATH}"
        'sh npm install'
        'sh npm run test'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
