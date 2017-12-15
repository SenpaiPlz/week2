node {

        // get the vars from the scm checkout
        // used to reference GIT_COMMIT
        def scmVars = checkout scm
        stage('Setup') {
            echo 'Setup..'
            // Define the node tool and add the env.PATH
            def node = tool name: 'Node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
            env.PATH = "${node}/bin:${env.PATH}"
            sh 'npm install'
        }
        stage('Unit Test'){
            echo 'Running unit tests...'
            // A single run of the unit tests
            sh 'npm run test:nowatch'
            junit '**/testReports/*.xml'
        }
        stage('Build and push to docker'){
            echo 'Building and pushing to docker...'
            // Use the modified ./dockerbuild.sh to setup the ./build dir
            // see modification details in readme
            sh './dockerbuild.sh'
            dir('./build') {
                // build and push the image to hub.docker
                app = docker.build("senpaiplz/hashtagcoolrepo:${scmVars.GIT_COMMIT}")
                docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
                    app.push()
                }
            }
        }
        stage('Test') {
            echo 'Testing..'
            // will be used later for acceptance testing
        }
        stage('Deploy') {
            echo 'Deploying....'
            dir('./provisioning')
            {
                // use the ./provision-new-environment.sh to deploy the image
                // sh "./provision-new-environment.sh ${scmVars.GIT_COMMIT}"
            }
        }
}
