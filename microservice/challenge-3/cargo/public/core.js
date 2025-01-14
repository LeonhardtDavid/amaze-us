var scotchCargo = angular.module('scotchCargo', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/cargo')
		.success(function(data) {
			$scope.cargo_list = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createCargo = function() {
		$http.post('/api/cargo', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.cargo_list = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete an item
	$scope.deleteCargo = function(id) {
		$http.delete('/api/cargo/' + id)
			.success(function(data) {
				$scope.cargo_list = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// update loaded state of an item
	$scope.loadedCargo = function(id, loaded) {
		$http({ method: 'PATCH', url: '/api/cargo/' + id, data: { loaded: !loaded } })
			.success(function() {
				console.log('Updated successfully');
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
