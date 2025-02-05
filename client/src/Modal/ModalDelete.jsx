function ModalDelete (props) {

    const { closeModalDelete, modalDeleteAccept } = props

    // закрывает окно при нажатии на полупрозрачный фон
    const closeModal = (e) => {
        e.target.className === 'modal_delete' && closeModalDelete()
    }

    return (
        <div className="modal_delete" onClick={closeModal}>
            <div className="modal_delete_content">
                <h3>Вы уверены?</h3>
                <div className="buttons">
                    <button className="modal_button_delete" onClick={modalDeleteAccept}>Удалить</button>
                    <button className="modal_button_change" onClick={closeModalDelete}>Отменить</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete