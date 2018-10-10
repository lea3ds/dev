import React from 'react';
import {regexs} from '../../../localization/regex';

import TextControl from './TextControl'
import ButtonControl from './ButtonControl'

class Component extends React.Component {
    state = {error: false};

    render() {
        let {type, regex} = this.props;

        if (type === 'button') return <ButtonControl {...this.props} />;

        if (type === 'email') regex = !!regex ? regex : regexs.email;
        if (type === 'password') regex = !!regex ? regex : regexs.password;
        return <TextControl {...this.props} regex={regex}/>;
    }
}

export default Component;

/* INFO */
// button - color [default,primary,secondary]
// button - variant [outlined,contained,fab,extendedFab]






