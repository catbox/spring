Spring MVC in a nutshell:
-------------------------
1) Model: A POJO class is created to bind form fields with properties of the object. This object will be put into the model (model object).
        
2) View: Spring MVC form tags are used to render the equivalent HTML form fields, and bind the object in the model with the form.
        
3) Controller: Alongside with handling requests, the controller binds the model object with the view and vice-versa, and delegates processing to dedicated business/service class.

Project Creation:
-----------------

1) File > New > Other... > Maven Project

2) Set the maven archetype to maven-archetype-webapp

3) To run the project on a web server, go to Project Facets and convert it to its faceted form.

4) From the Project Facets configuration screen, select Dynamic Web Module.
   This will show the "Further Configuration available..." link. Click on it.
   
5) Set Content directory to src/main/webapp

6) Add Spring Framework - Open the POM.xml file and add the following:

   <properties>  
       <spring.version>the-spring-release</spring.version>  
       <jdk.version>some-jdk-version</jdk.version>
   </properties>
   
   <dependencies>
  
      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-core</artifactId>
          <version>${spring.version}</version>
      </dependency>

      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-web</artifactId>
          <version>${spring.version}</version>
      </dependency>

      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-webmvc</artifactId>
          <version>${spring.version}</version>
      </dependency>
    
   </dependencies>

7) The entry point of Spring Based Applications is the Dispatcher Servlet (Front Controller) defined in the Deployment Descriptor - web.xml

   <context-param>
       <param-name>contextConfigLocation</param-name>
       <param-value>/WEB-INF/someName-servlet.xml</param-value>
   </context-param>
  
8) Create the Dispatcher Servlet (Front Controller) that will intercept incoming http/https request and find 
   the appropriate handler mappings to delegate the request to the Controller.
   
   The Dispatcher Servlet (Front Controller) is defined in an xml file under the WEB-INF folder with the following name format: someName-servlet.xml
   
   The Dispatcher Servlet (Front Controller) contains the entry point to the Controller defined within the tag:
   
   <context:component-scan base-package="somepackage"/>
   
   The Dispatcher Servlet (Front Controller) also defines the View Resolver Bean which specifies the location of the jsp files.
   
   This bean will resolve the view and add the prefix string /WEB-INF/jsp/ and suffix .jsp to the view in ModelAndView.

9) Create the controller class in a package under the folder src/main/java

   The controller class is annotated with the annotation @Controller at the top of the class declaration so that Spring recognizes this class as a controller.
   
   The @RequestMapping annotation tells Spring that this controller should process all requests beginning with /hello in the URL path.
   
   The method that is annotated with the @RequestMapping annotation returns to the Front Controller either a ModelAndView, a Model, a View or simply a String 
   that represent a path to the rendering file.
   
   The selected view is then rendered back to client.

10) Create a folder view under WEB-INF and in the view folder, create the landing page. 

	This is the first page that is rendered when the application launches. By default this is the index file.
    
    In this particular example the landing page is the home.jsp file and it is define in the Controller in the following manner:
    
    /** load the home page **/
	@RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView loadHomePage() {
        return new ModelAndView("home", "message", message);
    }
    
    Note that the landing page can be given any name, here it is simply being called home and it refers to the home.jsp file in the View folder.
    
    When the client (a web browser) executes the application for the first time, it does so by submitting a request to the server and that request is interpreted as a GET.
    
    The application that is running on the server returns a ModelAndView, a Model, a View or simply a String 
   	that represent a path to the rendering file.
     
11) To include all the resources that the application needs, run the mvn eclipse:eclipse command on the project. 

	Alternatively (that's the way I personally prefer) set up and run a maven task with the following parameters:

	Name = Hello - Eclipse
	Base directory = ${workspace_loc:/Hello}
	Goals = eclipse:eclipse
	Maven Runtime = C:\Program Files\Apache Software Foundation\apache-maven-3.2.1

12) Select the project (in this case Hello) and right click on it.

13) Go to properties and select Deployment Assembly.

14) From the Deployment Assembly window, click on Add and select Java Build Path Entries. Select all the jar from M2 repository.

	At this point all the resources that required have been added.

Run the Application:
--------------------
	
Select the projet -> Run As -> Run On Server. This will display the page in the browser.

Commit the project:
-------------------

In order to preserve the project structure, even with the empty folders, add a .gitignore file to that folder.

This file contains the following:

# Ignore everything in this directory
*
# Except this file
!.gitignore# Ignore everything in this directory
*
# Except this file
!.gitignore

Logging:
--------

1) In the properties tag add this:

<log4j.version>1.2.17</log4j.version>
  	
2) In the dependency tag add this:

<dependency>
	<groupId>log4j</groupId>
	<artifactId>log4j</artifactId>
	<version>${log4j.version}</version>
</dependency>

3) Make sure that Log4J is available from the Deployment Assembly (select the project -> Properties)

4) Create a log4j.properties under src/main/resources with the following info:

# Root logger option
log4j.rootLogger=INFO, CONSOLE, FILE
 
# Redirect log messages to console
log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout
log4j.appender.CONSOLE.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} - %p - %c{1}:%L - %m%n

# Redirect log messages to the log file
log4j.appender.FILE=org.apache.log4j.RollingFileAppender
log4j.appender.FILE.File=${catalina.home}/logs/hello.log
log4j.appender.FILE.MaxFileSize=5MB
log4j.appender.FILE.MaxBackupIndex=5
log4j.appender.FILE.layout=org.apache.log4j.PatternLayout
log4j.appender.FILE.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} - %p - %c{1}:%L - %m%n
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    