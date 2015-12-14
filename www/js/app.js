angular.module('todo', ['ionic'])
.controller("MyCtrl", function($scope){

  $scope.lightOn = false;
  $scope.paired = false;
  $scope.turnOn = function() {
    $scope.lightOn = !$scope.lightOn;

    var msg = $scope.lightOn ? "1" : "0";
    console.log("going to send: " + msg);
    console.log("$scope.lightOn: " + $scope.lightOn);
    bluetoothSerial.write(msg,
      function(msg){
        console.log(msg);
      },
      function(err){
        console.error(err);
      }
    );

  }
  $scope.turnedOn = function() {
    return $scope.lightOn;
  }


  ionic.Platform.ready(function(){
    bluetoothSerial.isEnabled(
      $scope.bluetoothList,
      function() {
        bluetoothSerial.enable(
          $scope.bluetoothList,
          function () {
            alert('Bluetooth is not enabled.');
          }
        );
      }
    );
  });

  $scope.bluetoothList = function() {
    bluetoothSerial.list(
        function(results) {
            angular.forEach(results, function (value){
              if(value.name == 'Be.tl') {
                $scope.connectDevice(value.id);
              }
            });
        },
        function(error) {
            console.error(JSON.stringify(error));
        }
    );
  };

  $scope.connectDevice = function(id) {
    bluetoothSerial.connect(
      id,
      function(){
        $scope.$apply(function() {
          $scope.paired = true;
        });
      },
      function(error){
        console.error(JSON.stringify(erro));
      }
     );
  };

});
