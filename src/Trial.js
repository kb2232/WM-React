import React, { Component } from 'react';
import Stimuli from './Stimuli.js';
import RecallTask from './RecallTask.js';
import {Feedback} from './instructions.js';
import Constants from './Constants.js';


class Trial extends Component {
    // props: verifications (array), verficiationAnswers (array), memoryItems (array), onDone (gives answers and recalls)
    constructor(props) {
        super(props);

        this.state = {
            activeFrame: 0,
            verificationScore: 0,
            recallScore: 0
        }

        this.scoreVerifications = this.scoreVerifications.bind(this);
        this.scoreRecall = this.scoreRecall.bind(this);
    
    }


    scoreVerifications(answers) {

        if (answers.length !== this.props.verificationAnswers.length) return;

        const score = this.props.verificationAnswers.reduce((total, answer, index) => total + (answer === answer[index] ? 1 : 0), 0);

        this.setState(currState => {
            return {
                verificationScore: score,
                activeFrame: currState.activeFrame + 1
            }
        })
    }

    scoreRecall(recalledItems) {
        if (recalledItems.length !== this.props.memoryItems.length) return; // should never happen because RecallTask checks this

        const score = this.props.memoryItems.reduce((total, item, index) => total + (item === recalledItems[index] ? 1 : 0), 0);

        this.setState(currState => {
            return {
                recallScore: score,
                activeFrame: currState.activeFrame + 1
            }
        })
    }

    render() {
        return (
            <div className="Trial">
                {(() => {
                    const children = [
                        <Stimuli
                            verifications={this.props.verifications}
                            memoryItems={this.props.memoryItems}
                            onDone={this.scoreVerifications}
                        />,
                        <RecallTask 
                            possibleItems={Constants.POSSIBLE_ITEMS}
                            numberToRecall={this.props.memoryItems.length}
                            onDone={this.scoreRecall}
                        />,
                        <Feedback
                            verificationScore={this.state.verificationScore}
                            numberOfVerifications={this.props.verifications.length}
                            recallScore={this.state.recallScore}
                            numberOfItems={this.props.memoryItems.length}
                            onDone={() => {
                                this.props.onDone(this.state.verificationScore, this.state.recallScore);
                                this.setState(currState => {
                                    return {
                                        activeFrame: currState.activeFrame + 1
                                    }
                                })
                            }}
                        />
                    ];
                    return children[this.state.activeFrame % children.length]
                })()}
            </div>
        )
    }
}

export default Trial;