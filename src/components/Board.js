import React from 'react'
import Notes from './Notes'
import '../css/Board.css'
import NotesContext, { NotesConsumer, NotesProvider } from '../context/NotesContext'
import Navbar from './Navbar'
import updateResize from '../funtionalities/UpdateResize'
import firebase from '../utils/FirebaseUtils'

// Board Component
class Board extends React.Component {
    // Rendering the Board component with Context Provider
    render () {
        return (
            <NotesProvider>
                <RenderNote />
            </NotesProvider>
        )
    }
}

// RenderNote Component
class RenderNote extends React.Component {
    // Defining the context type
    static contextType = NotesContext

    // Defining component did mount function
    async componentDidMount () {
        // Referencing the root of the DB
        let notesRef = firebase.database().ref('/')
        //  Getting all the values from the reference
        notesRef.get().then( async snapshot => {
            if (snapshot.exists()) {
                // If the snapshot exists, update the state
                let notes = Object.keys(snapshot.val().notes).map(id => {
                    return snapshot.val().notes[ id ]
                })
                // Updating the state
                await this.context.setNotes(notes)
            }
        })
        //this.context.setNotes(await database.getNotes)
        // Adding event listener to change the layout whenever the window width is changed
        window.addEventListener('resize', () => {
            updateResize(this.context.notes.length)
        })
        // Updating the layout some time since the setState function is asynchronous
        window.setTimeout(() => {
            updateResize(this.context.notes.length)
        }, 1500)
    }

    // RenderNotes template
    // This is rendered when there are notes present int the context
    renderNotes = () => {
        return (
            <div className={ 'board nonempty' }>
                <Navbar />
                <div className={ 'notes-available' }>
                    {
                        this.context.notes.map(note => {
                            return <Notes key={ note.id } id={ note.id } note={ note.note } time={ note.endTime } />
                        })
                    }
                </div>
            </div>
        )
    }

    // RenderEmptyBoard Template
    // This is rendered when there is no notes present in the context
    renderEmptyBoard = () => {
        return (
            <div className={ 'board empty' }>
                <Navbar />
                <div className="no-notes">No Notes Available</div>
            </div>
        )
    }

    // Rendering the RenderNotes Component
    render () {
        // To check whether any data is present in the context, the data is consumed in the Consumer Component
        return (
            <NotesConsumer>
                {
                    props => {
                        if (props.notes.length === 0) {
                            // Rendering the RenderEmptyBoard template when there is not data
                            return this.renderEmptyBoard()
                        } else {
                            // Rendering the Notes template when there is notes available
                            return this.renderNotes()
                        }
                    }
                }
            </NotesConsumer>
        )
    }
}

// Exporting the Board Component
export default Board