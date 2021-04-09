import React from 'react'
import Notes from './Notes'
import '../css/Board.css'
import NotesContext, { NotesConsumer, NotesProvider } from '../context/NotesContext'
import Navbar from './Navbar'
import updateResize from '../funtionalities/UpdateResize'

class Board extends React.Component {
    render () {
        return (
            <NotesProvider>
                <RenderNote />
            </NotesProvider>
        )
    }
}

class RenderNote extends React.Component {
    static contextType = NotesContext

    componentDidMount () {
        updateResize(this.context.notes.length)
        window.addEventListener('resize', () => {
            updateResize(this.context.notes.length)
        })
    }

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

    renderEmptyBoard = () => {
        return (
            <div className={ 'board empty' }>
                <Navbar />
                <div className="no-notes">No Notes Available</div>
            </div>
        )
    }

    render () {
        return (
            <NotesConsumer>
                {
                    props => {
                        console.log('RenderNote')
                        if (props.notes.length === 0) {
                            return this.renderEmptyBoard()
                        } else {
                            return this.renderNotes()
                        }
                    }
                }
            </NotesConsumer>
        )
    }
}

export default Board