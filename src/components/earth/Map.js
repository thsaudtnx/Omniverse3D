import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({current}) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={{
          width: '700px',
          height: '350px'
        }}
        center={{
          lat: current ? current.lat : 0, 
          lng: current ? current.long : 0
        }}
        zoom={1.5}
      >
        <Marker 
          position={{ 
            lat: current ? current.lat : 0, 
            lng: current ? current.long : 0, 
          }} 
          label={{
            color : 'white',
            text : current ? current.name : 'World',
            fontWeight: 'bold', 
            fontSize: '14px',
          }}
        />
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)