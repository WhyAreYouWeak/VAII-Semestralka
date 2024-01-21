import "../style/ReviewBox.css"

export default function ReviewBox({text, user, type}) {
    return <div className="spacer">
        <div className="card">
            <h5 className="card-header">{user} ({type})</h5>
            <div className="card-body">
                <p className="card-text">{text}</p>
            </div>
        </div>
    </div>
}