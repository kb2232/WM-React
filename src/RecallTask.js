import React, {Component} from 'react';
import Constants from './Constants.js';
import Utils from './Utils.js';

class RecallTask extends Component {

    // props: possibleItems, onDone(recalledItems)

    constructor(props) {
        super(props);

        this.state = {
            recalledItems: []
        };

        this.handleRecall = this.handleRecall.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createInputField = this.createInputField.bind(this);

    }


    handleRecall(e) {
        const item = e.target.value; //setState is asynchronous. because the event (e) is a temporary object, it might not be
                                    //around by the time that the function in setState gets called.  Thus, need to pull the value now.
        if (this.state.recalledItems.length === this.props.possibleItems.length) {
            alert('Too many items recalled');
        } else {
            this.setState(currState => ({
                recalledItems: [...currState.recalledItems, item]
            }))
        }
    }

    handleDelete() {
        if (this.state.recalledItems.length === 0) return;
        this.setState(currState => ({
            recalledItems: currState.recalledItems.slice(0, currState.recalledItems.length - 1)
        }))
    }

    handleSubmit() {
        this.props.onDone(this.state.recalledItems);
    }


    createInputField() {
        const itemChunks = Utils.chunkArray(this.props.possibleItems, Constants.RECALLBUTTON_ROW_LENGTH);

        return (<div>
            {itemChunks.map(chunk =>
                <div>
                    {chunk.map(item =>
                        <button value={item} onClick={this.handleRecall}>{item}</button>
                    )}
                </div>
            )}
            <div>
                <button value="_" onClick={this.handleRecall}>BLANK</button>
                <button onClick={this.handleDelete}>DELETE</button>
            </div>
        </div>
        )
    }

    render() {
        return (
            <div>
                {this.createInputField()}
                <span>Items Recalled: {this.state.recalledItems.join(' ')}</span>
                <p /><p />
                <button onClick={this.handleSubmit}>FINISHED</button>
            </div>
        )
    }
}

export default RecallTask;