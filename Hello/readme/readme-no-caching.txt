JSP:
---

<%	
	response.setHeader("Cache-Control","no-cache");	// Request a new copy of the page from the server
	response.setHeader("Cache-Control","no-store"); // Prevent page storing
	response.setDateHeader("Expires", 0); 			// Set the browser cache to mark this page as stale
	response.setHeader("Pragma","no-cache"); 		// HTTP 1.0 backward compatibility
%>
