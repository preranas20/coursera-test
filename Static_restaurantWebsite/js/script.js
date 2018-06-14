$(function(){ //DOMContentLoader in jquery library style

    $("#navbarToggle").blur(function(event){ //QuerySelector in jquery style
  
        var screenWidth=window.innerWidth;

        if(screenWidth<768){
        	$("#navbarSupportedContent").collapse("hide");
        }
    });

});

(function(global){
	var dc={};

	var homeHtml = "snippets/home-snippet.html";
  var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";


	var insertHtml = function (selector, html){
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML = html;
	};

	var showLoading = function(selector){
		var html="<div class='text-center'>";
		html +="<img src='images/ajax-loader.gif'></div>";
		insertHtml(selector,html);
	};

  var insertProperty = function(string , propName, propValue){
    var propToReplace = "{{"+ propName + "}}";
    string = string.replace(new RegExp(propToReplace,"g"),propValue);
    return string;
  }


    //on page load(before image or CSS)
	document.addEventListener("DOMContentLoaded",function(event){


    showLoading("#main_content");
    $ajaxUtils.sendGetRequest(homeHtml,
    	function(responseText){
           document.querySelector("#main_content")
           .innerHTML=responseText;
       },false);
  });


//load Menu Categories view
  dc.loadMenuCategories = function(){
    showLoading("#main_content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowCategoriesHTML);
  };


  function buildAndShowCategoriesHTML(categories){
    console.log("Inside build");
    $ajaxUtils.sendGetRequest(
      categoriesTitleHtml,
      function(categoriesTitleHtml){

        $ajaxUtils.sendGetRequest(
          categoryHtml,
          function(categoryHtml){
            var categoriesViewHtml = buildCategoriesViewHtml(categories,
                                                              categoriesTitleHtml,categoryHtml);
            insertHtml("#main_content",categoriesViewHtml);
          },false);
      },false);
  }


function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml){
  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  //loop over categories object
  for(var i=0;i<categories.length;i++){

    var html=categoryHtml;
    var name=""+categories[i].name;
    var short_name=categories[i].short_name;
    html=insertProperty(html,"name",name);
    html=insertProperty(html,"short_name",short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}



 global.$dc = dc;
	
})(window);


