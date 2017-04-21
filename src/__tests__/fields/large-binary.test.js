/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import renderer from 'react-test-renderer';
import '../../fields'
import {getField} from '../../field';

test('getField for List', () => {
    const component = renderer.create(getField('List', 'LargeBinary', {data: {}}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for List 2', () => {
    const component = renderer.create(getField('List', 'LargeBinary', {data: {}}, null));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for List with filename', () => {
    const component = renderer.create(getField('List', 'LargeBinary', {data: {}, filename: 'file_name'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for List with filename 2', () => {
    const component = renderer.create(getField('List', 'LargeBinary', {data: {file_name: 'File name'}, filename: 'file_name'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for List with filesize', () => {
    const component = renderer.create(getField('List', 'LargeBinary', {data: {}, filesize: 'file_size'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for List with filesize 2', () => {
    const component = renderer.create(getField('List', 'LargeBinary', {data: {file_size: 12345}, filesize: 'file_size'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for List with filename and filesize', () => {
    const component = renderer.create(getField('List', 'LargeBinary', {data: {file_name: 'File name', file_size: 1234}, filename: 'file_name', filesize: 'file_size'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Thumbnail', () => {
    const component = renderer.create(getField('Thumbnail', 'LargeBinary', {data: {}}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Thumbnail 2', () => {
    const component = renderer.create(getField('Thumbnail', 'LargeBinary', {data: {}}, null));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Thumbnail with filename', () => {
    const component = renderer.create(getField('Thumbnail', 'LargeBinary', {data: {}, filename: 'file_name'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Thumbnail with filename 2', () => {
    const component = renderer.create(getField('Thumbnail', 'LargeBinary', {data: {file_name: 'File name'}, filename: 'file_name'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Thumbnail with filesize', () => {
    const component = renderer.create(getField('Thumbnail', 'LargeBinary', {data: {}, filesize: 'file_size'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Thumbnail with filesize 2', () => {
    const component = renderer.create(getField('Thumbnail', 'LargeBinary', {data: {file_size: 12345}, filesize: 'file_size'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Thumbnail with filename and filesize', () => {
    const component = renderer.create(getField('Thumbnail', 'LargeBinary', {data: {file_name: 'File name', file_size: 1234}, filename: 'file_name', filesize: 'file_size'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form 2', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {}, null));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form readonly', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {readonly: true, label: 'Test'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form readonly 2', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {readonly: true, label: 'Test'}, null));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form required', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {required: '1', label: 'Test'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('getField for Form required with empty value', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {required: '1', label: 'Test'}, ''));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filename', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {data: {}, filename: 'file_name'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filename 2', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {data: {}, filename: 'file_name'}, null));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filename 3', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {data: {file_name: 'File name'}, filename: 'file_name'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filename 4', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {data: {file_name: 'File name'}, filename: 'file_name'}, null));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filesize', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {data: {}, filesize: 'file_size'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filesize 2', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {data: {}, filesize: 'file_size'}, null));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filesize 3', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {data: {file_size: 1234}, filesize: 'file_size'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filesize 4', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {data: {file_size: 1234}, filesize: 'file_size'}, null));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filename and filesize', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {data: {file_name: 'File name', file_size: 1234}, filesize: 'file_size', filename: 'file_name'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filename and filesize 2', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {data: {file_name: 'File name', file_size: 1234}, filesize: 'file_size', filename: 'file_name'}, null));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filename and filesize and readonly', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {readonly: true, data: {file_name: 'File name', file_size: 1234}, filesize: 'file_size', filename: 'file_name'}, 'Test'));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('getField for Form with filename and filesize and readonly 2', () => {
    const component = renderer.create(getField('Form', 'LargeBinary', {readonly: true, data: {file_name: 'File name', file_size: 1234}, filesize: 'file_size', filename: 'file_name'}, null));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
