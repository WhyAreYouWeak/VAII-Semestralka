import "../style/Footer.css"
export default function Footer() {
    return <footer>
        <div className="row">
            <div className="col-md-4">
                <h4>Column 1</h4>
                <p>Content for column 1 goes here.</p>
            </div>

            <div className="col-md-4">
                <h4>Column 2</h4>
                <p>Content for column 2 goes here.</p>
            </div>

            <div className="col-md-4">
                <h4>Column 3</h4>
                <p>Content for column 3 goes here.</p>
            </div>
        </div>
    </footer>
}