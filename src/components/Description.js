import { Html } from "@react-three/drei";
import { useNavigate, useParams } from "react-router";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";

const Description = ({current, nextContinent, prevContinent}) => {

  const navigate = useNavigate();
  const params = useParams();

  return (
    <Html position={[0, 0, 0]}>
      <div style={{
        position : 'absolute',
        right : -670,
        top : -250,
        padding : 20,
        background : '#696969',
        borderRadius : 5,
        color : 'white',
        fontWeight : 'bold',
        width : 350,
      }}>
        <div style={{
          display : 'flex',
          flexDirection : 'row',
          justifyContent : 'space-between'
        }}>
          {current && <FaArrowAltCircleLeft 
            onClick={() => prevContinent()}
            style={{
              width : 25,
              height : 25,
              cursor : 'pointer',
            }}
          />}
          <h2>{current ? current.name : 'Hello World'}</h2>
          {current &&  <FaArrowAltCircleRight 
            onClick={() => nextContinent()}
            style={{
              width : 25,
              height : 25,
              cursor : 'pointer',
            }}
          />}
        </div>
        <div>
          <div>{current && `Latitude : ${current?.lat}`}</div>
          <div>{current && `Longitude : ${current?.long}`}</div>
          <p>{current ? current.description : 'Welcome to Omniverse 3D World!'}</p>
        </div>
        <div>
          {current && current.images}
        </div>
        {current && <button
          style={{
            padding : "2px 5px",
            cursor : 'pointer',
          }} 
          onClick={() => {
            navigate(`/${params.userId}/game`);
        }}>Start</button>}
      </div>
    </Html>
  )
}

export default Description;