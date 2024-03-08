import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './modelSelector.module.css';
import { useStore } from '../../hooks/useStore';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useParams } from 'react-router';

const Model = ({model, isActive, isChecked, isHold}) => {

  const ref = useRef();

  const handleScroll = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isActive){
      handleScroll()
    }
  }, [isActive])

  return (
    <div ref={ref} 
      className={`${styles.item} ${isActive ? styles.active : ''}`}>
      <div className={styles.name}>
        {model.name}
      </div>
      {isHold && <div className={styles.isHold}>
        holding
      </div>}
      <div className={styles.checkboxContainer}>
        <input 
          className={styles.checkbox} 
          type='checkbox' 
          checked={isChecked || isHold} 
        />
      </div>
    </div>  
  )
}

const ModelSelector = () => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const {userId, continentId} = useParams();
  const [models, 
    getModels, 
    inModels, 
    addInModel, 
    removeInModel,
    holdInModel,
  ] = useStore((state) => [
    state.models,
    state.getModels,
    state.inModels,
    state.addInModel,
    state.removeInModel,
    state.holdInModel,
  ])
  const {
    upInModel,
    selectInModel,
    downInModel,
  } = useKeyboard()

  useEffect(() => {
    getModels();
    console.log("Load models from omnispace api")
  }, [])

  useEffect(() => {
    if (upInModel && currentIdx!==0){
      setCurrentIdx(currentIdx-1)
    }
    if (downInModel && currentIdx!==models.length-1){
      setCurrentIdx(currentIdx+1)
    }
    if (selectInModel){
      let flag = false
      for (const inModel of inModels){
        if (inModel.id === models[currentIdx].id){
          flag = true
          break
        }
      }
      if (flag){
        removeInModel(models[currentIdx].id)
      } else {
        const newInModel = {
          user_id : userId,
          continent_id : continentId,
          id : models[currentIdx].id,
          mtlUrl : models[currentIdx].mtlUrl,
          name : models[currentIdx].name,
          objUrl : models[currentIdx].objUrl,
          position : [0, 0, 0],
          scale : 10,
        }
        addInModel(newInModel);
      }
    }
  }, [upInModel, downInModel, selectInModel])

  return (
    <div className={styles.container}>
      <div className={styles.title}>Model Selector</div>
      <div className={styles.items}>
        {models.map((model, index) => {
          return <Model
            key={model.id} 
            model={model}
            isActive={index === currentIdx}
            isChecked={inModels.find(inModel => inModel.id === model.id) ? true : false}
            isHold={holdInModel.id === model.id}
          />
        })}
      </div>
    </div>
  );
};

export default ModelSelector;