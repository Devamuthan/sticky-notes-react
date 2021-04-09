import React from 'react'
import NotesContext, { NotesConsumer } from '../context/NotesContext'
import '../css/Navbar.css'
import updateResize from '../funtionalities/UpdateResize'

class Navbar extends React.Component {
    static contextType = NotesContext

    constructor (props) {
        super(props);
        this.state ={
            navbar: 'not-clicked'
        }
    }

    handleAddNote = () => {
        let note = {
            id: Date.now(),
            note: '',
            endTime: ''
        }
        this.context.setNotes([
            ...this.context.notes, note
        ])

        updateResize(this.context.notes.length)
    }

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
                                <div className={ 'navbar-mobile' }>
                                    <div className={ 'active-notes' }>
                                        Active Notes: { props.notes.length }
                                    </div>
                                    <div className={ 'title' }>STICKY NOTES</div>
                                    <div className={ 'add-note' }>
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

export default Navbar