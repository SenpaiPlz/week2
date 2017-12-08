# Jenkins readme file
## Initial setup
### Setting up the jenkins ec2 instance

Instance URL: http://ec2-54-154-169-195.eu-west-1.compute.amazonaws.com:8080/

Jenkins login info:
- user: hgop
- pass: see handin comment

The instance was setup by running the script ./create-ec2-jenkins-instance.sh in https://github.com/SenpaiPlz/HGOP/tree/master/Week\_02/Day\_1/provisioning

The ./create-ec2-jenkins-instance.sh script does the following:
- Create a security group called hgop-jenkins
- Setup firewall rules for the security group
- Create a key-pair associated with that security group
- Instanciate the instance using the ./bootstrap-jenkins.sh  script as the instance init script.
    - This script sets up git, jenkins and docker.
- Finally it associates the instance to a instance profile created following the steps in: https://github.com/hgop/syllabus-2017/blob/master/Assignment/Day6/JENKINS.md

### Configuring the jenkins ec2 instance
There were a few configuration details required to get jenkins up and running correctly, most steps are included in: https://github.com/hgop/syllabus-2017/blob/master/Assignment/Day6/JENKINS.md

To be complete I will list out the steps I did to setup jenkins.
- ssh into the ec2-jenkins instance
- change user to jenkins user
- generate the ssh key to use with the github plugin
- configure aws such that this user can use the aws cli to instanciate new instances
- exit the jenkins user
- change the jenkins config file to not use security
- reboot the instance and the jenkins service
- login to the jenkins instance via browser using the instance public ip and  port 8080
- configure security to allow signed in users to do anything and allowing user to signup
- create a jenkins account and disable the allow users to signup option
- install the pipeline addon
- configure the nodeJS tool

After doing these steps then the jenkins instance is up and running!

## Creating the pipeline
Creating a pipeline is mostly just configuration details, which can easily found online. Therefore I will not go into great detail and mostly just say the step I took, not how I took it. This is done to keep this section breef and to point.

### Steps taken to create the pipeline
- Create a new pipeline using the jenkins interface
- Configure the pipeline to use github as a scm
- Set up a webhook that hooks on each commit to the repo
- Set up docker credentials under credentials in jenkins
- Create and configure a Jenkinsfile to setup the pipeline
    - See the Jenkinsfile for more info on what the pipeline does
