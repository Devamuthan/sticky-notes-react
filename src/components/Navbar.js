import React from 'react'
import NotesContext, { NotesConsumer } from '../context/NotesContext'
import '../css/Navbar.css'
import updateResize from '../funtionalities/UpdateResize'
import { ReactComponent as Menu } from '../assets/menu.svg'
import firebase from '../utils/FirebaseUtils'

// Navbar Component
class Navbar extends React.Component {
    // Defining the context type
    static contextType = NotesContext

    // Defining the constructor
    constructor (props) {
        super(props)
        // Defining a local state navbar for mobile navbar
        this.state = {
            navbar: 'not-clicked'
        }
    }

    // Function to handle when add note button is clicked
    handleAddNote = async () => {
        // Creating an empty note with an unique-id(timestamp)
        let note = {
            id: Date.now(),
            note: '',
            endTime: ''
        }
        // Adding the empty note with other notes
        this.context.setNotes([
            ...this.context.notes, note
        ])

        // Pushing the empty note into the notes document
        firebase.database().ref('notes').push(note)

        // Updating the layout after adding a new note
        updateResize(this.context.notes.length)
    }

    // Function to handle when menu button is clicked in mobile view
    handleMenu = () => {
        if (this.state.navbar === 'not-clicked') {
            // If the navbar state value is not-clicked, change it to clicked
            this.setState({
                navbar: 'clicked'
            })
        } else {
            // If the navbar state value is clicked, change it to not-clicked
            this.setState({
                navbar: 'not-clicked'
            })
        }
    }

    // Rendering the Navbar Component
    render () {
        return (
            <NotesConsumer>
                {
                    props => {
                        return (
                            <div className={ 'navbar' }>
                                <div className={ 'navbar-desktop' }>
                                    <div className={ 'active-notes' }>
                                        Active Notes: { props.notes.length }
                                    </div>
                                    <div className={ 'title' }>STICKY NOTES</div>
                                    <div className={ 'add-note' }>
                                        <button onClick={ this.handleAddNote }>Add Note</button>
                                    </div>
                                </div>
                                <div className={ 'navbar-mobile ' + this.state.navbar }>
                                    <div className={ 'title' }>
                                        <div className={ 'title-text' }>
                                            STICKY NOTES
                                        </div>
                                        <div className={ 'menu' }>
                                            <Menu onClick={ this.handleMenu } />
                                        </div>
                                    </div>
                                    <div className={ 'active-notes ' + this.state.navbar }>
                                        Active Notes: { props.notes.length }
                                    </div>
                                    <div className={ 'add-note ' + this.state.navbar }>
                                        <button onClick={ this.handleAddNote }>Add Note</button>
                                    </div>

                                </div>
                            </div>

                        )
                    }
                }
            </NotesConsumer>
        )
    }
}

// Exporting the Navbar Component
export default Navbar