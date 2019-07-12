import React from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import GameContext from "../context/gameContext"
import Layout from "../components/layout"

class Play extends React.Component {
  static contextType = GameContext

  state = {
    role: null,
    location: null,
    locations: [],
  }

  componentDidMount() {
    const { socket, gameCode } = this.context
    socket.emit("get game profile", (profile, locations) => {
      console.log("got game profile!")
      this.setState({
        role: profile.role,
        location: profile.location,
        locations: locations,
      })
    })
  }

  render() {
    const { role, location, locations } = this.state
    return (
      <Layout>
        {role === 'Spy' && <h2>You are the Spy!</h2>}
        {role !== 'Spy' && <h2>Your role: {role}</h2>}
        {location && <h2>The location is: {location}</h2>}
        {locations.length && (
          <div>
            <h2>All locations:</h2>
            {locations.map(location => (
              <div>{location}</div>
            ))}
          </div>
        )}
      </Layout>
    )
  }
}

export default Play
