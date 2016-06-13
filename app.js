var fs = require('fs');
const spawn = require('child_process').exec;
var service, frontEnd;

//var contents = fs.readFileSync('./package.json', 'utf8');
//alert(contents);

var frontEndConsole = document.querySelector('#front-end-console');
var serviceConsole = document.querySelector('#service-console');

var frmFrontEndStart = document.querySelector('#front-end-start');
var frmFrontEndStop = document.querySelector('#front-end-close');

var frmServiceStart = document.querySelector('#service-start');
var frmServiceStop = document.querySelector('#service-close');


function startFrontEnd(){
	frontEnd = spawn('gradle runPlayBinary', {cwd: 'D:/Backup\ Softvision/Projects/Metabiota/frontend-gemm', env: process.env});

	frontEnd.stdout.on('data', (data) => {
		frontEndConsole.value += ('stdout: ' + data);
		frontEndConsole.scrollTop = frontEndConsole.scrollHeight;
	});

	frontEnd.stderr.on('data', (data) => {
		frontEndConsole.value += ('stderr: ' + data);
		frontEndConsole.scrollTop = frontEndConsole.scrollHeight;
	});

	frontEnd.on('close', (code) => {
		frontEndConsole.value += ('close: ' + code);
		frontEndConsole.scrollTop = frontEndConsole.scrollHeight;
	});
}

function startService(){
	service = spawn('gradle runPlayBinary', {cwd: 'D:/Backup\ Softvision/Projects/Metabiota/service-app-gemm', env: process.env});

	service.stdout.on('data', (data) => {
		serviceConsole.value += ('stdout: ' + data);
		serviceConsole.scrollTop = serviceConsole.scrollHeight;
	});

	service.stderr.on('data', (data) => {
		serviceConsole.value += ('stderr: ' + data);
		serviceConsole.scrollTop = serviceConsole.scrollHeight;
	});

	service.on('close', (code) => {
		serviceConsole.value += ('close: ' + code);
		serviceConsole.scrollTop = serviceConsole.scrollHeight;
	});
}

function stopFrontEnd(){
	frontEnd.kill();
}

function stopService(){
	service.kill();
}

//const ls = spawn('gradle runPlayBinary', {cwd: 'D:/Backup\ Softvision/Projects/Metabiota/frontend-gemm', env: process.env});
// inspect the PATH key on the env object



frmFrontEndStart.addEventListener('click', function () {
	startFrontEnd();
});

frmServiceStart.addEventListener('click', function () {
	startService();
});



frmFrontEndStop.addEventListener('click', function () {
	stopFrontEnd();
});

frmServiceStop.addEventListener('click', function () {
	stopService();
});

/*setTimeout(function(){
	ls.kill();
}, 25000);*/

jQuery("#front-end-console").change(function() {
  jQuery('#front-end-console').scrollTop(jQuery('#front-end-console')[0].scrollHeight);
});

jQuery("#service-console").change(function() {
  jQuery('#service-console').scrollTop(jQuery('#service-console')[0].scrollHeight);
});
