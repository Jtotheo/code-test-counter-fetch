// Component to render the counter, using props.count to reviece
// data from parent component: "ButtonsWithCounter.js"
export function Counter(props) {
  return <div className="counter">Counter: {props.count}</div>;
}
