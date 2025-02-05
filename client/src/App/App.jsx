import { useEffect, useState } from "react";
import { nanoid } from "nanoid"
import Modal from "../Modal/Modal";
import Card from "../card/Card";

function App() {

    const url = 'http://localhost:3001/seminars'

    const [data, setData] = useState([])
    const [modal, setModal] = useState('')

    const deleteSeminar = (id) => {
        fetch(`seminars/${id}`, {
            method: 'DELETE'
        })
        // timeout для того, чтобы json-server успел обработать удаление семинара
        setTimeout(() => {
            fetchdata()
        }, 500);
        closeModal()
    }

    const changeSeminar = (id, data) => {
        fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        // timeout для того, чтобы json-server успел обработать удаление семинара
        setTimeout(() => {
            fetchdata()
        }, 500);
        closeModal()
    }

    // закрытие модального окна при клике по полупрозрачной части
    // значение по умолчанию для работы без передачи event в функциях удаления и изменения семинаров
    const closeModal = (e = {target: {className: 'modal'}}) => {
        e.target.className === 'modal' && setModal('')
    }

    // запрос данных и запись в useState
    const fetchdata = () => {
        fetch(url)
            .then(result => result.json())
            .then(result => setData(result))
    }

    // при modal == true создается <Modal />
    const openModal = (elem) => {
        setModal(elem)
    }

    // список семинаров
    const cardList = data.map((elem) => {
        return (
            <Card elem={elem} key={nanoid()} openModal={openModal} />
        )
    })

    useEffect(() => {
        fetchdata()
    }, [])

    return (
        <div className="card_container">
            {cardList}
            {modal && <Modal
                props={modal}
                closeModal={closeModal}
                deleteSeminar={deleteSeminar}
                changeSeminar={changeSeminar} />}
        </div>
    );
}

export default App;
