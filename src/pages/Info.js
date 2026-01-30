import React from 'react'
import Header from '../components/Header'
import ReturnHome from '../components/ReturnHome';

function Info() {
  return (
    <>
      <Header></Header>
      <h2>Info</h2>
      <a href='https://drive.google.com/file/d/1aARJ_t44nUn4o9suCYEJe1kyGFKTV6Xc/view?usp=drive_link'>Referencia pase grados</a>
      <p>
        Pots enviar-me un email a: <a href='mailto:kihoot261@gmail.com'>kihoot261@gmail.com</a> en cas de tenir una suggerencia o veure un error
      </p>
      <ReturnHome></ReturnHome>
    </>
  )
}

export default Info