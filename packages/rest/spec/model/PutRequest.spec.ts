import 'mocha';

import { Actor } from '@serenity-js/core';
import { PutRequest } from '../../src/model';
import { expect } from '../expect';

/** @test {PutRequest} */
describe('PutRequest', () => {

    const actor = Actor.named('Apisit');

    /** @test {PutRequest.to} */
    it('represents an Axios request', () =>
        expect(actor.answer(PutRequest.to('/products/2')))
            .to.eventually.deep.equal({
                method: 'PUT',
                url: '/products/2',
            }));

    /**
     * @test {PutRequest.to}
     * @test {PutRequest#with}
     */
    it('can have a request body', () =>
        expect(actor.answer(PutRequest.to('/products/2').with({ name: 'apple' })))
            .to.eventually.deep.equal({
            method: 'PUT',
            url: '/products/2',
            data: { name: 'apple' },
        }));

    /**
     * @test {PutRequest.to}
     * @test {PutRequest#with}
     * @test {PutRequest#using}
     */
    it('allows for additional request properties to be specified', () =>
        expect(actor.answer(PutRequest.to('/products/2').with({ name: 'apple' }).using({
                headers: {
                    Accept: 'application/json',
                },
            })))
            .to.eventually.deep.equal({
                method: 'PUT',
                url: '/products/2',
                headers: {
                    Accept: 'application/json',
                },
                data: { name: 'apple' },
            }));
});
