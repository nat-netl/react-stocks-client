import React from 'react'
import s from './modal.module.scss'
import { IModal } from '../../types/modal'

const Modal: React.FC<IModal> = ({active, setActive, children}): JSX.Element | any => {
  if (active[0].status === false) return 

  return (
    <div className={active ? `${s.modal} ${s.active}` : s.modal} onClick={() => setActive([{status: false}])}>
      <div className={active ? `${s.modal__content} ${s.active}` : s.modal__content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal