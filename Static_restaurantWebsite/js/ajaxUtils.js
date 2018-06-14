(function(global){
	var ajaxUtils={};

	

    //Returns an HTTP Request object
	function getRequestObject(){

		if(window.XMLHttpRequest){

			return (new XMLHttpRequest());
		}
		else if (window.ActiveXObject){
			return (new ActiveXObject("Microsoft.XMLHTTP"));
		}
		else{
			console.log("error in XMLHttpRequest");
			global.alert("Ajax is not supported");
			return(null);
		}

	}

	//Make an Ajax GET Request to 'requestURL'
	//responseHandler is a function that handles the result of what the server returns as response
	ajaxUtils.sendGetRequest=function(requestUrl,responseHandler,isJSONResponse){
		  console.log("requestURL:"+requestUrl);
          var request=getRequestObject();//get the HTTP Request Object
          //different stage in network communication between browser and server.
          //If onreadystatechange gets to ready state 4 and status 200
          request.onreadystatechange=function(){
          	handleResponse(request,responseHandler,isJSONResponse);
          };
          request.open("GET",requestUrl,true); //true if you need asynchornous calls

          request.send(null); //for POST only,message body
	};

	function handleResponse(request,responseHandler,isJSONResponse){
		if((request.readyState == 4) && (request.status==200)){

			if (isJSONResponse == undefined){
				isJSONResponse=true;
			}
			else{
		    console.log("responseText:"+request.responseText);
			responseHandler(request.responseText);

		   }
		}
	}

    //expose utility to the global object
	global.$ajaxUtils=ajaxUtils;
})(window);