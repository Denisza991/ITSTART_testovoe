import { useEffect, useState } from "react"
import './modal.css'
import ModalDelete from "./ModalDelete"

function Modal (props) {
    const { closeModal, deleteSeminar, changeSeminar } = props
    const prop = props.props
    const { id } = prop

    // возможно это неправильно, но по другому пока не умею
    const [title, setTitle] = useState(prop.title)
    const [description, setDescription] = useState(prop.description)
    const [date, setDate] = useState(prop.date)
    const [time, setTime] = useState(prop.time)
    const [photo, setPhoto] = useState(prop.photo)

    const [modaldelete, setModaldelete] = useState(false)

    // закрывает модальное окно подтверждения удаления
    const closeModalDelete = () => {
        setModaldelete(false)
    }

    // удаляет семинар в окне
    const modalDeleteAccept = (e) => {
        deleteSeminar(id)
        closeModal()
    }

    // автоматически изменяет размер textarea для описания, но до 300px, указанных в css .modal_input
    useEffect(() => {
        const area = document.getElementById('description')
        area.style.height = 40 + 'px'
        area.style.height = area.scrollHeight + 'px'

        area.addEventListener('input', (e) => {
            area.style.height = 40 + 'px'
            area.style.height = area.scrollHeight + 'px'
        })
    }, [])

    // словарь для передачи на json-server
    const data = {id: id, title: title, description: description, date: date, time: time, photo: photo}

    return (
        <div className="modal" onClick={closeModal}>
            <div className="modal_content">
                <span className="modal_span">Название:</span>
                <input
                    className="modal_title modal_input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <span className="modal_span">Описание:</span>
                <textarea
                    id="description"
                    className="modal_description modal_input"
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                />
                <span className="modal_span">Дата:</span>
                <input
                    className="modal_date modal_input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <span className="modal_span">Время:</span>
                <input
                    className="modal_time modal_input"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <span className="modal_span">Ссылка на фото:</span>
                <input
                    className="modal_time modal_input"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                />
                <div className="buttons">
                    <button className="modal_button_delete" onClick={() => setModaldelete(true)}>Удалить</button>
                    <button className="modal_button_change" onClick={() => changeSeminar(id, data)}>Сохранить</button>
                </div>
            </div>
            {/* вызывает модальное окно подтверждения удаления по принципу вызова модального окна редактирования */}
            {modaldelete && <ModalDelete closeModalDelete={closeModalDelete} modalDeleteAccept={modalDeleteAccept} />}
        </div>
    )
}

export default Modal