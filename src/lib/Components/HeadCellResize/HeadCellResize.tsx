import * as React from 'react';
import { isNumber } from 'util';

import defaultOptions from '../../defaultOptions';
import { ActionType } from '../../enums';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import { getEventListenerEffect } from '../../Utils/EffectUtils';

export const HeadCellResizeStateAction = 'HeadCellResizeStateAction';
const getValidatedWidth = (newWidth: number, minWidth: number) => {
  if (newWidth < minWidth){
    return minWidth;
  }
  return newWidth;
};
const HeadCellResize: React.FunctionComponent<{
  dispatch: DispatchFunc,
  column: Column,
  currentWidth: any,
}> = (props) => {
  const {
    column: { key, style },
    dispatch,
    currentWidth,
  } = props;
  let minWidth: number = 20;
  const styleMinWidth = style && style.minWidth;
  if (styleMinWidth && isNumber(styleMinWidth)){
    minWidth = styleMinWidth;
  }
  return (
    <div className={defaultOptions.css.theadCellResize}
      draggable='false'
      onMouseDown={(mouseDownEvent: any) => {
        const startX = mouseDownEvent.screenX - mouseDownEvent.currentTarget.parentElement.offsetWidth;
        const mouseMoveStop = getEventListenerEffect('mousemove', (event: MouseEvent) => {
          let newWidth = event.screenX - startX;
          if (newWidth !== currentWidth){
            newWidth = getValidatedWidth(newWidth, minWidth);
            dispatch({ type: HeadCellResizeStateAction, width: newWidth });
          }
        });
        const mouseUpStop = getEventListenerEffect('mouseup', (event: MouseEvent) => {
          const newWidth = getValidatedWidth(event.screenX - startX, minWidth);
          dispatch({ type: ActionType.ResizeColumn, width: newWidth, columnKey: key, });
          dispatch({ type: HeadCellResizeStateAction, width: newWidth });
          mouseUpStop();
          mouseMoveStop();
        });
      }}>&nbsp;</div>
  );
};

export default HeadCellResize;
