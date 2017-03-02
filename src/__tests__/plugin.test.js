/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import plugin from '../plugin';
import chai from 'chai';

test('test get / set one level function', () => {
    const func = () => {return 'Test'};
    plugin.set([], {func})
    const func2 = plugin.get(['func']);
    chai.expect(func2).to.equal(func);
    chai.expect(func2()).to.equal(func());
})

test('test get / set two level function', () => {
    const func = () => {return 'Test'};
    plugin.set(['level1'], {func})
    const func2 = plugin.get(['level1', 'func']);
    chai.expect(func2).to.equal(func);
    chai.expect(func2()).to.equal(func());
})

test('test get / set three level function', () => {
    const func = () => {return 'Test'};
    plugin.set(['level1', 'level2'], {func})
    const func2 = plugin.get(['level1', 'level2', 'func']);
    chai.expect(func2).to.equal(func);
    chai.expect(func2()).to.equal(func());
})
