import React from 'react';

const History = ({ transactions, onDeleteClick }) => {
    return (
        <section className="history">
            <h3>История расходов</h3>
            <ul className="history__list">
                {transactions.map((item) => {
                    return (<li className={`history__item history__item-${item.type ? 'plus' : 'minus'}`} key={item.key}>
                        {item.operation}
                        <span className="history__money">{item.amount}</span>
                        <button
                            className="history__delete"
                            onClick={() => onDeleteClick(item.key)}>x</button>
                    </li>)
                })}
            </ul>
        </section>
    )
}


export default History;