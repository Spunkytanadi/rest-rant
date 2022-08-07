const React = require('react')
const Def = require('./default')

function home () {
    return (
        <Def>
            <main>
              <h1>REST-Rant</h1>
              <div>
                <img src="/images/Food-for-life.jpg" alt="bowl of vegetables"/>
                <div>
                  Photo by <a href="AUTHOR_LINK">Anna Pelzer</a> on <a href="UNSPLASH_LINK">Unsplash</a>
                </div>
             </div>
              <a href="/places">
                  <button className="btn-primary">Places Page</button>
              </a>
            </main>
           </Def>
    )
    }

module.exports = home
