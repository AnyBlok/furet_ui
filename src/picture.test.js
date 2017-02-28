import React from 'react';
import Picture from './picture';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import chai from 'chai';

test('Picture without props type', () => {
    let stub;
    stub = sinon.stub(console, 'error');
    const component = renderer.create(<Picture value="fa-home"/>);
    chai.expect(stub.calledOnce).to.equal(true);
    console.error.restore();
});

test('Picture without props value', () => {
    let stub;
    stub = sinon.stub(console, 'error');
    const component = renderer.create(<Picture type="font-icon"/>);
    chai.expect(stub.calledOnce).to.equal(true);
    console.error.restore();
});

test('Picture font-icon fa-user', () => {
    const component = renderer.create(<Picture type="font-icon" value="fa-user"/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Picture font-icon fa-user with iconSize', () => {
    const component = renderer.create(<Picture type="font-icon" value="fa-user" iconSize='fa-3x'/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Picture svg-icon ActionAndroid', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            <Picture type="svg-icon" value="ActionAndroid"/>
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Picture svg-icon ActionAndroid with style', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            <Picture type="svg-icon" value="ActionAndroid" style={{height:48, width: 48}}/>
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
