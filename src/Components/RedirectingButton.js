import { useNavigate } from "react-router-dom"

function RedirectingButton (props) {

const navigate = useNavigate();

  return (
    <button className="redirectingButton" onClick={ () => navigate(props.prop1) }>{props.prop2}</button>
  );
}

export default RedirectingButton
