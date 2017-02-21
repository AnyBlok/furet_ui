class Plugin {
    constructor () {
        this.plugs = {};
    }

    set (paths=[], obj) {
        const recPlugs = (plugs, _paths) => {
            if (_paths.length == 0) {
                Object.assign(plugs, obj);
            } else {
                if (! plugs[_paths[0]]) plugs[_paths[0]] = {};
                recPlugs(plugs[_paths[0]], _paths.slice(1))
            }
        };
        recPlugs(this.plugs, paths)
    }

    get (paths=[]) {
        const recPlugs = (plugs, _paths) => {
            if (_paths.length == 1) {
                return plugs[_paths[0]];
            } else {
                // if (! plugs[_paths[0]]) raise;
                return recPlugs(plugs[_paths[0]] || {}, _paths.slice(1))
            }
        };
        return recPlugs(this.plugs, paths)
    }
}

const plugin = new Plugin();
window.plugin = plugin;
export default plugin;
