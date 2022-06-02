import React from 'react'
import styles from "../styles/Home.module.css";

export default function Form({children, id, onSubmit, ...props}) {
  return (
    <form id={id} onSubmit={onSubmit} className={styles.displayNone} {...props}>{children}</form>
  )
}
