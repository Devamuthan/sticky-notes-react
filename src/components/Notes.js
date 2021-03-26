import React from 'react'
import '../css/Note.css'
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Close } from '../assets/close.svg'

class Notes extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            editing: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleClose = () => {
        console.log('closed')
    }

    handleEdit = () => {
        this.setState({
            editing: true
        })
    }

    viewNotes = () => {
        return (
            <div className={ 'note view' }>
                <div className={ 'close' }>
                    <Close onClick={ this.handleClose } />
                </div>
                <div className={ 'message' }>
                    { this.props.note }
                </div>
                <div className={ 'time' }>
                    Due Time: { this.props.time }
                </div>
                <div className={ 'edit' }>
                    <Edit onClick={ this.handleEdit } />
                </div>
            </div>
        )
    }

    editNote = () => {
        return (
            <div className={ 'note edit' }>

            </div>
        )
    }

    render () {
        if (this.state.editing) {
            return this.editNote()
        } else {
            return this.viewNotes()
        }
    }
}

export default Notes