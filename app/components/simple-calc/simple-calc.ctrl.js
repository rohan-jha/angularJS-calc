'use strict';

angular.module('simpleCalc', []).controller('SimpleCalcCtrl', ['$scope', function($scope) {
    
    const operatorMap = {
        "add" : "+",
        "subtract" : "-",
        "multiply" : "*",
        "divide" : "/",
        "power" : "^",
        "root" : "\u221A"
    };

    $scope.clear = function(){
        $scope.operand1 = '';
        $scope.operand2 = '';
        $scope.operator = '';
        $scope.isCalculated = false;
        $scope.displayText = '';
        $scope.ioText = '0';
    };

    (function init(){
        $scope.clear();    
    })();

    $scope.putOperand = function(val){
        if($scope.isCalculated && val != 'negate'){
            $scope.clear();
            return $scope.putOperand(val);
        }
        if($scope.operator) {
            $scope.operand2 = createOperand($scope.operand2, val);
            $scope.ioText = $scope.operand2?$scope.operand2:$scope.ioText;
            $scope.displayText = $scope.displayText.substring(0, $scope.displayText.lastIndexOf(' ')+1) + $scope.ioText;
        }else{
            $scope.operand1 = createOperand($scope.operand1, val);
            $scope.ioText = $scope.operand1?$scope.operand1:$scope.ioText;;
            $scope.displayText = (val != 'negate')?$scope.ioText:$scope.displayText.startsWith("-")
                                    ?$scope.displayText.substring(1, $scope.displayText.length):'-'+$scope.displayText;
        }
    }

    function createOperand(operand, val){   
        var returnVal;
        if(val === 'negate' && operand){
            returnVal = -operand+'';
        }else{
            returnVal = operand+val;
        }
        return validateNumber(returnVal)?returnVal:operand?operand:'';
    }

    function validateNumber(val){
        var regEx = /^[-]?[0-9]*[.]?[0-9]*$/;
        return regEx.test(val);
    }

    $scope.putOperator = function(val){
        if (!operatorMap.hasOwnProperty(val)) return;
        if(val === 'root'){
            if($scope.operand2){
                let rootVal = calculateRoot($scope.operand2);
                if(!rootVal) return;
                $scope.operand2 = rootVal+'';
                $scope.displayText = $scope.displayText.substring(0, $scope.displayText.lastIndexOf(' ')+1) 
                                    + operatorMap[val] 
                                    + $scope.displayText.substring($scope.displayText.lastIndexOf(' ')+1, $scope.displayText.length);
                $scope.ioText = $scope.operand2;
            }else if($scope.operand1){
                if($scope.operator) return;
                let rootVal = calculateRoot($scope.operand1);
                if(!rootVal) return;
                $scope.operand1 = rootVal+'';
                $scope.displayText = operatorMap[val] + $scope.displayText;
                $scope.ioText = $scope.operand1;
            }
            return;
        }
        if($scope.operand2){
            $scope.calculate();
            return $scope.putOperator(val);
        }else if($scope.operand1){
            $scope.operand1 = Number.parseFloat($scope.operand1)+''; //To sanitize last digit as .
            if($scope.operator){
                $scope.displayText = $scope.displayText.substring(0, $scope.displayText.lastIndexOf(' ')-2);
            }
            $scope.operator = val;
            $scope.displayText = $scope.displayText + ' ' + operatorMap[val] + ' ';
            $scope.isCalculated = false;
        }
    }

    function calculateRoot(operand){
        let rootVal = Math.sqrt(Number.parseFloat(operand));
        if(isNaN(rootVal)){ //Cant handle root of negative numbers
            throw new Error("This is a simple calculator, not an imaginary one :)"); 
        } 
        return rootVal;
    }

    $scope.calculate = function(){
        if(!$scope.operator || !$scope.operand1 || !$scope.operand2 || !operatorMap.hasOwnProperty($scope.operator)) return;
        let operand1 = Number.parseFloat($scope.operand1);
        let operand2 = Number.parseFloat($scope.operand2);
        if($scope.operator === 'power'){
            $scope.ioText = operand1**operand2;
        }else if($scope.operator === 'divide'){
            $scope.ioText = operand1/operand2;
        }else if($scope.operator === 'multiply'){
            $scope.ioText = operand1*operand2;
        }else if($scope.operator === 'add'){
            $scope.ioText = operand1+operand2;
        }else if($scope.operator === 'subtract'){
            $scope.ioText = operand1-operand2;
        }
        if($scope.ioText === Infinity){
            $scope.ioText = '\u221E';
            $scope.operand1 = '';
            $scope.operand2 = '';
            $scope.operator = '';
            $scope.isCalculated = true;
            return;
        }else if(isNaN($scope.ioText)){
            $scope.ioText = '0/0 Not Allowed';
            $scope.operand1 = '';
            $scope.operand2 = '';
            $scope.operator = '';
            $scope.isCalculated = true;
            throw new Error("0/0 is not a number");
        }
        $scope.ioText +='';
        $scope.operand1 = $scope.ioText;
        $scope.operand2 = '';
        $scope.operator = '';
        $scope.displayText = '( '+ $scope.displayText +' )';
        $scope.isCalculated = true;
    }
}]);