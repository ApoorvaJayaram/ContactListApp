var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',function($scope,$http)
{
	console.log("Hello world from the controller");
	var refresh = function(){
	$http.get('/contactlist').success(function(response){
		
		console.log("I got the data i requested");
		$scope.contactlist = response;
		$scope.contact = "";
	});
	};
	refresh();
	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact).success(function(res)
		{
			console.log(res);
			refresh();
		});
	};
	
	$scope.deleteContact = function(id){
		console.log(id);
		$http.delete('/contactlist/'+id).success(function(res)
		{
			console.log(res);
			refresh();
		});
	};
	
	$scope.editContact = function(id){
		console.log(id);
		$http.get('/contactlist/'+id).success(function(res)
		{
			$scope.contact = res;
			//console.log(res);
			//refresh();
		});
	};
	//put for updating
	$scope.updateContact = function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/'+ $scope.contact._id,$scope.contact).success(function(res)
		{
			console.log(res);
			refresh();
		});
	};
	
	$scope.deselect = function(){
		$scope.contact = "";
		refresh();
	};
	//$scope is the glue between app controller and the view(html)
	//$scope.contactlist = contactlist;
}]);