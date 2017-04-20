/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../../plugin';
import {BaseList, BaseThumbnail, BaseForm} from '../base';
import {upLoad} from './index';

const getProps = (obj) => {
    const filename = obj.props.data[obj.props.filename] || '';
    return {
        aProps: {
            href: obj.value,
            onClick: (event) => {event.stopPropagation()},
            target: "_blank",
            download: filename,
            title: filename,
        },
        imgProps: {
            className: "img-responsive img-thumbnail",
            src: obj.value,
            alt: filename,
        },
    };
}

export class LargeBinaryPreviewList extends BaseList {
    getInputProps () {
        return getProps(this);
    }
    getInput () {
        const {aProps, imgProps} = this.getInputProps();
        return (
            <a {...aProps}>
                <img {...imgProps}/>
            </a>
        );
    }
}
export class LargeBinaryPreviewThumbnail extends BaseThumbnail {
    getInputProps () {
        return getProps(this);
    }
    getInput () {
        const {aProps, imgProps} = this.getInputProps();
        return (
            <div>
                <a {...aProps}>
                    <img {...imgProps}/>
                </a>
            </div>
        );
    }
}
export class LargeBinaryPreviewForm extends BaseForm {
    constructor (props) {
        super(props);
        this.state = {
            hovered: false,
        };
    }
    onUpload (event) {
        upLoad(event, this);
    }
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'file';
        props.style = {display: 'none'};
        props.onChange = this.onUpload.bind(this);
        delete props.value;
        return props;
    }
    getInput () {
        const props = this.getInputProps();
        const filename = this.props.data[this.props.filename] || '';
        const imgProps = {
            className: "img-responsive img-thumbnail",
            src: this.value,
            alt: filename,
        };
        if (!this.value) {
            if (props.disabled) {
                return null;
            }
            return (
                <div>
                    <label htmlFor={props.id}>
                        <a><i className='fa fa-upload fa-lg'/></a>
                    </label>
                    <input {...props} />
                </div>
            )
        }
        return (
            <div
                onMouseOver={() => this.setState({hovered: true})}
                onMouseOut={() => this.setState({hovered: false})}
            >
                <img {...imgProps} style={{opacity: this.state.hovered ? 0.3 : 1}}/>
                <div style={{
                    transition: '.5s ease',
                    opacity: this.state.hovered ? 1 : 0,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <ul className="list-inline">
                        {!props.disabled &&
                         <li>
                             <div>
                                 <label htmlFor={props.id}>
                                     <a><i className='fa fa-upload fa-lg'/></a>
                                 </label>
                                 <input {...props} />
                             </div>
                         </li>
                        }
                        {this.value && !props.disabled &&
                         <li>
                         </li>
                        }
                        {this.value &&
                         <li>
                             <a href={this.value}
                                download={filename || ''}
                                target={"_blank"}
                             >
                                 <i className='fa fa-download fa-lg' />
                             </a>
                         </li>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

plugin.set(['field', 'List'], {'LargeBinaryPreview': LargeBinaryPreviewList});
plugin.set(['field', 'Thumbnail'], {'LargeBinaryPreview': LargeBinaryPreviewThumbnail});
plugin.set(['field', 'Form'], {'LargeBinaryPreview': LargeBinaryPreviewForm});

export default {
    LargeBinaryPreviewList,
    LargeBinaryPreviewThumbnail,
    LargeBinaryPreviewForm,
}
