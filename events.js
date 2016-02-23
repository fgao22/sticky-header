(function(){
	var events = angular.module('events',['ngAnimate']);
	
	events.controller('eventsController',['$scope', function($scope){
		
		// Generating fake events
		generateFakeEvents();
		
		// Note: No need to touch the following function 
		function generateFakeEvents(){
			
			function getRandomEventDescription(){
				var descriptionNumber = Math.floor((Math.random() * 5) + 1); // random value between 1 and 5
				var descriptionText;
				switch (descriptionNumber){
					case 1:
						descriptionText = "Error! what is an error really?"
						break;
					case 2:
						descriptionText = "Warning! See yourself warned!"
						break;
					case 3:
						descriptionText = "Info: is short for Information"
						break;
					case 4:
						descriptionText = "Fixed! Once there was a problem, now there is not"
						break;
					default: // 5
						descriptionText = "Critical! You better do something about it!"
				}
				
				return descriptionText;
			}
			
			var eventsCount = 100;
			var groupsOfCount = 10;
			$scope.eventsList = [];
			for (var i = 1; i <= eventsCount; i++){
				var event = {
					index: i,
					group: Math.ceil(i / groupsOfCount),
					description : 'Event #' + i + ': ' + getRandomEventDescription(),
					details : 'These are the details of event #' + i + '. If you want to know more about this event, ' + 
								'too bad. There is no real info here, just useless text, sorry about that.'
				};
				
				$scope.eventsList.push(event);
			}
		}
		
		$scope.$watchCollection('filteredList',function(newVal,oldVal){
			
			// Flagging the first event in each group
			var prevGroupNum = -1;  
			angular.forEach($scope.filteredList, function(event,index){
				event.firstInGroup = event.group > prevGroupNum;
				prevGroupNum = event.group;
			});

			
		});
        
        //CLick to open panel
		var previousOpenedEvent;
		$scope.showDetails = function(event)  {
			var isOpened = event.showDetails;
			if (previousOpenedEvent) {
				previousOpenedEvent.showDetails = false;
			}
			event.showDetails = !isOpened;
			previousOpenedEvent = event;
		}
        
        //Hover
        var hoverColor = "#99ccff";
        var regularColor = "black";
		$scope.hoverIn = function(){
            this.eventColor={"color": hoverColor};
		};
        $scope.hoverOut = function(){
            this.eventColor={"color": regularColor};
		};
	}]);
    
    //Sticky header
	events.directive('stickyHeader', function(){
		return {
			restrict: 'A',
			link: function(scope, element){
				  $(element).stickySectionHeaders(); 
			}
		};
	});


})();