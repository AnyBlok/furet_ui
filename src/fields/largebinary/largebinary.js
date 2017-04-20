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
import translate from 'counterpart';
import {upLoad} from './index';

const fileName = (filename, filesize) => {
    if (filename) {
        if (filesize) {
            return filename + ' (' + filesize + ')';
        }
        return filename;
    }
    return translate('furetUI.fields.LargeBinary.download', {fallback: 'Download file'});
}

const updateProps = (props, obj) => {
    delete props.className;
    props.href = obj.value;
    props.target = "_blank";
    props.onClick = (event) => {event.stopPropagation()};
    if (obj.props.filename) {
        props.download = obj.props.data[obj.props.filename]
    }
}

export class LargeBinaryList extends BaseList {
    getInputProps () {
        const props = super.getInputProps();
        updateProps(props, this);
        return props;
    }
    getInput () {
        const filename = fileName(this.props.data[this.props.filename], 
                                  this.props.data[this.props.filesize]);
        const props = this.getInputProps();
        return <a {...props}>{this.value ? filename : ''}</a>
    }
}
export class LargeBinaryThumbnail extends BaseThumbnail {
    getInputProps () {
        const props = super.getInputProps();
        updateProps(props, this);
        return props;
    }
    getInput () {
        const filename = fileName(this.props.data[this.props.filename], 
                                  this.props.data[this.props.filesize]);
        const props = this.getInputProps();
        return (
            <div>
                <a {...props}>{this.value ? filename : ''}</a>
            </div>
        );
    }
}
export class LargeBinaryForm extends BaseForm {
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
        const readonly = (this.value  && this.props.filename) ? props.disabled : true;
        let filename = '',
            filesize = '';
        if (this.props.filename) {
            filename = this.props.data[this.props.filename] || '';
        }
        if (this.props.filesize) {
            filesize = this.props.data[this.props.filesize] || '';
        }
        if (props.disabled && !this.value) {
            return (
                <input type="text" 
                       id={props.id}
                       className="form-control" 
                       disabled={readonly}
                />
            );
        }
        return (
            <div className="input-group">
                {!props.disabled &&
                 <div className="input-group-addon">
                     <label htmlFor={props.id}>
                         <a><i className='fa fa-upload fa-lg'/></a>
                     </label>
                     <input {...props} />
                 </div>
                }
                <input type="text" 
                       className="form-control" 
                       value={filename}
                       disabled={readonly}
                       onChange={(e) => {
                           if (this.props.filename) this.props.onChange(this.props.filename, e.target.value)
                        }}
                />
                {filesize &&
                 <span className="input-group-addon">
                    {filesize}
                 </span>
                }
                {this.value &&
                 <a href={this.value}
                    className="input-group-addon"
                    download={filename || ''}
                    target={"_blank"}
                 >
                     <i className='fa fa-download fa-lg' />
                 </a>
                }
            </div>
        )
    }
}

plugin.set(['field', 'List'], {'LargeBinary': LargeBinaryList});
plugin.set(['field', 'Thumbnail'], {'LargeBinary': LargeBinaryThumbnail});
plugin.set(['field', 'Form'], {'LargeBinary': LargeBinaryForm});

export default {
    LargeBinaryList,
    LargeBinaryThumbnail,
    LargeBinaryForm,
}
