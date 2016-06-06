/*
 * :copyright (c) 2014 - 2016, The Regents of the University of California, through Lawrence Berkeley National Laboratory (subject to receipt of any required approvals from the U.S. Department of Energy) and contributors. All rights reserved.
 * :author
 */
angular.module('BE.seed.controller.bluesky_properties_controller', [])
.controller('bluesky_properties_controller', [
  '$scope',
  '$routeParams',
  'bluesky_service',
  'properties',
  function(
    $scope,
    $routeParams,
    bluesky_service,
    properties
  ) {
      $scope.object = 'property';

      $scope.columns = [
        'jurisdiction_property_identifier',
        'lot_number',
        'property_name',
        'address_line_1',
        'energy_score',
        'site_eui',
        'district'
      ];
      $scope.objects = properties.results;
      $scope.pagination = properties.pagination;

      $scope.number_per_page_options = [10, 25, 50];
      $scope.number_per_page = $scope.number_per_page_options[0];
      $scope.update_number_per_page = function(number) {
        $scope.number_per_page = number;
        bluesky_service.get_properties(1, number).then(function(properties) {
          $scope.objects = properties.results;
          $scope.pagination = properties.pagination;
        });
      };
      $scope.pagination_first = function() {
        bluesky_service.get_properties(1, $scope.number_per_page).then(function(properties) {
          $scope.objects = properties.results;
          $scope.pagination = properties.pagination;
        });
      };
      $scope.pagination_previous = function() {
        bluesky_service.get_properties($scope.pagination.page - 1, $scope.number_per_page).then(function(properties) {
          $scope.objects = properties.results;
          $scope.pagination = properties.pagination;
        });
      };
      $scope.pagination_next = function() {
        bluesky_service.get_properties($scope.pagination.page + 1, $scope.number_per_page).then(function(properties) {
          $scope.objects = properties.results;
          $scope.pagination = properties.pagination;
        });
      };
      $scope.pagination_last = function() {
        bluesky_service.get_properties($scope.pagination.num_pages, $scope.number_per_page).then(function(properties) {
          $scope.objects = properties.results;
          $scope.pagination = properties.pagination;
        });
      };
}]);