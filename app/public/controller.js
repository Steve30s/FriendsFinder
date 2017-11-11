
var controlLogic = {
	init: function () {
		this.cacheDom();
		this.bindEvents();
	}, 
	cacheDom: function() {
		this.$submit = $("#submit");
		this.$apiLink = $("#apiFriend");
	},
	bindEvents: function() {
		this.$submit.on("click", this.apiFriendPost);
		this.$apiLink.on("click", this.apiFriendReq);
	},
	apiFriendReq: function() {
		
      	var currentURL = window.location.origin;

		
		$.ajax({ url: currentURL + "/api/friends", method: "GET" })
	      .done(function(data) {
	      	console.log(data);
	        
	        console.log("------------------------------------");
	        console.log("URL: " + currentURL + "/survey");
	        console.log("------------------------------------");
	      });
	},
	apiFriendPost: function() {
	
		function validateForm() {
		var isValid = true;
		$('.form-control').each(function() {
		if ( $(this).val() === '' )
		    isValid = false;
		});

		$('.chosen-select').each(function() {

		  if( $(this).val() === "")
		      isValid = false
		  });
		  return isValid;
		}
	    
	    if (validateForm() == true)
	    {
	        
	      	var currentURL = window.location.origin;
			
			var newFriend = {
			name: $("#name").val().trim(),
			photo: $("#photo").val().trim(),
			scores: [$("#q1").val()
				   ,$("#q2").val()
				   ,$("#q3").val()
				   ,$("#q4").val()
				   ,$("#q5").val()
				   ,$("#q6").val()
				   ,$("#q7").val()
				   ,$("#q8").val()
				   ,$("#q9").val()
				   ,$("#q10").val()
				   ]
			}
	        
	        $.post("/api/friends", newFriend)
	        .done(function(data){
	        	
	        	var compatibilityArr = [];
	        	var sum = 0;
	        	var minOfSum = 0;
	        	var newPerson = data[data.length - 1];
	        	
	        	for(var i = 0; i < data.length - 2; i++){
	        		for(var j = 0; j < data[i].scores.length; j++){
	        			sum += Math.abs(parseInt(data[i].scores[j]) - 
	        						    parseInt(newPerson.scores[j]));
	        		}
	        		compatibilityArr.push(sum);
	        		
	        		sum = 0;
	        	}
	        	
	            minOfSum = Math.min.apply(null, compatibilityArr);	        	
	        	
	        	for (var m = 0; m < compatibilityArr.length; m++) {
	        		
	        		if(compatibilityArr[m] === minOfSum){
	        			$("#matchName").text(data[m].name);
						$('#matchImg').attr("src", data[m].photo);
						$("#resultsModal").modal('toggle');
						
						return true;
	        		}
	        	}
	        });
	    }
	    else 
	    {
	      alert("Please fill out all fields before submitting!");
	    }
	}
}

$(document).ready(function(){
	console.log("linked!");
	
	controlLogic.init();
});