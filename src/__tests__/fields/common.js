/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import {safe_eval} from '../../fields/common';

test('Check safe_eval undefined', () => {
    chai.expect(safe_eval(undefined, {})).to.equal(false);
});
test('Check safe_eval true', () => {
    chai.expect(safe_eval('true', {})).to.equal(true);
});
test('Check safe_eval 1', () => {
    chai.expect(safe_eval('1', {})).to.equal(true);
});
test('Check safe_eval fields.b == 1', () => {
    chai.expect(safe_eval('fields.b == 1', {b: 1})).to.equal(true);
});
test('Check safe_eval fields.b != 1', () => {
    chai.expect(safe_eval('fields.b != 1', {b: 1})).to.equal(false);
});
test('Check safe_eval toDate(fields.b) != now', () => {
    chai.expect(safe_eval('toDate(fields.b) != now', {b: '2017-05-09T07:04:49'})).to.equal(true);
});

