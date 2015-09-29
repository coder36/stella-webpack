var React = require('react/addons');
var testTree = require('react-test-tree');

jest.dontMock('../tile');
jest.dontMock('../your_bill');
jest.dontMock('moment');

describe('YourBill tile', () => {

    let tile;
    let bill;
    beforeEach( ()=> {

        tile = {
          total: '12.00',
          statement: {
              due: '2015-01-25'
          }
        };
        let YourBill = require('../your_bill');
        bill = testTree( <YourBill tile={tile}/>);
    });

    it('shows when your next bill is due', () => {
        expect(bill.innerText).toMatch( /This will be collected from your bank on January 25th/ );
    });

    it('sets the tile to display in full page mode when selected', () => {

        let StellaActions = require('../../store/stellaactions');
        StellaActions.setFullTile = jest.genMockFunction();

        bill.click();
        expect(StellaActions.setFullTile).toBeCalledWith(tile);
    });

});