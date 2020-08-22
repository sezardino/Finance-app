import React from 'react';

const Operations = (props) => {
    return (
        <section className="operation">
            <h3>Новая операция</h3>
            <form id="form">
                <label>
                    <input
                        type="text"
                        className="operation__fields operation__name"
                        placeholder="Наименование операции"
                        value={props.operation}
                        onChange={(evt) => props.onInputChange(evt)}
                    />
                </label>
                <label>
                    <input
                        type="number"
                        className="operation__fields operation__amount"
                        placeholder="Введите сумму"
                        value={props.amount}
                        onChange={(evt) => props.onInputChange(evt)}
                    />
                </label>
                <div className="operation__btns">
                    <button
                        type="button"
                        className="operation__btn operation__btn-subtract"
                        onClick={(evt) => props.onButtonClick(evt)}>
                        РАСХОД
								</button>
                    <button
                        type="button"
                        className="operation__btn operation__btn-add"
                        onClick={(evt) => props.onButtonClick(evt)}>
                        ДОХОД
								</button>
                </div>
            </form>
        </section>
    )
}

export default Operations;