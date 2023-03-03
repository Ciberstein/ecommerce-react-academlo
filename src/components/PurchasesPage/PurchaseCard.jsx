import React from 'react'
import './styles/purchasesCard.css'

export const PurchaseCard = ({ purchase }) => {
  return (
    <article className='purchasesCard__container'>
        <header className='purchasesCard__header'>
            <img src={purchase.product.images[2].url} alt='' />
        </header>
        <div className='purchasesCard__info'>
          <h3>{purchase.product.title}</h3>
          <div>Quantity: {purchase.quantity}</div>
          <div>{purchase.product.price}/each</div>
        </div>
    </article>
  )
}
