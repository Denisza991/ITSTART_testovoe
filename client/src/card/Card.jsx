import './card.css'

function Card (props) {

    const { openModal, elem } = props

    // при слишком длинных title текст вылезает за выделенную для него площадь
    const add3dots = (text) => {
        return text.slice(0, 40) + '...'
    }

    return (
        <div className="card" onClick={() => openModal(elem)}>
            <div className="card_image">
                <img src={elem.photo} alt="" className="card_img" />
            </div>
            <span className="card_title">{elem.title.length > 37 ? add3dots(elem.title) : elem.title}</span>
            <div className="card_time">{elem.date}, {elem.time}</div>
        </div>
    )
}

export default Card