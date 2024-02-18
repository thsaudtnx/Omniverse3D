import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({current}) => {

  const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY

  return (
    <LoadScript
      googleMapsApiKey={googleMapApiKey}
    >
      <GoogleMap
        mapContainerStyle={{
          width: '700px',
          height: '350px'
        }}
        center={{
          lat: current.latMap, 
          lng: current.lngMap,
        }}
        zoom={1.5}
      >
        <Marker 
          position={{ 
            lat: current.latMap, 
            lng: current.lngMap, 
          }} 
          label={{
            color : 'white',
            text : current.name,
            fontWeight: 'bold', 
            fontSize: '14px',
          }}
        />
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)