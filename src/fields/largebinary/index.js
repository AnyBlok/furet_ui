/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import './largebinary';
import './preview';

export const upLoad = (event, self) => {
    const file = event.target.files[0];
    if (file) {
        const FR= new FileReader();
        FR.onload = function(e) {
            self.props.onChange(self.props.name, e.target.result);
            if (self.props.filename) self.props.onChange(self.props.filename, file.name);
            if (self.props.filesize) self.props.onChange(self.props.filesize, file.size);
        };
        FR.readAsDataURL(file);
    }
}
export default upLoad;
