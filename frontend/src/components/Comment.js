import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MONTHS } from '../utils/constants';
import { changeCommentVote, editComment } from '../actions';

class Comment extends Component {
    state = {
        edit: false,
        editCommentBody: ''
    };

    cancelCommentEdit() {
        this.setState({
            edit: false,
            editCommentBody: ''
        });
    }

    saveCommentEdit(event) {
        event.preventDefault();
        const { editCommentBody } = this.state;
        const { comment } = this.props;
        const id = comment.id;
        const timestamp = (new Date()).getTime();
        this.props.editComment({
            id,
            timestamp,
            body: editCommentBody
        });
        this.setState({
            edit: false,
            editCommentBody: ''
        });
    }

    render() {
        const { comment } = this.props;
        const { timestamp } = comment;
        const d = new Date(timestamp);
        const mmm = MONTHS[d.getMonth()];
        const yyyy = d.getFullYear();
        const date = d.getDate();
        const { edit } = this.state;
        if (edit) {
            return (
                <form onSubmit={event => this.saveCommentEdit(event)}>
                    <div className='row'>
                        <div className='col-md-12'>
                                <textarea
                                    className='form-control'
                                    value={this.state.editCommentBody}
                                    onChange={(event) =>
                                        this.setState({ editCommentBody: event.target.value })}
                                />
                        </div>
                    </div>
                    <div className='row' style={{ marginTop: '10px' }}>
                        <div className='col-md-12'>
                            <div style={{ float: 'right' }}>
                                <input
                                    style={{ margin: '5px' }}
                                    className='btn' type='button'
                                    value='Cancel'
                                    onClick={() => this.cancelCommentEdit()}
                                />
                                <input
                                    style={{ margin: '5px' }}
                                    className='btn'
                                    type='submit'
                                    value='Save'
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                </form>
            );
        }
        return (
            <div>
                <div className='row'>
                    <div className='col-md-10'>
                        {comment.body}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-2'>
                        <p style={{ fontSize: '0.88em', color: 'gray' }}>
                            -by {comment.author} on {mmm} {date}, {yyyy}
                        </p>
                    </div>
                    <div className='col-md-4'>
                        <button
                            className='voteButton'
                            onClick={() => {
                                this.props.changeCommentVote(comment.id, 'upVote');
                            }}
                        >
                            <i className="fa fa-thumbs-up" aria-hidden="true" />
                        </button>
                        <button
                            className='voteButton'
                            onClick={() => {
                                this.props.changeCommentVote(comment.id, 'downVote');
                            }}
                        >
                            <i className="fa fa-thumbs-down" aria-hidden="true" />
                        </button>
                        <span style={{ marginLeft: '5px' }}>{comment.voteScore}</span>
                        <button
                            className='deletePostButton' style={{ marginLeft: '10px' }}
                            onClick={() => this.setState({
                                edit: true,
                                editCommentBody: comment.body
                            })}
                        >
                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                        </button>
                        <button
                            className='deletePostButton'
                            style={{ marginLeft: '10px' }}
                            onClick={() => {
                                this.props.deleteComment(comment.id);
                            }}
                        >
                            <i className="fa fa-trash-o" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeCommentVote: (commentId, voteDirection) =>
            dispatch(changeCommentVote(commentId, voteDirection)),
        editComment: (newComment) => dispatch(editComment(newComment))
    };
}

export default connect(null, mapDispatchToProps)(Comment);