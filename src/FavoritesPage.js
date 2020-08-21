import React, { Component } from 'react'
import { fetchFavorites, deleteFavorite } from './favorites-api.js';

export default class FavoritesPage extends Component {
    state = {
        favorites: [],
    }

    componentDidMount = async () => {
        if (!this.props.token) {
        this.props.history.push('/login');
        } else {
        const data = await fetchFavorites(this.props.token)
    
        this.setState({
            favorites: data.body
        })
        }
    }

    handleDelete = async (id) => {
        await deleteFavorite(id);

        const data = await fetchFavorites(this.props.token)
    
        this.setState({ favorites: data.body })
        }

    render() {
        return (
            <div>
                <div className="favorites-display">
                {
                    this.state.favorites.map((spell) => {
                            return <div className="spell" key={`${spell.id}`}>
                            <p>{console.log(spell)}</p>    
                            <p>{spell.name}</p>
                            <p>{spell.level}</p>
                            <p>{spell.description}</p>
                            <button className="delete" onClick={() => this.handleDelete(spell.id)}>Erase from Spellbook</button>
                            </div>
                    })
                }                
                </div>
            </div>
        )
    }
}
