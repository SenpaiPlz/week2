# Clone of hgop/week2 repository
## General Q/A

### Why a clone instead of a fork?
Well as it turns out, I decided to clone the repo and make some changes before reading the line "Fork week2" in the assignment.
To ammend this as well as I could, I added the hgop/week2 as a remote upstream, to ease pulling and requesting pull requests to the original repo.

### What's up with the failures/commits on the jenkins pipeline?
The answer to this question is twofold.

- The large number of failures to build in the jenkins pipeline is attributed to me pushing minute changes to the jenkins file, in order to test the behaviour of the pipeline. In turn most of the failures are on the days at which the pipeline was not yet up and running correctly. I could have created a new pipeline with the exact same settings etc, to clean the commits up, but I decided to leave them in to allow people to see the learning curve I went through in setting up the pipeline.
- The low number of successful pushes after the pipeline went up, can be attributed to me writing the tests and gamelogic in a TDD manner using the 'npm run test' while the pipeline was still down, resulting in multiple commits but a singular large push of most of the game logic once the pipeline went up.

I however kept one test incomplete, just to show the workings of the pipeline. This can be seen in build #68-70 on the pipeline.

### What is this "Testing" phase in the jenkins pipeline and why is it seperate from the "Unit test" phase?
The testing phase is simply a placeholder for the acceptance test that are going to be implemented later.

We want to keep unit tests and acceptance test seperate as we dont want to spend time building and pushing a broken build that fails unit tests to docker. We however need to do that in-order to perform our acceptance tests.

### Jenkins instance info:

Instance URL: http://ec2-54-154-169-195.eu-west-1.compute.amazonaws.com:8080/
 
Jenkins login info:
- user: hgop
- pass: see handin comment

see jenkns.md for more details about jenkins setup etc.
