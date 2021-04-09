import React from 'react'
import '../css/Note.css'
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Close } from '../assets/close.svg'
import NotesContext from '../context/NotesContext'

class Notes extends React.Component {
    static contextType = NotesContext
    constructor (props) {
        super(props)
        this.state = {
            editing: false
        }
    }

    handleClose = () => {
        //this.context.removeNotes(this.props.id)
        let tempNotes = this.context.notes.filter( note => {
            console.log(note.id, this.props.id)
            return note.id !== this.props.id
        })
        console.log(tempNotes)
        /*let tempNotes = this.context.notes
        console.log(tempNotes)
        console.log(tempNotes.length)
        for(let i=0; i< tempNotes.length; i++){
            if(tempNotes[i].id === this.props.id){
                tempNotes.splice(i,1)
                break
            }
        }*/
        this.context.setNotes(tempNotes)
        console.log(this.context.notes)
    }

    handleEdit = () => {
        this.setState({
            editing: true
        })
    }

    handleSave = () => {
        this.setState({
            editing: false
        })
    }

    viewNotes = () => {
        return (
            <div className={ 'note-container' }>
                <div className={ 'note view' }>
                    <div className={ 'close' }>
                        <Close onClick={ this.handleClose } />
                    </div>
                    <textarea readOnly className={ 'message' } value={ this.props.note } />

                    <div className={ 'time' }>
                        End Time: { this.props.time }
                    </div>
                    <div className={ 'edit' }>
                        <Edit onClick={ this.handleEdit } />
                    </div>
                </div>
            </div>
        )
    }

    editNote = () => {
        return (
            <div className={ 'note-container' }>
                <div className={ 'note edit' }>
                    <div className={ 'message-container' }>
                        <textarea className={ 'message' } />
                    </div>
                    <div className={ 'save-container' }>
                        <button className={ 'save' } onClick={this.handleSave} >
                            Save Note
                        </button>
                    </div>
                </div>
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