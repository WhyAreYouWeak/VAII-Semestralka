import "../style/Footer.css"
export default function Footer() {
    return <footer>
        <div className="row bg-dark">
            <div className="col-md-4">
                <a className="navbar-brand" href='#'> Top knihy</a>
            </div>
            <div className="col-md-4">
                <h4>“Sú aj horšie zločiny ako pálenie kníh. Jeden z nich je nečítať ich.”
                    <br></br>― Joseph Brodsky</h4>
            </div>
            <div className="col-md-4">
                <h4>Informácie</h4>
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Twitter</p>
            </div>
        </div>
    </footer>
}