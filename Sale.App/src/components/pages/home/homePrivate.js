import React from 'react';
import { Toolbar } from '../../controllers';

class Component extends React.Component {

    render() {
        return <div>
            <Toolbar title={'Private'} menuButton />
        </div>;
    }
}

export default (Component);


