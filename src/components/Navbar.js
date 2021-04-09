import React from 'react'
import NotesContext, { NotesConsumer } from '../context/NotesContext'
import '../css/Navbar.css'
import updateResize from '../funtionalities/UpdateResize'
import { ReactComponent as Menu } from '../assets/menu.svg'

class Navbar extends React.Component {
    static contextType = NotesContext

    constructor (props) {
        super(props)
        this.state = {
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

    handleMenu = () => {
        if (this.state.navbar === 'not-clicked') {
            this.setState({
                navbar: 'clicked'
            })
        } else {
            this.setState({
                navbar: 'not-clicked'
            })
        }
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

export default Navbar