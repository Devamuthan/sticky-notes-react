import React from 'react'
import '../css/Note.css'
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Close } from '../assets/close.svg'
import NotesContext from '../context/NotesContext'
import firebase from '../utils/FirebaseUtils'

// Notes Component
class Notes extends React.Component {
    // Defining the context type for using the context outside the Consumer Component
    static contextType = NotesContext

    // Creating the constructor for the Notes component
    constructor (props) {
        // Passing the props to the super class
        super(props)
        // Defining the state
        // editing is the state to denote the status of the note component - editing == true => Editing or editing == false => Viewing
        this.state = {
            editing: false
        }
    }

    // Function to handle the Closing action of the Note Component
    handleClose = () => {
        // Referencing the notes document from the database
        let notesRef = firebase.database().ref('notes')
        // Selecting the current note from the database
        notesRef.orderByChild('id').equalTo(this.props.id)
            .once('value').then( snapshot => {
                // Getting the key of the document
                let key = Object.keys(snapshot.val())[0]
                // Removing the Document
                notesRef.child(key).remove()
        })

        // Filtering through the notes and getting the array of notes without the deleted note component
        let tempNotes = this.context.notes.filter(note => {
            return note.id !== this.props.id
        })
        // Updating the state thus re-rendering the Board Component
        this.context.setNotes(tempNotes)
    }

    // Function to handle the Click of Edit button
    handleEdit = () => {
        // Setting the editing state to true denoting the Component is in Edit State
        this.setState({
            editing: true
        })
    }

    // Function to handle the click of Save button when editing
    handleSave = async() => {
        // Referencing the notes document
        let notesRef = firebase.database().ref('notes')
        // Getting the current note from the database
        await notesRef.orderByChild('id').equalTo(this.props.id)
            .once('value').then( snapshot => {
                // Getting the key of the document from database
                let key = Object.keys(snapshot.val())[0]
                // Updating the note to the database
                notesRef.child(key).update({note: this.refs.message.value})
            })


        // Searching through all the notes available and saving all the notes
        let notes  = this.context.notes.map( note => {
            if(note.id === this.props.id){
                // If the note is found, the message is updated
                note.note = this.refs.message.value
            }
            // Returning the note after each iteration
            return note
        })

        // Setting the editing state to false denoting the Component is in View State
        this.setState({
            editing: false
        })

        // Updating the context
        this.context.setNotes(notes)
    }

    // This function returns the template for view notes -> when editing = false
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

    // This function return the template for edit notes -> when editing = true
    editNote = () => {
        return (
            <div className={ 'note-container' }>
                <div className={ 'note edit' }>
                    <div className={ 'message-container' }>
                        <textarea className={ 'message' } ref="message" defaultValue={this.props.note} />
                    </div>
                    <div className={ 'save-container' }>
                        <button className={ 'save' } onClick={ this.handleSave }>
                            Save Note
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Rendering the component based on the value on the value of editing state
    render () {
        if (this.state.editing) {
            // If the editing state is set to true -> render the edit note template
            return this.editNote()
        } else {
            // If the editing state is set to false -> render the view note template
            return this.viewNotes()
        }
    }
}

// Exporting the Notes component
export default Notes