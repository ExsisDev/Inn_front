import React from 'react';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import './EditAlly.css';

class EditAlly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <h1>Edit Ally</h1>
                <BackNavigator />
            </div>
        );
    }
}
 
export default EditAlly;