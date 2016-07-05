(function() {
    angular
        .module('electron-app')
        .directive('console', [function() {
            return {
                restrict: 'A',
                link: link
            };

            function link($scope, element) {
                $scope.$watch('updateConsoleScroll', function(){
                    element[0].scrollTop = element[0].scrollHeight;
                });
            }
        }]);
})();