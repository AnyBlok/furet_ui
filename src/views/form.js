import Base from './base';
import plugin from '../plugin';
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import {processNodeDefinitions} from './base';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import ContentSave from 'material-ui/svg-icons/content/save';
import IconButton from 'material-ui/IconButton';
import {blue500, red500} from 'material-ui/styles/colors';
import DropdownMenu from './dropdown';

plugin.set(['views', 'icon'], {Form: (props) => {
    return <EditorInsertDriveFile />;
}});

export class Form extends Base {
    constructor(props) {
        super(props);
        this.state = {change: {}, readonly: true, id: null};
    }
    call_server (id) {
        this.json_post(
            '/form/get', 
            {
                model: this.props.model,
                id: (id != undefined) ? id : this.state.id,
            },
            {
                onSuccess: (results) => {
                    this.props.dispatchAll(results);
                },
            },
        );
    }
    addNewEntry () {
        this.setState({readonly: false, id: null});
        this.call_server(null);
    }
    returnPreviousView() {
        const viewId = (this.props.params && this.props.params.returnView) || this.props.onSelect;
        if (viewId) {
            this.props.dispatch({
                type: 'UPDATE_ACTION_SELECT_VIEW',
                actionId: this.props.actionId,
                viewId,
            })
        }
    }
    removeEntry () {
        console.log('todo', 'removeEntry');
    }
    saveEntry () {
        console.log('todo', 'saveEntry');
        this.setState({readonly: true});
    }
    componentWillReceiveProps(nextProps) {
        console.log('=>', nextProps)
        if (nextProps.params) {
            const state = {}
            if (nextProps.params.readonly != undefined) state.readonly = nextProps.params.readonly;
            if (nextProps.params.id != undefined) state.id = nextProps.params.id;
            this.setState(state);
        }
    }
    renderTemplate (template) {
        if (!template) return null;
        const self = this;
        const processingInstructions = [
            {
                shouldProcessNode: function(node) {
                    return node.name === 'field';
                },
                processNode: function(node, children) {
                    const data = self.props.data[self.state.id] || {},
                          change = self.state.change;
                    return self.getField(
                        'Form', 
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
    renderButton () {
        return (
            <div className="row">
                { !this.state.readonly &&
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={this.saveEntry.bind(this)}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <ContentSave color={blue500} />
                        </IconButton>
                    </div>
                }
                { this.props.creatable && this.state.readonly &&
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={this.addNewEntry.bind(this)}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <ActionNoteAdd color={blue500} />
                        </IconButton>
                    </div>
                }
                { this.props.editable && this.state.readonly &&
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={() => this.setState({readonly: false})}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <EditorModeEdit color={blue500} />
                        </IconButton>
                    </div>
                }
                { !this.state.readonly &&
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={() => this.setState({readonly: true, change: {}})}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <NavigationCancel color={red500} />
                        </IconButton>
                    </div>
                }
                { this.props.deletable && this.state.readonly &&
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={this.removeEntry.bind(this)}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <ActionDeleteForever color={red500} />
                        </IconButton>
                    </div>
                }
                { this.state.readonly &&
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={this.returnPreviousView.bind(this)}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <NavigationArrowBack />
                        </IconButton>
                    </div>
                }
                { (this.props.buttons || []).length != 0 && 
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <DropdownMenu 
                            label="Actions" 
                            menus={this.props.buttons} 
                        />
                    </div>
                }
            </div>
        )
    }
    render () {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        {this.renderButton()}
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        {this.props.selector}
                    </div>
                </div>
                <div className="row">
                    {this.renderTemplate(this.props.template)}
                </div>
            </div>
        )
    }
}

plugin.set(['views', 'type'], {Form})

export default Form
