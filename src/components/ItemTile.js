import "../style/ItemTIle.css"
export default function ItemTile(){
    return <>
        <div className="product-tile">
            <img src="/dama-kontra-strelec.jpg" alt="Product 2" className="img-fluid"/>
            <h4>Product 2</h4>
            <p>Description of Product 2 goes</p>
            <p><strong>$29.99</strong></p>
            <button className="btn btn-primary">Add to Cart</button>
        </div>
    </>
}