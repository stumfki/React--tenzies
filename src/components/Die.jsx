import '../css/Die.css'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Die(props) {
  const styles = {
    backgroundColor: props.held ? "#59E391" : "white"
  }

  return (
    <div className="Die" style={styles} onClick={props.holdDice}>
        <h1>{props.value}</h1>
    </div>
  )
}


