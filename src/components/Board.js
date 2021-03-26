import React from 'react'
import Notes from './Notes'
import '../css/Board.css'
import { NotesConsumer, NotesProvider } from '../context/NotesContext'

class Board extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            notes: [
                {
                    note: 'This is the note',
                    endTime: '19:50'
                }
            ]
        }
    }

    renderNotes = () => {
        return (
            <div className={ 'board nonempty' }>
                {
                    this.state.notes.map((note, i) => {
                        return <Notes key={ i } note={ note.note } time={ note.endTime } />
                    })
                }
            </div>
        )
    }

    renderEmptyBoard = () => {
        return(
            <div className={"board empty"}>
                <div>No Notes Available</div>
            </div>
        )
    }

    render () {


        return (
            <NotesProvider>
                <NotesConsumer>
                    {
                        props => {
                            if(props.notes.length === 0){
                                return this.renderEmptyBoard()
                            }
                            else{
                                return this.renderNotes()
                            }
                        }
                    }
                </NotesConsumer>
            </NotesProvider>
        )

    }
}

export default Board