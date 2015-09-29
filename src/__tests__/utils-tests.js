describe('Utils', () => {

    describe( 'isRunningOnClient()', () => {
        it('returns true if running in a broswer', () => {
            jest.dontMock('../utils');
            var isRunningOnClient = require('../utils').isRunningOnClient;
            expect( isRunningOnClient() ).toEqual( false );
        })
    })

});