import React from 'react'
import NotesContext, { NotesConsumer } from '../context/NotesContext'
import '../css/Navbar.css'
import updateResize from '../funtionalities/UpdateResize'

class Navbar extends React.Component {
    static contextType = NotesContext

    handleAddNote = () => {

        this.context.addNotes({
            id: Date.now(),
            note: '',
            endTime: ''
        })
        updateResize(this.context.notes.length)
    }

    render () {
        return (
            <NotesConsumer>
                {
                    props => {
                        return (
                            <div className={ 'navbar' }>
                                <div className={ 'active-notes' }>
                                    Active Notes: { props.notes.length }
                                </div>
                                <div className={ 'title' }>STICKY NOTES</div>
                                <div className={ 'add-note' }>
                                    <button onClick={ this.handleAddNote }>Add Note</button>
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