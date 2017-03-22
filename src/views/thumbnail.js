/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import Multi from './multi';
import plugin from '../plugin';
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {processNodeDefinitions} from './base';

/**
 * Add Icon for Thumbnail view
**/
plugin.set(['views', 'icon'], {Thumbnail: (props) => {
    return <NavigationApps />;
}});

/**
 * Thumbnail view
 *
**/
export class Thumbnail extends Multi {
    call_server () {
        this.json_post(
            '/thumbnail/get', 
            {
                model: this.props.model,
                filter: this.state.search,
            },
            {
                onSuccess: (results) => {
                    this.props.dispatchAll(results);
                },
            },
        );
    }
    /**
     * Render the template for one thumbnail
    **/
    renderTemplate (template, thumbnailId) {
        const self = this;
        const processingInstructions = [
            {
                shouldProcessNode: function(node) {
                    return node.name === 'field';
                },
                processNode: function(node, children) {
                    const data = Object.assign(
                        {}, 
                        self.props.data && self.props.data[thumbnailId],
                        self.props.computed && self.props.computed[thumbnailId],
                        self.props.change[thumbnailId]);
                    return self.getField(
                        'Thumbnail', 
                        node.attribs.widget, 
                        node.attribs, 
                        data[node.attribs.name]
                    );
                }
            }, 
            {
                // Anything else
                shouldProcessNode: function(node) {
                    return true;
                },
                processNode: processNodeDefinitions.processDefaultNode
            }
        ];
        return super.renderTemplate(template, processingInstructions);
    }
    /**
     * Render one thumbnail
    **/
    renderThumbNail (thumbnailId) {
        if (this.props.computed && this.props.computed[thumbnailId] == 'DELETED') return null;
        if (this.props.template) {
            return (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                    key={thumbnailId}
                >
                    <Card 
                        onClick={() => this.onEntrySelect(thumbnailId)}
                    >
                        {this.renderTemplate(this.props.template, thumbnailId)}
                    </Card>
                </div>
            );
        }
        return null;
    }
    render () {
        return (
            <div>
                {this.renderSearchBar()}
                <div className="row">
                    {_.map(this.props.ids || [], id => (
                        this.renderThumbNail(id)
                    ))}
                </div>
            </div>
        )
    }
}

plugin.set(['views', 'type'], {Thumbnail})

export default Thumbnail
