import 'mocha';

import { Actor } from '@serenity-js/core';
import { DeleteRequest } from '../../src/model';
import { expect } from '../expect';

/** @test {DeleteRequest} */
describe('DeleteRequest', () => {

    const actor = Actor.named('Apisit');

    /** @test {DeleteRequest.to} */
    it('represents an Axios request', () =>
        expect(actor.answer(DeleteRequest.to('/products/2')))
            .to.eventually.deep.equal({
                method: 'DELETE',
                url: '/products/2',
            }));

    /**
     * @test {DeleteRequest.to}
     * @test {DeleteRequest#using}
     */
    it('allows for additional request properties to be specified', () =>
        expect(actor.answer(DeleteRequest.to('/products/2').using({
                headers: {
                    Authorization: 'token',
                },
            })))
            .to.eventually.deep.equal({
                method: 'DELETE',
                url: '/products/2',
                headers: {
                    Authorization: 'token',
                },
            }));
});
