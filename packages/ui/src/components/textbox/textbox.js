/** @jsx h */
import classnames from '@sindresorhus/class-names'
import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import { ESCAPE_KEY_CODE } from './key-codes'
import styles from './textbox.scss'

export function Textbox ({
  focused: isFocused,
  icon,
  noBorder,
  style,
  value,
  ...rest
}) {
  const hasIcon = typeof icon !== 'undefined'

  const inputElement = useRef(null)

  function handleFocus () {
    inputElement.current.focus()
    inputElement.current.select()
  }

  function handleKeyDown (event) {
    const keyCode = event.keyCode
    if (keyCode === ESCAPE_KEY_CODE) {
      event.stopPropagation()
      inputElement.current.blur()
    }
  }

  if (isFocused === true) {
    useEffect(handleFocus, [])
  }

  return (
    <div
      class={classnames(
        styles.textbox,
        noBorder === true ? styles.noBorder : null,
        hasIcon === true ? styles.hasIcon : null
      )}
      style={style}
    >
      <input
        {...rest}
        ref={inputElement}
        type='text'
        class={styles.input}
        value={value}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      {hasIcon ? <div class={styles.icon}>{icon}</div> : null}
    </div>
  )
}
