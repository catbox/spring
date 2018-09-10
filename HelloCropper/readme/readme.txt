1) Go to the TomEE Server at the location C:\Apache Software Foundation\apache-tomee-plus-1.7.1\conf\Catalina\localhost
2) Create a file HelloCropper#HIVE.xml
3) Write the following in the file HelloCropper#HIVE.xml:
   
   <?xml version="1.0" encoding="UTF-8"?>
   <Context docBase="C:/HIVE" override="true"/>
 
 NOTE: The file HelloCropper#HIVE.xml the HelloCropper part points to the app folder and after the # the HIVE part points to the virtual folder to which TomEE goes to fetch data.  
 