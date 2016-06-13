(function() {
    const exec = require('child_process').exec;
    //const spawn = require('child_process').spawn;
    angular.module('electron-app', [])
    .controller('MainController', ['$scope', function($scope) {

        $scope.projects = [
            {
                title: 'Demo project name',
                commands: [
                    {
                        title: 'Command name here',
                        command: 'command',
                        arguments: ['arg1'],
                        fullCommand: 'command arg1',
                        path: 'path_to_file',
                        isRunning: false,
                        consoleOutput: '',
                        isConsoleExpanded: false,
                        spawnedProcess: null
                    }
                ]
            }
        ];

        $scope.startProcess = function(processObject){
            var spawnedProcess = exec(processObject.fullCommand, {cwd: processObject.path, env: process.env});
            //var spawnedProcess = spawn(processObject.command, processObject.arguments, {cwd: processObject.path, env: process.env});

            processObject.isRunning = true;
            processObject.spawnedProcess = spawnedProcess;
            
            spawnedProcess.stdout.on('data', (data) => {
                $scope.$apply(function () {
                    processObject.consoleOutput += ('stdout: ' + data);
                });
            });

            spawnedProcess.stderr.on('data', (data) => {
                $scope.$apply(function () {
                    processObject.consoleOutput += ('stderr: ' + data);
                });
            });

            spawnedProcess.on('close', (code) => {
                $scope.$apply(function () {
                    processObject.consoleOutput += ('close: ' + code);
                    processObject.isRunning = false;
                    processObject.spawnedProcess = null;
                });
            });
        };
        
        $scope.stopProcess = function(processObject){
            if(angular.isDefined(processObject.spawnedProcess)){
                processObject.spawnedProcess.kill();
            }
        }
    }]);
})();