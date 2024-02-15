import React, { useEffect, useState } from 'react';
import styles from './modelSelector.module.css';
import { useStore } from '../../hooks/useStore';

const Model = ({model}) => {
  const [inModels, addInModel, removeInModel] = useStore((state) => [
    state.inModels,
    state.addInModel,
    state.removeInModel,
  ])
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    for (const inModel of inModels){
      if (inModel.id===model.id){
        setChecked(true)
        break;
      } 
    }
  }, [])

  return (
    <div className={styles.item}>
      <div className={styles.name}>
        {model.name}
      </div>
      <div className={styles.checkboxContainer}>
        <input 
          className={styles.checkbox} 
          type='checkbox' 
          checked={checked} 
          onChange={() => {
            if (checked===false){
              setChecked(true)
              addInModel(model)
            } else {
              setChecked(false);
              removeInModel(model.id)
            }
          }}
        />
      </div>
    </div>  
  )
}

const ModelSelector = () => {

  const [models, getModels] = useStore((state) => [
    state.models,
    state.getModels
  ])

  useEffect(() => {
    getModels();
    console.log("Load models from omnispace api")
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.title}>Model Selector</div>
      <div className={styles.items}>
        {models.map(model => (
          <Model
            key={model.id} 
            model={model}
          />
        ))}
      </div>
        
    </div>
  );
};

export default ModelSelector;