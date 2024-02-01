import Marker from "./Marker";

const Markers = ({continents, setCameraPos, current, setCurrent}) => {

  return (
    <>
      {continents.map((continent, index) => (
          <Marker
            key={index} 
            continent={continent}
            current={current}
            setCurrent={setCurrent}
            setCameraPos={setCameraPos}
          />
        ))}
    </>
  )
}

export default Markers;