import React, { Component } from 'react';
import { searchSpells, createFavorite } from './favorites-api.js';

export default class Searchpage extends Component {

    state = {
        spells: [],
        search: '',
        favoriteSpell: {},
    }

    componentDidMount = async () => {
        if (!this.props.token) {
        this.props.history.push('/login');
        }
    }

    handleSearch = e => {
        this.setState({ search: e.target.value })
    }

    handleFavorite = async (spell) => {

        try {
            await createFavorite({
                name: spell.name,
                level: spell.level,
                description: spell.desc,
            })

            this.setState({
                favoriteSpell: {}
            })
        } catch(e) {
            console.log(e.message)
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const data = await searchSpells(this.state.search);
            this.setState({
                spells: data.body.results,
            })
    
            this.setState({
              search: '',
            });

        } catch(e) {
            console.log(e.message)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Scour the Library for Lost Lore
                    <input onChange={this.handleSearch}></input>
                    <button>Delve</button>
                </label>
                </form>
                
                <div className="search-results">
                {
                    this.state.spells.map((spell) => {
                            return <div className="spell" key={`${spell.name}`}>
                            <p>{spell.name}</p>
                            <p>{spell.level}</p>
                            <p>{spell.desc}</p>
                            <button onClick={() => this.handleFavorite(spell)}>Add to Spellbook</button>
                            </div>
                    })
                }                
                </div>
            </div>
        )
    }
}
