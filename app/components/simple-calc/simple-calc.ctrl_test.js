describe('SimpleCalcCtrl', function() {
    beforeEach(module('simpleCalc'));
  
    var $controller;
  
    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));
  
    describe('$scope.clear', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('SimpleCalcCtrl', { $scope: $scope });
        });

        it('checks if scope variables are getting reset', function() {
            $scope.clear();

            expect( $scope.ioText).toEqual('0');
            expect( $scope.displayText).toEqual('');
            expect( $scope.operand1).toEqual('');
            expect( $scope.operand2).toEqual('');
            expect( $scope.operator).toEqual('');
            expect( $scope.isCalculated).toEqual(false);
        });
    });

    describe('$scope.putOperand', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('SimpleCalcCtrl', { $scope: $scope });
        });

        it(`checks if calculation is done  
            then inserted value is operand1`, function() {
            $scope.isCalculated = true;
            
            $scope.putOperand(1);
            
            expect( $scope.operand1).toEqual('1');
            expect( $scope.ioText).toEqual('1');
            expect( $scope.displayText).toEqual('1');
            expect( $scope.operand2).toEqual('');
            expect( $scope.operator).toBeFalsy();
        });

        it(`checks if calculation is not done and operator is not present 
            then operand1 should be populated`, function() {
            $scope.isCalculated = false;

            $scope.putOperand(1);
            
            expect( $scope.operand1).toEqual('1');
            expect( $scope.ioText).toEqual('1');
            expect( $scope.displayText).toEqual('1');
            expect( $scope.operand2).toEqual('');
            expect( $scope.operator).toBeFalsy();
        });

        it(`checks if calculation is not done and operator is present 
            then operand2 should be populated`, function() {
            $scope.isCalculated = false;
            $scope.operand1 = 2;
            $scope.operator = 'add';
            $scope.displayText = '2 + ';
            $scope.ioText = '2';

            $scope.putOperand(1);
            
            expect( $scope.ioText).toEqual('1');
            expect( $scope.displayText).toEqual('2 + 1');
            expect( $scope.operand2).toEqual('1');
        });

        it(`checks if in-valid value (like two decimal) is passed down the operand 
            then nothing should change`, function() {
            $scope.isCalculated = false;
            $scope.operand1 = '2.';
            $scope.operand2 = '';
            $scope.operator = '';
            $scope.displayText = '2.';
            $scope.ioText = '2.';

            $scope.putOperand('.');
            
            expect( $scope.operand1).not.toEqual('2.1');
            expect( $scope.operand1).toEqual('2.');
        });

        it(`checks if negate is inserted as operand 
            then the sign should flip`, function() {
            $scope.isCalculated = false;
            $scope.operand1 = '-2.';
            $scope.operand2 = '';
            $scope.operator = '';
            $scope.displayText = '-2.';
            $scope.ioText = '-2.';

            $scope.putOperand('negate');
            
            expect( $scope.operand1).toEqual('2');
        });
    });

    describe('$scope.putOperator', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('SimpleCalcCtrl', { $scope: $scope });
        });

        it(`checks if no operands are present 
            then dont populate operator`, function() {

            $scope.putOperator("add");

            expect( $scope.ioText).toEqual('0');
            expect( $scope.displayText).toEqual('');
            expect( $scope.operand1).toEqual('');
            expect( $scope.operand2).toEqual('');
            expect( $scope.operator).toBeFalsy();
            expect( $scope.isCalculated).toEqual(false);
        });

        it('checks if only valid operator is inserted', function() {
            $scope.operand1 = '1';

            $scope.putOperator('integrate');

            expect( $scope.operand1).toEqual('1');
            expect( $scope.operand2).toEqual('');
            expect( $scope.operator).toBeFalsy();
        });

        it(`checks if only operand1 is present 
            then populate operator (not root)`, function() {
            $scope.operand1 = '1';

            $scope.putOperator('add');

            expect( $scope.ioText).toEqual('0');
            expect( $scope.displayText).toEqual(' + ');
            expect( $scope.operand1).toEqual('1');
            expect( $scope.operand2).toEqual('');
            expect( $scope.operator).toEqual('add');
            expect( $scope.isCalculated).toEqual(false);
        });

        it(`checks if only both operands are present 
            then first calculate the first expression 
            and then place the result in operand1
            and then populate operator (not root)`, function() {
            $scope.operand1 = '11';
            $scope.operand2 = '9';
            $scope.operator = 'multiply';
            $scope.ioText = '9';
            $scope.displayText = '11 * 9';

            $scope.putOperator('add');

            expect( $scope.displayText).toEqual('( 11 * 9 ) + ');
            expect( $scope.ioText).toEqual('99');
            expect( $scope.operand1).toEqual('99');
            expect( $scope.operand2).toBeFalsy();
            expect( $scope.operator).toEqual('add');
        });

        it(`checks if root operator is applied 
            and if operand2 is not present
            then calculate root of operand1`, function() {
            $scope.operand1 = '4';
            $scope.operand2 = '';
            $scope.ioText = '4';
            $scope.displayText = '4';

            $scope.putOperator('root');

            expect( $scope.displayText).toEqual('\u221A'+'4');
            expect( $scope.ioText).toEqual('2');
            expect( $scope.operand1).toEqual('2');
            expect( $scope.operand2).toBeFalsy();
            expect( $scope.operator).toEqual('');
        });

        it(`checks if root operator is applied 
            and if operand2 is present
            then calculate root of operand2`, function() {
            $scope.operand1 = '11';
            $scope.operand2 = '9';
            $scope.operator = 'multiply';
            $scope.ioText = '9';
            $scope.displayText = '11 * 9';

            $scope.putOperator('root');

            expect( $scope.displayText).toEqual('11 * '+'\u221A'+'9');
            expect( $scope.ioText).toEqual('3');
            expect( $scope.operand1).toEqual('11');
            expect( $scope.operand2).toEqual('3');
            expect( $scope.operator).toEqual('multiply');
        });

        it(`checks if root operator is applied to negtive operand
            then function throws error`, function() {
            $scope.operand1 = '-9';
            $scope.operand2 = '';
            $scope.ioText = '-9';
            $scope.displayText = '-9';

            expect(function(){$scope.putOperator('root')}).toThrow(new Error("This is a simple calculator, not an imaginary one :)"));
        });
    });

    describe('$scope.calculate', function() {
      var $scope, controller;
 
      beforeEach(function() {
        $scope = {};
        controller = $controller('SimpleCalcCtrl', { $scope: $scope });
      });

      it(`checks if operands and operator are not present
          then do nothing`, function() {
        $scope.calculate();
        expect( $scope.operand1).toBeFalsy();
        expect( $scope.operand2).toBeFalsy();
        expect( $scope.operator).toBeFalsy();
        expect( $scope.displayText).toBeFalsy();
        expect( $scope.ioText).toEqual('0');
        expect( $scope.isCalculated).toEqual(false);
      });

      it(`checks if operator is not valid then
          then do nothing`, function() {
        $scope.operand1 = '1';
        $scope.operand2 = '2';
        $scope.operator = 'nth-root';
        $scope.calculate();
        expect( $scope.operand1).toEqual('1');
        expect( $scope.operand2).toEqual('2');
        expect( $scope.operator).toEqual('nth-root');
        expect( $scope.displayText).toBeFalsy();
        expect( $scope.ioText).toEqual('0');
        expect( $scope.isCalculated).toEqual(false);
      });

      it('checks if it calculate adds two number', function() {
        $scope.operand1 = 4;
        $scope.operand2 = 2;
        $scope.operator = "add";
        $scope.calculate();
        expect( $scope.ioText).toEqual('6');
        expect( $scope.isCalculated).toEqual(true);
      });
  
      it('checks if it calculate subtract two number', function() {
        $scope.operand1 = 4;
        $scope.operand2 = 2;
        $scope.operator = "subtract";
        $scope.calculate();
        expect( $scope.ioText).toEqual('2');
        expect( $scope.isCalculated).toEqual(true);
      });

      it('checks if it calculate multiply two number', function() {
        $scope.operand1 = 4;
        $scope.operand2 = 2;
        $scope.operator = "multiply";
        $scope.calculate();
        expect( $scope.ioText).toEqual('8');
        expect( $scope.isCalculated).toEqual(true);
      });

      it('checks if it calculate divide two number', function() {
        $scope.operand1 = 4;
        $scope.operand2 = 2;
        $scope.operator = "divide";
        $scope.calculate();
        expect( $scope.ioText).toEqual('2');
        expect( $scope.isCalculated).toEqual(true);
      });

      it('checks if calculate power of two numbers', function() {
        $scope.operand1 = 4;
        $scope.operand2 = 2;
        $scope.operator = "power";
        $scope.calculate();
        expect( $scope.ioText).toEqual('16');
        expect( $scope.isCalculated).toEqual(true);
      });
    });
});