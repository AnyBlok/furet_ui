import React from 'react';
import Multi from './multi';
import plugin from '../plugin';
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {processNodeDefinitions} from './base';

plugin.set(['views', 'icon'], {Thumbnail: (props) => {
    return <NavigationApps />;
}});

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
    renderTemplate (template, thumbnailId) {
        const self = this;
        const processingInstructions = [
            {
                shouldProcessNode: function(node) {
                    return node.name === 'field';
                },
                processNode: function(node, children) {
                    const data = self.props.data[thumbnailId] || {},
                          change = self.state.change;
                    return self.getField(
                        'Thumbnail', 
                        node.attribs.widget, 
                        node.attribs, 
                        change[node.attribs.name] || data[node.attribs.name]
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
    renderThumbNail (thumbnailId) {
        return (
            <Card 
                onClick={() => this.onEntrySelect(thumbnailId)}
            >
                {this.renderTemplate(this.props.template, thumbnailId)}
            </Card>
        );
    }
    render () {
        return (
            <div>
                {this.renderSearchBar()}
                <div className="row">
                    {_.map(this.props.ids || [], id => (
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                            key={id}
                        >
                            {this.renderThumbNail(id)}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

plugin.set(['views', 'type'], {Thumbnail})

export default Thumbnail
